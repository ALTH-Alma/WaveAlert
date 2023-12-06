import {useState} from "react"

const Emergencias = () => {
    const [emergency, setEmergency] = useState(0)

    const verEmergencia = () =>
    {
        setEmergency(1);
    }

    return (
        <div className="flex flex-col">
        <div className="flex flex-col justify-center p-2 bg-white">
            <div className="flex items-center justify-center"><h2 className="mb-8 mt-2 text-2xl font-poppins ">Emergencias</h2></div>

            <div className="flex flex-col">
                <h3 className="ml-8">Tabla de reportes y notificacion de emergencias</h3>
                <h3 className="ml-8">Ultima vez actualizado a las 14:55</h3>
                <h3 className="ml-8">Total: 3</h3>

                <div className="overflow-hidden m-24">
                        <table className="min-w-full text-center text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">Codigo dispositivo</th>
                            <th scope="col" className="px-6 py-4">Hora</th>
                            <th scope="col" className="px-6 py-4">Estado</th>
                            <th scope="col" className="px-6 py-4">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500 ">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                dispositivo-34
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">05-11-2023 12:00</td>
                            <td className="whitespace-nowrap px-6 py-4 "><p className="bg-red-500 rounded-xl p-2">Sin atender</p></td>
                            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center"><button onClick={verEmergencia}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg></button>
                            </td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500 ">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                dispositivo-43
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">05-11-2023 12:15</td>
                            <td className="whitespace-nowrap px-6 py-4 "><p className="bg-green-500 rounded-xl p-2">En curso</p></td>
                            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500 ">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                dispositivo-59
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">05-11-2023 10:26</td>
                            <td className="whitespace-nowrap px-6 py-4 "><p className="bg-blue-500 rounded-xl p-2">Finalizada</p></td>
                            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                </td>
                            </tr> 
                            
                        </tbody>
                        </table>
                    </div>
            </div>

            
        </div>

        {emergency && 
                    <div className="mt-12 bg-white p-4">
                        <h2 className="flex items-center justify-center text-lg font-poppins">Informacion de la Emergencia</h2>
                        <div className="flex flex-col mt-8">
                            <div className="flex flex-row">
                                <h3>Identificador del dispositivo</h3>
                                <h3 className="ml-12">dispositivo-34</h3>
                                <h3 className="ml-12 underline text-purple-400">ver datos completos del dispositivo</h3>
                            </div>

                            <div className="flex flex-row">
                                <h3>Usuario actual</h3>
                                <h3 className="ml-36">Arturo Terra</h3>
                                <h3 className="ml-16 underline text-purple-400">ver datos completos de la persona</h3>
                            </div>

                            <div className="flex flex-row">
                                <h3>Estado de la emergencia</h3>
                                <h3 className="ml-16">Sin atender</h3>
                            </div>

                            <div className="flex flex-row">
                                <h3>Tipo de emergencia accionada</h3>
                                <h3 className="ml-12">Tipo 1</h3>
                            </div>
                        </div>
                    </div>
                    }
        </div>
    )
}

export default Emergencias;