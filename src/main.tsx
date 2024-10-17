import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import DocenteLogin from './components/DocentesLog.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocenteLogin />
  </StrictMode>,
)
