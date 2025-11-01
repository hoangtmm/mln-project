import React, { useEffect, useMemo, useState } from 'react'
import Home from './components/Home'
import Theory from './components/Theory'
import Policy from './components/Policy'
import Quiz from './components/Quiz'
import AiUsage from './components/AiUsage'
import Sources from './components/Sources'

const TABS = [
  { key:'home', label:'Trang chủ' },
  { key:'theory', label:'Lý luận Mác – Lênin' },
  { key:'policy', label:'Chính sách ở Việt Nam' },
  { key:'quiz', label:'Quiz tương tác' },
  { key:'ai', label:'AI Usage' },
  { key:'sources', label:'Tài liệu tham khảo' },
]

export default function App(){
  const [tab,setTab] = useState('home')

  // ===== Theme (dark/light) =====
  const systemDark = useMemo(()=> window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches, [])
  const [theme, setTheme] = useState(()=> localStorage.getItem('theme') || (systemDark ? 'dark' : 'light'))
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  },[theme])

  return (
    <div>
      {/* Header */}
      <header className='header'>
        <div className='container'>
          <div className='nav'>
            <div className='brand'>Hiểu đúng: Tôn giáo & CNXH</div>
            <div className='nav-actions'>
              <button
                className='theme-btn'
                onClick={()=> setTheme(t => t === 'dark' ? 'light' : 'dark')}
                aria-label='Đổi chế độ sáng/tối'
                title='Đổi chế độ sáng/tối'
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" strokeWidth="1.5"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5" stroke="currentColor" strokeWidth="1.5"/></svg>
                )}
                <span>{theme === 'dark' ? 'Tối' : 'Sáng'}</span>
              </button>
            </div>
          </div>

          <nav className='tabs' aria-label='Điều hướng'>
            {TABS.map(t => (
              <button
                key={t.key}
                className='tab'
                aria-current={tab===t.key?'page':undefined}
                onClick={()=>setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className='container'>
        {tab==='home' && <Home goLearn={()=>setTab('theory')} goQuiz={()=>setTab('quiz')} />}
        {tab==='theory' && <Theory/>}
        {tab==='policy' && <Policy/>}
        {tab==='quiz' && <Quiz/>}
        {tab==='ai' && <AiUsage/>}
        {tab==='sources' && <Sources/>}
      </main>

      <div className='footer'>© Nhóm … • Sản phẩm sáng tạo môn CNXHKH</div>
    </div>
  )
}
