import React from 'react'
import banner from '../assets/banner.png' // nhớ đặt ảnh vào src/assets/banner.png

export default function Home({ goLearn, goQuiz }){
  return (
    <section className='section'>
      <div className='hero'>
        <div className='card'>
          <div className='badge' style={{
            display:'inline-block', padding:'6px 10px', borderRadius:'999px',
            background:'color-mix(in oklab, var(--accent) 12%, var(--surface))',
            border:'1px solid var(--border)', color:'var(--text)', fontSize:12
          }}>Chủ đề CQ9</div>

          <h1 className='h1'>Chủ nghĩa duy vật biện chứng có chủ trương xóa bỏ tôn giáo không?</h1>
          <p className='p'>
            Website tương tác giúp hiểu đúng quan điểm Mác – Lênin về tôn giáo, kết hợp chính sách tôn giáo ở Việt Nam
            và bài tập trắc nghiệm. Mục AI Usage minh bạch cách sử dụng AI theo rubric.
          </p>

          <ul className='list p' style={{marginTop:8}}>
            <li>Mục tiêu: làm rõ không chủ trương “xóa bỏ” tôn giáo bằng mệnh lệnh hành chính.</li>
            <li>Cách tiếp cận: lý luận → chính sách → quiz tương tác.</li>
            <li>Trích dẫn giáo trình (trang 228–234) + RAG cho phần Q&A.</li>
          </ul>

          <div style={{display:'flex', gap:10, marginTop:12, flexWrap:'wrap'}}>
            <button className='button' onClick={goLearn}>Bắt đầu học</button>
            <button className='button ghost' onClick={goQuiz}>Làm quiz</button>
          </div>
        </div>

        <div>
          <img src={banner} alt='Hiểu đúng: Tôn giáo & CNXH' />
        </div>
      </div>
    </section>
  )
}
