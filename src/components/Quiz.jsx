import React, { useState } from 'react'
import { genQuiz } from '../services/ai'
import { QUESTIONS as DEFAULTS } from './questions'

// tiện ích: trộn mảng (giữ đáp án đi kèm)
function shuffle(arr){ return [...arr].sort(() => Math.random() - 0.5) }

// Toast mini
function Toast({ open, title, msg, onClose }) {
  return (
    <div className={'toast ' + (open ? 'show' : '')}>
      <div className="icon">✓</div>
      <div style={{flex:1}}>
        <div className="title">{title}</div>
        <div className="msg">{msg}</div>
        <div className="progress"><div className="bar"/></div>
      </div>
      <button className="close" aria-label="Đóng" onClick={onClose}>×</button>
    </div>
  )
}

export default function Quiz(){
  const [questions, setQuestions] = useState(DEFAULTS)
  const [answers,setAnswers] = useState({})
  const [submitted,setSubmitted] = useState(false)
  const [loading,setLoading]   = useState(false)

  // trạng thái hiển thị đẹp khi tạo quiz thành công
  const [useAi, setUseAi] = useState(false)
  const [aiCount, setAiCount] = useState(0)
  const [aiTime, setAiTime] = useState('')
  const [toast, setToast] = useState({ open:false, title:'', msg:'' })

  const score = Object.entries(answers).reduce((acc,[i,v]) => {
    const idx = parseInt(i,10)
    return acc + (questions[idx].answer === v ? 1 : 0)
  },0)

  const onSelect = (qi,optIndex)=>{
    if(submitted) return
    setAnswers(a => ({...a, [qi]: optIndex}))
  }

  async function handleAiQuiz(){
    try{
      setLoading(true)
      const { items } = await genQuiz() // {items:[{q,answer,explain}]}

      const mapped = (items || [])
        .filter(it => it?.q && (it?.answer === 0 || it?.answer === 1))
        .map(it => ({
          q: String(it.q).trim(),
          options: ['Đúng','Sai'],
          answer: Number(it.answer),
          explain: it.explain ? String(it.explain) : ''
        }))

      if (mapped.length >= 5) {
        const mixed = shuffle(mapped)
        setQuestions(mixed)
        setAnswers({})
        setSubmitted(false)
        setUseAi(true)
        setAiCount(mixed.length)
        const t = new Date()
        setAiTime(t.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}))

        // toast đẹp
        setToast({ open:true, title:'Đã tạo quiz mới!', msg:`Đã nạp ${mixed.length} câu từ AI (RAG).` })
        setTimeout(()=> setToast(s => ({...s, open:false})), 3200)
      } else {
        setToast({ open:true, title:'Không đủ dữ liệu', msg:'AI trả về quá ít câu hợp lệ. Đang giữ bộ câu mặc định.' })
        setTimeout(()=> setToast(s => ({...s, open:false})), 3200)
      }
    } catch(e){
      setToast({ open:true, title:'Lỗi /quiz', msg:(e?.message || 'Failed to fetch') })
      setTimeout(()=> setToast(s => ({...s, open:false})), 3200)
      console.error('FE /quiz error:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='section card'>
      {/* Toast nổi */}
      <Toast open={toast.open} title={toast.title} msg={toast.msg} onClose={()=>setToast(s=>({...s,open:false}))} />

      <h2 className='h2'>Quiz – chấm điểm tức thì</h2>
      <p className='p'>Chọn đáp án, sau khi nộp sẽ hiện lời giải thích.</p>

      {useAi && (
        <div className="pill">
          <span className="dot" aria-hidden="true"></span>
          <span><b>Đang dùng bộ câu từ AI</b> • {aiCount} câu • {aiTime}</span>
        </div>
      )}

      <div className='quiz'>
        {questions.map((q,qi)=>(
          <div key={qi} className='qblock'>
            <div className='q'>{qi+1}. {q.q}</div>
            {q.options.map((o,oi)=>(
              <label key={oi} className={'opt ' + (answers[qi]===oi?'selected':'')}>
                <input type='radio' name={'q'+qi} style={{display:'none'}} onChange={()=>onSelect(qi,oi)} />
                {o}
              </label>
            ))}
            {submitted && (
              <div className='p' style={{opacity:.9, marginTop:6}}>
                <b>Đáp án đúng:</b> {q.options[q.answer]} {q.explain && `— ${q.explain}`}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap:10, marginTop:14}}>
        <button className='button' onClick={()=>setSubmitted(true)}>Nộp bài</button>
        <button className='button ghost' onClick={()=>{setAnswers({});setSubmitted(false)}}>Làm lại</button>
        <button className={'button ghost ' + (loading?'loading':'')} onClick={handleAiQuiz} disabled={loading}>
          {loading ? (<><span className="spinner"/> Đang tạo quiz…</>) : 'Tạo quiz bằng AI'}
        </button>
      </div>

      {submitted && (
        <div className='result' style={{marginTop:14}}>
          <b>Kết quả:</b> {score} / {questions.length} — {(score/questions.length*100).toFixed(0)}%
          <div style={{fontSize:12, opacity:.8, marginTop:6}}>
            <i>{useAi ? 'AI-assisted (đã kiểm chứng nguồn trước khi công bố)' : 'Bộ câu mặc định'}</i>
          </div>
        </div>
      )}
    </section>
  )
}
