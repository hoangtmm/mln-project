import React from 'react'
import { ask } from '../services/ai'

export default function Theory(){
  const [aiAns, setAiAns] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleAsk = async () => {
    try{
      setLoading(true)
      const { answer } = await ask('CN duy vật biện chứng có chủ trương xóa bỏ tôn giáo không?')
      setAiAns(answer)
    } finally{
      setLoading(false)
    }
  }

  return (
    <section className='section card'>
      <h2 className='h2'>1) Quan điểm của chủ nghĩa Mác – Lênin về tôn giáo (tóm lược)</h2>
      <p className='p'>
        • Tôn giáo là một hiện tượng xã hội – lịch sử, phản ánh những điều kiện sinh hoạt vật chất và tinh thần của con người. <br/>
        • Chủ nghĩa duy vật biện chứng <b>không chủ trương dùng mệnh lệnh để “xóa bỏ” tôn giáo</b>. <br/>
        • Khi điều kiện kinh tế–xã hội phát triển, khoa học–giáo dục nâng cao, những căn nguyên xã hội của tôn giáo sẽ dần thu hẹp; tôn giáo biến đổi theo quy luật khách quan.
      </p>

      <h2 className='h2'>2) Phương châm xử lý vấn đề tôn giáo trong thời kỳ quá độ lên CNXH</h2>
      <ul className='list p'>
        <li>Tôn trọng quyền tự do tín ngưỡng và không tín ngưỡng của công dân.</li>
        <li>Đoàn kết đồng bào có đạo và không đạo trên cơ sở lợi ích dân tộc.</li>
        <li>Phân biệt “tôn giáo” với “lợi dụng tôn giáo” để vi phạm pháp luật.</li>
        <li>Giải pháp căn bản: phát triển kinh tế – xã hội, nâng cao dân trí, khoa học – công nghệ.</li>
      </ul>

      <div className='badge'>Trích dẫn giáo trình</div>
      <p className='p'>
        <b>Tham chiếu:</b> chương <i>Quan hệ dân tộc & tôn giáo ở Việt Nam</i>, các trang 228–234 (bản bạn cung cấp). 
        Khi trích dẫn nguyên văn, vui lòng đối chiếu trực tiếp số trang tương ứng.
      </p>

      {/* Nút TTS */}
      <button
        className='button'
        onClick={()=>{
          const u = new SpeechSynthesisUtterance(
            'Tóm tắt: Chủ nghĩa duy vật biện chứng không chủ trương xóa bỏ tôn giáo bằng mệnh lệnh. ' +
            'Giải pháp căn bản là phát triển kinh tế xã hội, nâng cao dân trí, tôn trọng tự do tín ngưỡng.'
          )
          u.lang = 'vi-VN'
          speechSynthesis.speak(u)
        }}
      >
        Nghe tóm tắt
      </button>

      {/* Nút hỏi trợ giảng (RAG) */}
      <button
        style={{marginLeft:10}}
        className='button ghost'
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? 'Đang hỏi RAG…' : 'Hỏi trợ giảng (RAG)'}
      </button>

      {aiAns && (
        <div className='p card' style={{marginTop:12, whiteSpace:'pre-wrap'}}>
          {aiAns}
          <div style={{fontSize:12, opacity:.8, marginTop:6}}>
            <i>AI-assisted • trả lời dựa trên chapter.txt (RAG) • vui lòng kiểm chứng trước khi công bố</i>
          </div>
        </div>
      )}
    </section>
  )
}
