import geo from '../assets/marcador-de-posicion.png'
import calor from '../assets/mapa-de-calor.png'
import prediccion from '../assets/prediccion.png'
import { useState } from 'react'
const Plans = () => {
    const [premiumVisible, setPremiumVisible] = useState(false)
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center p-2 bg-white bg-opacity-50">
                <h2 className="flex items-center justify-center text-2xl font-bold mt-8">Planes</h2>
                <div className="flex items-center justify-center m-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <div className="p-1 bg-blue-200">
                            </div>
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Plan Basico</h2>
                                <p className="text-gray-600 mb-6">Ideal para centros pequeños</p>
                                <p className="text-4xl font-bold text-gray-800 mb-6">$987.576</p>
                                <ul className="text-sm text-gray-600 mb-6">
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        500 usuarios diarios
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Emision de alertas
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        1 GateWay LoRaWAN
                                    </li>
                                    <li className="flex items-center mt-2">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Soporte 24/7
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4">
                                <button
                                    className="w-full bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                                    Seleccionar Plan
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <div className="p-1 bg-green-200">
                            </div>
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Plan Medio</h2>
                                <p className="text-gray-600 mb-6">Perfecto para centros medianos</p>
                                <p className="text-4xl font-bold text-gray-800 mb-6">$1.506.136</p>
                                <ul className="text-sm text-gray-600 mb-6">
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        200 usuarios diarios
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Prediccion de alfuencia
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Delimitacion de zonas
                                    </li>
                                    <li className="flex items-center mt-2">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        2 GateWay LoRaWAN
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4">
                                <button
                                    className="w-full bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                                    Seleccionar Plan
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <div className="p-1 bg-purple-200">
                            </div>
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Plan Premium</h2>
                                <p className="text-gray-600 mb-6">Perfecto para centros grandes</p>
                                <p className="text-4xl font-bold text-gray-800 mb-6">$3.601.525</p>
                                <ul className="text-sm text-gray-600 mb-6">
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        +1000 usuarios diarios
                                    </li>
                                    <li className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http

://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Optimizacion de colas de remontes
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Historial de Ioc
                                    </li>
                                    <li className="flex items-center mt-2">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        4 GateWays LoRaWAN
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4">
                                <button
                                    className="w-full bg-purple-500 text-white rounded-full px-4 py-2 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple active:bg-purple-800">
                                    Seleccionar Plan
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Plans;