// src/services/ai.js
// Gọi qua proxy => không cần VITE_AI_API nữa
const API = '/api'

async function parseJSON(r){
  const text = await r.text()
  try { return JSON.parse(text) }
  catch { throw new Error('Bad JSON: ' + text.slice(0,120)) }
}

export async function ask(question){
  const url = `${API}/ask?q=${encodeURIComponent(question)}`
  const r = await fetch(url, { method: 'GET' })   // GET để tránh preflight
  if(!r.ok) throw new Error(`/ask ${r.status}`)
  return parseJSON(r)
}

export async function genQuiz(){
  const r = await fetch(`${API}/quiz`, { method: 'GET' }) // GET để tránh preflight
  if(!r.ok) throw new Error(`/quiz ${r.status}`)
  return parseJSON(r)
}
