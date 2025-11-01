import React, { useEffect, useState } from 'react'
import log from '../ai-usage.json'

export default function AiUsage(){
  const [ack, setAck] = useState(() => localStorage.getItem('ai_ack')==='1')

  useEffect(()=>{ localStorage.setItem('ai_ack', ack ? '1' : '0') }, [ack])

  return (
    <section className='section card'>
      <h2 className='h2'>AI Usage (minh bạch & liêm chính)</h2>

      <p className='p'>
        Nhóm sử dụng AI để hỗ trợ <b>soạn nháp</b> nội dung và <b>gợi ý quiz</b>, sau đó <b>kiểm chứng bằng giáo trình</b> và biên tập lại.
        Tuyệt đối không dùng AI để tạo trích dẫn/nguồn không có thật. Mọi nội dung có gắn <i>“AI-assisted”</i> đều
        được rà soát trước khi công bố.
      </p>

      <div className='badge'>Bảng ghi vết sử dụng AI</div>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr>
              {['Công cụ','Mục đích','Prompt/Phương thức','Dùng ở','Người kiểm','Cách kiểm chứng','Ngày'].map(h=>(
                <th key={h} style={{textAlign:'left', padding:'8px', borderBottom:'1px solid rgba(255,255,255,.15)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {log.map((r,i)=>(
              <tr key={i}>
                <td style={{padding:'8px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>{r.tool}</td>
                <td style={{padding:'8px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>{r.purpose}</td>
                <td style={{padding:'8px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>{r.prompt}</td>
                <td style={{padding:'8px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>{r.used_in}</td>
                <td style={{padding:'8px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>{r.checker}</td>
                <td style={{padding:'8px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>{r.verification}</td>
                <td style={{padding:'8px', borderBottom:'1px solid rgba(255,255,255,.08)'}}>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='badge' style={{marginTop:14}}>Checklist liêm chính</div>
      <ul className='list p'>
        <li>✅ Có log công khai về việc dùng AI (file <code>ai-usage.json</code>).</li>
        <li>✅ Mỗi nội dung AI sinh ra đều được <b>đối chiếu giáo trình</b> trước khi hiển thị.</li>
        <li>✅ Không đưa trích dẫn/số liệu giả; dẫn nguồn rõ ràng.</li>
        <li>✅ Nội dung nhạy cảm về tôn giáo được trình bày <b>tôn trọng – học thuật</b>.</li>
      </ul>

      <label className='opt' style={{display:'inline-flex', alignItems:'center', gap:8, marginTop:8}}>
        <input type='checkbox' checked={ack} onChange={e=>setAck(e.target.checked)} />
        Tôi đã đọc và đồng ý với nguyên tắc sử dụng AI của nhóm.
      </label>
    </section>
  )
}
