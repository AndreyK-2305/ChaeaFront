// src/components/Login.js
import React from 'react';

const Login = () => {
    return (
        <div className="container">
      {/* Header delgado */}
      <header className="header">
        <h1>Título del Componente</h1>
      </header>

      <div className="main-content">
        {/* Div izquierdo con la imagen */}
        <div className="left-div">
          <img src="ruta_de_tu_imagen.jpg" alt="Descripción de la imagen" className="imagen" />
        </div>

        {/* Div derecho para el contenido que indiques después */}
        <div className="right-div">
          {/* Aquí puedes agregar el contenido que desees */}
          <h2>Contenido del Div Derecho</h2>
          <p>Agrega más contenido aquí...</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
