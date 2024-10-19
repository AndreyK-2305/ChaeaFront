import iconChaea from './icons/iconChaea.jpg';
import bckDocente from './icons/bckDocente.jpg';
import googleIcon from './icons/googleIcon.png';

const DocentesMain = () => {
  return (
    <div className="w-full h-full min-h-screen">
      {/* Header con logo de chaea */}
      <header className="bg-[rgb(207,203,203)] h-16 flex justify-center w-full">
        <img src={iconChaea} alt="Logo Chaea" className='rounded-full'/>
      </header>

      {/* Contenedor principal de contenido */}
      <div className="main-content flex w-full h-full">
        {/* Div izquierdo con la imagen */}
        <div className="w-1/2 h-screen flex justify-center items-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bckDocente})` }}>
          
        </div>

        {/* Div derecho para el contenido */}
        <div className="right-div bg-[rgb(249,245,242)] w-1/2 h-screen flex flex-col justify-center items-center space-y-12 pb-24">
          <h1 className='text-[rgb(78,42,149)] text-5xl font-extrabold'>Bienvenid@</h1>
          <h2 className='text-3xl font-extrabold'>Continuar como Docente</h2>
          <div className='###BOTON GOOGLE###'>
            <button className="flex items-center justify-center bg-white border border-gray-300 rounded-full py-4 px-32 hover:shadow-lg transition duration-200">
            <img 
            src={googleIcon} 
            alt="Google Logo" 
            className="w-5 h-5 mr-2" 
            />
            <span className="text-gray-800 font-semibold text-xl">Iniciar sesión con Google</span>
            </button>
          </div>
          <h2 className='text-2xl font-semibold italic'>Para ingresar como estudiante</h2>
          
        </div>
      </div>
    </div>
  );
};

export default DocentesMain;
