import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import DocenteLogin from './components/DocentesLog.tsx'
import EstudianteLogin from './components/EstudiantesLog.tsx'
import { Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EstudianteLogin />
  </StrictMode>,
)
