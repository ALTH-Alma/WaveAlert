import { Link } from "react-router-dom";
import logo from "../assets/proyecto.png";
import "../index.css"
import proyecto from "../assets/WaveAlert-removebg-preview.png"
import real from "../assets/hora.png"
import calor from "../assets/mapa-de-calor (1).png"
import alerta from "../assets/alerta.png"
import area from "../assets/area.png"
function Home() {
    return (
        <div className="flex flex-col bg-white h-full bg-opacity-50 rounded-2xl">
            <div className="flex flex-col items-center justify-center">
                <img className="h-64 w-64" src={logo} alt="" />
                <img className="h-24 w-80" src={proyecto} alt="" />
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

            <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-4  lg:mt-20 ml-12 mr-12">
                <a href="#"
                    className="transition-all  duration-1000 bg-white hover:bg-blue-500  hover:shadow-xl m-2 p-4 relative z-40 group  ">
                    <div
                        className=" absolute  bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  ">
                    </div>
                    <div className="py-2 px-9 relative  ">

                        <img src={real} className="h-16 w-16" alt="" />
                        <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">Monitoreo en tiempo real
                        </h3>
                        <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">
                            Ofrecemos servicios de monitoreo en tiempo real para conocer la ubicación de sus esquiadores usando radiofrecuencia.</p>
                    </div>
                </a>

                <a href="#"
                    className="transition-all  duration-1000 bg-white hover:bg-blue-500  hover:shadow-xl m-2 p-4 relative z-40 group  ">
                    <div
                        className=" absolute  bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  ">
                    </div>
                    <div className="py-2 px-9 relative  ">

                    <img src={calor} className="h-16 w-16" alt="" />
                        <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">Mapas de calor
                        </h3>
                        <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">
                            A través del servicio de mapas de calor podrán visualizar aquellas zonas de mayor concentración de esquiadores.</p>
                    </div>
                </a>

                <a href="#"
                    className="transition-all  duration-1000 bg-white hover:bg-blue-500  hover:shadow-xl m-2 p-4 relative z-40 group  ">
                    <div
                        className=" absolute  bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  ">
                    </div>
                    <div className="py-2 px-9 relative  ">

                    <img src={alerta} className="h-16 w-16" alt="" />
                        <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">Recepción de alertas
                        </h3>
                        <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">
                            El sistema es capaz de recibir alertas provenientes de las pulseras de los esquiadores cuando estos sufran
                            de algún accidente en las pistas.</p>
                    </div>
                </a>

                <a href="#"
                    className="transition-all  duration-1000 bg-white hover:bg-blue-500  hover:shadow-xl m-2 p-4 relative z-40 group  ">
                    <div
                        className=" absolute  bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  ">
                    </div>
                    <div className="py-2 px-9 relative  ">

                    <img src={area} className="h-16 w-16" alt="" />
                        <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">Envío de alertas
                        </h3>
                        <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">
                            El sistema es capaz de detectar a esquiadores que ingresen en zonas delimitadas peligrosas y le permitirá
                            administrar el envio de alertas hacia estos individuos.</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Home;