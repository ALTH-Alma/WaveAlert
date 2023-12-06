import logo from "../assets/proyecto.png";
import { Link, useNavigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { logout } from "../services/user";
import proytecto from "../assets/WaveAlert-removebg-preview.png"
function Navbar() {
    const user = useAuthCheck();
    const navigate = useNavigate();
    const logoutMutation = useMutation({
        mutationFn: (user: { mail: string, pass: string }) => logout(user),
        onSuccess: () => {window.location.reload()}
    })

    const salir = () => {
        logoutMutation.mutate({ mail: user.data?.email || "", pass: user.data?.pass || "" })
        
    }
    return (
        <header
            className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-1 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-center">
                    <div className="absolute left-0 shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <img className="h-16 w-auto" src={logo} alt="" />
                            <p className="sr-only">WAVEALERT</p>
                        </a>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-8">
                        <Link aria-current="page"
                            className="inline-block rounded-lg px-2 py-1 text-md font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            to="/">Inicio</Link>
                        {!user.data && <Link className="inline-block rounded-lg px-2 py-1 text-md font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            to="/plans">Ver Planes</Link>}

                        {user.data && <Link className="inline-block rounded-lg px-2 py-1 text-md font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            to="/alert">Monitorear</Link>}

                        {user.data && <Link className="inline-block rounded-lg px-2 py-1 text-md font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                            to="/heatmap">Mapa de calor</Link>}


                    </div>
                    <div className="absolute right-5">
                        {user.data && <button className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            onClick={salir}>Cerrar sesion</button>}
                    </div>
                    <div className="absolute right-20 ">
                        {!user.data &&
                            <Link className="mr-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                to="/login">Iniciar Sesion</Link>}

                        {!user.data &&
                            <Link className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                to="/register">Registrarse</Link>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;