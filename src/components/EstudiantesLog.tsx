import { Link } from 'react-router-dom';
import iconChaea from './iconChaea.jpg';
import bckEstudiante from './bckEstudiante.jpeg';
import googleIcon from './googleIcon.png';


const EstudianteLogin = () => {
    return (
      <div className="w-full h-full min-h-screen">
        {/* Header con logo de chaea */}
        <header className="bg-[rgb(207,203,203)] h-16 flex justify-center w-full">
          <img src={iconChaea} alt="Logo Chaea" className='rounded-full'/>
        </header>
  
        {/* Contenedor principal de contenido */}
        <div className="w-full h-screen flex bg-no-repeat bg-contain" style={{ backgroundImage: `url(${bckEstudiante})` }}>
            {/* Div izquierdo para el contenido */}
            <div className="right-div w-1/2 h-screen flex flex-col justify-center items-center space-y-2 pb-64 pr-36 ml-0">
                <h1 className='text-[rgb(81,255,208)] text-6xl font-extrabold pb-9'>Bienvenid@</h1>
                <h2 className='text-4xl font-extrabold text-white'>Continuar como Docente</h2>
                <div className='###BOTON GOOGLE### pt-6 pb-6'>
                <button className="flex items-center justify-center bg-white border border-gray-300 rounded-full py-4 px-32 hover:shadow-lg transition duration-200">
                <img 
                src={googleIcon} 
                alt="Google Logo" 
                className="w-5 h-5 mr-2" 
                />
                <span className="text-gray-800 font-semibold text-lg">Iniciar sesión con Google</span>
                </button>
                </div>
                <h2 className='text-2xl font-semibold italic text-white'>Ingreso para Docente</h2>
                {/*<Link to="###RUTA DEL OTRO COMPONENTE###">*/}
                <h2 className='text-2xl font-semibold italic text-[rgb(255,163,163)]'>Pulsa aquí</h2>
                {/*</Link>*/}
            </div>
        </div>
      </div>
    );
  };
  
  export default EstudianteLogin;
  