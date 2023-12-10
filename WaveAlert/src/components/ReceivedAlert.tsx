import { useMutation, useQuery } from "react-query";
import { alertasNoGestionadas, atenderPersona } from "../services/alertas";
import { useState, useEffect } from "react";
import useInterval from "../hooks/useInterval";

import emergencia from "../assets/llamada-de-emergencia.png"
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { tryLogin } from "../services/user";
import Modal from "./Modal";
import recibidas from '../assets/Alertas_recibidas-removebg-preview.png'
const ReceivedAlert = () => {
    const [dataFiltered, setDataFiltered] = useState([]);
    const [atend, setAtend] = useState(false);
    const { data: alertas, refetch } = useQuery({
        queryKey: ["alertasNoGestionadas"],
        queryFn: () => alertasNoGestionadas(),
        onSuccess: (alertas) => {
            const occurrences = countOccurrences(alertas);
            setDataFiltered(occurrences)
            console.log(alertas);
        }
    })

    const atenderMutation = useMutation({
        mutationKey: "atender",
        mutationFn: (data: { chatId: string }) => atenderPersona(data),
    });

    useInterval(() => {
        refetch();
    }, 1000);

    useEffect(() => {

        const map = L.map('map').setView([-33.449778253221275, -70.68650244035004], 18); // Establece el centro y el zoom inicial
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        dataFiltered?.forEach(p => {
            const nombre = alertas.find(obj => obj.chatId == p.chatId)
            L.marker([nombre.latitude, nombre.longitude]).addTo(map).bindPopup(nombre.name)
        })

        return () => {
            // Limpia los recursos cuando el componente se desmonta
            map.remove();
        };
    }, [dataFiltered.length > 0 && alertas]); // El segundo argumento del useEffect asegura que este código se ejecute solo una vez al montar el componente

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

    return (
        <div className="flex flex-col items-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            
            <div className="flex flex-row h-full w-full gap-4">
                <div className="flex flex-col items-center p-2 bg-opacity-50 bg-blur-md w-1/2 h-1/2">
                <img className="h-14 w-56 mb-8 mt-2" src={recibidas} alt="" />
                    <table className="min-w-full text-center text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Informacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataFiltered.length == 0 && <tr className="border-b dark:border-neutral-500 bg-green-300">
                            <td className="whitespace-nowrap px-6 py-4">No hay alertas</td></tr>}
                            {dataFiltered?.map((alerta) => {
                                const nombre = alertas?.find(obj => obj.chatId == alerta.chatId)
                                return (
                                    <div className="flex items-center justify-center w-full">
                                        <Modal isVisible={atend}>
                                            <div className="flex flex-col justify-center items-center h-[100vh]">
                                                <div className="backdrop-filter backdrop-blur-3xl relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-400 w-[400px] mx-auto p-4 bg-gray-100 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none" style={{ zIndex: 1000 }}>
                                                    <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                                                        
                                                        <div className="absolute -bottom-12 flex h-[107px] w-[107px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                                                            <img className="h-full w-full rounded-xl" src={emergencia} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-16 flex flex-col items-center">
                                                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                                            {nombre.name}
                                                        </h4>
                                                        <p className="text-base font-normal text-gray-600">Esquiador</p>
                                                    </div>
                                                    <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <p className="text-2xl font-bold text-navy-700 dark:text-white">ID</p>
                                                            <p className="text-sm font-normal text-gray-600">{alerta.chatId}</p>
                                                        </div>
                                                        <div className="flex flex-col items-center justify-center">
                                                            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                                                {alerta.count}
                                                            </p>
                                                            <p className="text-sm font-normal text-gray-600">Alertas recibidas</p>
                                                        </div>
                                                    </div>
                                                    <button className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                                        onClick={() => { setAtend(false); atenderMutation.mutate({ chatId: alerta.chatId }) }}>
                                                        Contactar emergencias
                                                    </button>
                                                </div>

                                            </div>
                                        </Modal>
                                        <tr className="border-b dark:border-neutral-500 bg-red-200">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                {alerta.chatId}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">{nombre.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{alerta.count}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{nombre.status}</td>
                                            <td className="whitespace-nowrap px-6 py-4"><button onClick={() => { setAtend(true) }} className="bg-blue-500 text-white rounded-md px-2 py-1">Atender</button></td>
                                        </tr></div>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div id="map" className="flex flex-col h-full mb-8 items-center justify-center p-2 bg-opacity-50 bg-white bg-blur-md w-1/2" style={{ width: '100%', height: '800px' }}>
                </div>
            </div>


        </div>
    )
}

export default ReceivedAlert;