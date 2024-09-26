import { useMutation, useQuery } from "react-query";
import { alertarEsquiadorZonaPeligro, alertasNoGestionadas, alertasZonaPeligro, getAllAreas } from "../services/alertas";
import { useState, useEffect, useRef } from "react";
import useInterval from "../hooks/useInterval";


import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import enviar from "../assets/enviarAlerta-removebg-preview.png"
const SendAlert = () => {

    //Recibir ID de personas que estan dentro de una zona de riesgo
    const { data: alertas, refetch } = useQuery({
        queryFn: () => alertasZonaPeligro(),
        onSuccess: (alertas) => {
            console.log(alertas)
        }
    })

    const [datosEnvioAlerta, setDatosEnvioAlerta] = useState({});

    const alertarMutation = useMutation({
        mutationFn: (data: { chatId: string, alertar: boolean }) => alertarEsquiadorZonaPeligro(data),
        onSuccess: (data) => { console.log(data) }
    });

    useInterval(() => {
        refetch();
    }, 5000);

    const { data: areasData, refetch: refetchDanger } = useQuery({
        queryKey: ["allAreas"],
        queryFn: () => getAllAreas(),
        onSuccess: (danger) => { console.log("All:", danger) }
    })
    const mapRef = useRef(null);
    useEffect(() => {
        if (areasData && areasData.areas) {
            if (!mapRef.current) {
                const map = L.map('map').setView([-33.44998246617368, -70.68648556380573], 18); // Establece el centro y el zoom inicial
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                areasData.areas.forEach(d => {
                    // Create a popup with a label

                    if (d.risk_level == "Bajo") {
                        var polygon = L.polygon(d.area.coordinates, { color: 'blue' });
                        const label = `Nivel de riesgo: ${d.risk_level}`;
                        const popup = L.popup().setContent(label);
                        polygon.bindPopup(popup);
                        polygon.addTo(map);
                    } else {
                        var polygon = L.polygon(d.area.coordinates, { color: 'red' });
                        const label = `Nivel de riesgo: ${d.risk_level}`;
                        const popup = L.popup().setContent(label);
                        polygon.bindPopup(popup);
                        polygon.addTo(map);
                    }

                });

                alertas?.user_in_danger_pos.forEach(p => {
                    L.marker([p[0], p[1]]).addTo(map)
                })

                return () => {
                    // Limpia los recursos cuando el componente se desmonta
                    map.remove();
                };
            }
        }
    }, [areasData && areasData.areas]);

    return (
        <div className="flex flex-col p-2 bg-opacity-50 bg-white h-full bg-blur-md items-center
        ">


            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 m-4 items-center">
                    <img className="h-14 w-56 mb-8" src={enviar} alt="" />
                    <table className="min-w-full text-center text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">ID Pulsera</th>
                                <th scope="col" className="px-6 py-4">Nombre</th>
                                <th scope="col" className="px-6 py-4">Acción</th>
                            </tr>
                        </thead>
                        <tbody>

                            {alertas != undefined && alertas.users_in_danger_chatId?.map((alert, item) => {
                                return (
                                    <tr key={item} className="border-b dark:border-neutral-500 bg-red-200">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {alert}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">{alertas.user_in_danger_name[item]}</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button onClick={() => {
                                            const data = { 'id': alert, 'pos': alertas.user_in_danger_pos[item], 'name': alertas.user_in_danger_name[item] }
                                            setDatosEnvioAlerta(data)
                                            alertarMutation.mutate({ chatId: alert, alertar: true })
                                        }} className="bg-red-800 text-white rounded-md px-2 py-1">Enviar alerta</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>


                    {Object.keys(datosEnvioAlerta).length > 0 &&
                        <div className="flex flex-row items-center mt-8">
                            <h2 className="text-lg text-green-900 mt-10 mr-2 font-poppins">Alerta enviada con éxito: </h2>
                            <table className="w-1/4 text-center text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">ID Pulsera</th>
                                        <th scope="col" className="px-6 py-4">Nombre</th>
                                        <th scope="col" className="px-6 py-4">Lat</th>
                                        <th scope="col" className="px-6 py-4">Long</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500 bg-blue-200">
                                        <td className="whitespace-nowrap px-6 py-4">{datosEnvioAlerta.id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{datosEnvioAlerta.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{datosEnvioAlerta.pos[0]}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{datosEnvioAlerta.pos[1]}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>

                        </div>}


                </div>
                <div id="map" style={{ width: '100%', height: '800px' }} className="mt-20 flex flex-col h-full w-1/2 mb-8 items-center justify-center p-2 bg-opacity-50 bg-white bg-blur-md"></div>
            </div>
        </div>
    )
}

export default SendAlert;
