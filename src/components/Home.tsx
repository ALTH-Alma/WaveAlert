import logo from "../assets/proyecto.png";
import "../index.css"
function Home()
{
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center">
                <img className="h-64 w-64" src={logo} alt=""/>
                <div className="items-center justify-center"><h1 className="font-semibold text-3xl">Monitorización + Seguridad = Control</h1></div>
            </div>

            <div className="flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-80">
                Ver Planes Disponibles
            </button>
            </div>

            <div className="flex items-center justify-center mt-4 gap-4"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a className="underline-with-circle text-lg" href="#">Deseo ser contactado</a>
            </div> 
        </div>
    )
}

export default Home;