import { SetStateAction, useState } from 'react';
import iconChaea from './icons/iconChaea.jpg';
// Importa tus componentes que se mostrarán según la selección
import VerGruposDoc from './verGruposDoc.tsx'; 
import CrearGruposDoc from './crearGruposDoc.tsx';

const DocentesMain = () => {
  const [selectedSection, setSelectedSection] = useState('verGrupos'); // Estado para controlar la sección seleccionada

  const handleClick = (section: SetStateAction<string>) => {
    setSelectedSection(section); // Cambia la sección activa
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header con logo de chaea */}
      <header className="bg-[rgb(229,144,144)] h-16 flex justify-end items-center w-full">
        <img src={iconChaea} alt="Logo Chaea" className="h-full w-auto object-contain rounded-full" />
        <div className='w-12'></div>
      </header>

      {/* Barra superior */}
      <div className='w-full h-12 bg-[rgb(168,13,13)] justify-between items-center flex flex-row'>
        <h2 className='text-white pl-8 font-bold text-xl'>DOCENTES</h2>
        <h2 className='text-white pr-14 font-bold text-xl'>#NOMBRE PROFESOR#</h2>
      </div>

      {/* Contenedor principal */}
      <div className="main-content flex-grow flex w-full">
        {/* Nav lateral izquierdo */}
        <nav className="w-64 h-auto bg-white text-black flex flex-col items-start p-1 space-y-1">
          <a className='bg-[rgb(168,13,13)] py-2 w-full text-center font-bold text-lg text-white rounded'>Mis Grupos</a>

          <a
            href="#"
            onClick={() => handleClick('verGrupos')}
            className={`odd:bg-[rgb(255,222,222)] even:bg-white font-bold py-3 w-full text-left rounded pl-4 border ${selectedSection === 'verGrupos' ? 'border-2 border-[rgb(168,13,13)] bg-[rgb(229,144,144)]' : 'border-transparent'}`}
          >
            Ver Grupos
          </a>

          <a
            href="#"
            onClick={() => handleClick('crearGrupo')}
            className={`odd:bg-[rgb(255,222,222)] even:bg-white font-bold py-3 w-full text-left rounded pl-4 border ${selectedSection === 'crearGrupo' ? 'border-2 border-[rgb(168,13,13)] bg-[rgb(229,144,144)]' : 'border-transparent'}`}
          >
            Crear Grupo
          </a>
        </nav>

        {/* Div que va a cambiar segun...*/}
        <div className="right-div bg-[rgb(217,217,217)] w-full h-auto flex flex-col justify-center items-center space-y-12 py-12">
          {/* Renderizado condicional del contenido según la selección */}
          {selectedSection === 'verGrupos' && <VerGruposDoc />}
          {selectedSection === 'crearGrupo' && <CrearGruposDoc />}
        </div>
      </div>

      {/* Footer */}
      <footer className='w-full h-12 bg-[rgb(229,144,144)] justify-between items-center flex flex-row'></footer>
    </div>
  );
};

export default DocentesMain;
