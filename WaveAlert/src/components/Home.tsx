import { Link } from "react-router-dom";
import logo from "../assets/proyecto.png";
import "../index.css"
import proyecto from "../assets/WaveAlert-removebg-preview.png"
function Home()
{
    return (
        <div className="flex flex-col bg-white h-full bg-opacity-50 rounded-2xl">
            <div className="flex flex-col items-center justify-center">
                <img className="h-64 w-64" src={logo} alt=""/>
                <img className="h-24 w-80" src={proyecto} alt=""/>
            </div>

            <div className="flex items-center justify-center mt-8">
            <Link to="/plans" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-80 flex items-center justify-center">
                Ver Planes Disponibles
            </Link>
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