import { useQuery } from "react-query";
import { alertasNoGestionadas } from "../services/alertas";
import { useState, useEffect } from "react";
import useInterval from "../hooks/useInterval";


import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';

const ReceivedAlert = () => {
    const [dataFiltered, setDataFiltered] = useState([])
    
    useEffect(() => {
        const map = L.map('map').setView([-37.87, 175.475], 15); // Establece el centro y el zoom inicial
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        return () => {
            // Limpia los recursos cuando el componente se desmonta
            map.remove();
        };
    }, []); // El segundo argumento del useEffect asegura que este código se ejecute solo una vez al montar el componente

    const { data: alertas, refetch } = useQuery({
        queryFn: () => alertasNoGestionadas(),
        onSuccess: (alertas) => {
            const occurrences = countOccurrences(alertas);
            setDataFiltered(occurrences)
            console.log(alertas);
        }
    })

    useInterval(() => {
        refetch();
    }, 1000);


    const countOccurrences = (data) => {
        // Objeto para almacenar los recuentos de cada id
        const idCounts = {};

        // Contar las ocurrencias de cada id
        data.forEach((item) => {
            const { chatId } = item;
            idCounts[chatId] = (idCounts[chatId] || 0) + 1;
        });

        // Convertir el objeto en un arreglo de objetos { id, count }
        const result = Object.entries(idCounts).map(([chatId, count]) => ({ chatId, count }));

        return result;
    };

    //Ahora necesito la ubicacion en tiempo real de cada esquiador que envio una alerta

    return (
        <div className="flex flex-col items-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            <h2 className="mb-8 text-xl mt-8">Alertas Recibidas</h2>
            <div className="flex flex-row h-full w-full items-center gap-4">
                <div className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white bg-blur-md w-1/2">
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
                            {dataFiltered?.map((alerta) => {
                                const nombre = alertas?.find(obj => obj.chatId == alerta.chatId)
                                
                                return (
                                    <tr className="border-b dark:border-neutral-500 bg-red-200">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {alerta.chatId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">{nombre.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{alerta.count}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{nombre.status}</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button className="bg-blue-500 text-white rounded-md px-2 py-1">Atender</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div id="map" className="flex flex-col h-full mb-8 items-center justify-center p-2 bg-opacity-50 bg-white bg-blur-md w-1/2">
                </div>
            </div>
        </div>
    )
}

export default ReceivedAlert;