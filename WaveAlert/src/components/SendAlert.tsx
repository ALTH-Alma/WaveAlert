import { useMutation, useQuery } from "react-query";
import { alertarEsquiadorZonaPeligro, alertasNoGestionadas, alertasZonaPeligro } from "../services/alertas";
import { useState, useEffect } from "react";
import useInterval from "../hooks/useInterval";


import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';

const SendAlert = () => {

    //Recibir ID de personas que estan dentro de una zona de riesgo
    const { data: alertas, refetch } = useQuery({
        queryFn: () => alertasZonaPeligro(),
        onSuccess: (alertas) => {
            console.log(alertas)
        }
    })

    const alertarMutation = useMutation({
        mutationFn: (data: {chatId: string, alertar: boolean}) => alertarEsquiadorZonaPeligro(data),
        onSuccess: (data) => {console.log(data)}
    });

    useInterval(() => {
        refetch();
    }, 5000);

    return (
        <div className="flex flex-col items-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            <h2 className="mb-8 text-xl mt-8">Enviar Alerta</h2>
            <div className="flex flex-row w-full m-12">
                <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">ID Pulsera</th>
                            <th scope="col" className="px-6 py-4">Nombre</th>
                            <th scope="col" className="px-6 py-4">N° Alertas</th>
                            <th scope="col" className="px-6 py-4">Estado</th>
                            <th scope="col" className="px-6 py-4">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-neutral-500 bg-red-200">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                1
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">2</td>
                            <td className="whitespace-nowrap px-6 py-4">3</td>
                            <td className="whitespace-nowrap px-6 py-4">4</td>
                            <td className="whitespace-nowrap px-6 py-4"><button onClick={() => 
                            {
                                alertarMutation.mutate({chatId: '6464145869', alertar: true})
                            }} className="bg-blue-500 text-white rounded-md px-2 py-1">Alertas</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SendAlert;