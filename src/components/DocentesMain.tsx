import iconChaea from './icons/iconChaea.jpg';
import bckDocente from './icons/bckDocente.jpg';
import googleIcon from './icons/googleIcon.png';

const DocentesMain = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
        {/* Header con logo de chaea */}
        <header className="bg-[rgb(229,144,144)] h-16 flex justify-end items-center w-full">
            <img src={iconChaea} alt="Logo Chaea" className="h-full w-auto object-contain rounded-full"/>
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
                <a className='pd-8'></a>
                <a className='bg-[rgb(168,13,13)] py-2 w-full text-center font-bold text-lg text-white rounded'>Mis Grupos</a>
                <a href="#" className="odd:bg-[rgb(255,222,222)] even:bg-white font-semibold py-3 w-full text-left rounded">Ver Grupos</a>
                <a href="#" className="odd:bg-[rgb(255,222,222)] even:bg-white font-semibold py-3 w-full text-left rounded">Crear Grupo</a>
            </nav>

            {/* Contenido derecho */}
            <div className="right-div bg-[rgb(217,217,217)] w-full h-auto flex flex-col justify-center items-center space-y-12 py-12">
                {/* Añade contenido aquí */}
            </div>
        </div>

        {/* Footer */}
        <footer className='w-full h-12 bg-[rgb(229,144,144)] justify-between items-center flex flex-row'>
        </footer>
    </div>
  );
};

export default DocentesMain;
