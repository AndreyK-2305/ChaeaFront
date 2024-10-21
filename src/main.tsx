import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import DocenteLogin from './components/DocentesLog.tsx';
import EstudianteLogin from './components/EstudiantesLog.tsx';
import DocentesMain from './components/DocentesMain.tsx';

// Creas el root y usas BrowserRouter para definir las rutas
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Define las rutas con sus respectivos componentes */}
        <Route path="/" element={<App />} />
        <Route path="/docente-login" element={<DocenteLogin />} />
        <Route path="/estudiante-login" element={<EstudianteLogin />} />
        <Route path="/docentes-main" element={<DocentesMain />} />
      </Routes>
    </Router>
  </StrictMode>,
);
