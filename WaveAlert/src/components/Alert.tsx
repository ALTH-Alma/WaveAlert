
import credentials from "./Credentials/credentials";
import { useEffect, useState } from "react"
import alerta from "../assets/enviarAlerta-removebg-preview.png"
import points from "./points";
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
function DelimitArea() {
    const [esquiador, setEsquiador] = useState(false);
    const position = [51.505, -0.09]
    const recibirDatos = (value: any) => {
        setEsquiador(value);
    }
    useEffect(() => {
    // Datos de ejemplo (latitud, longitud, intensidad)
    const data = points;
    const heatData = data.map(([lat, lon, intensity]) => [lat, lon, intensity]);
    const map = L.map('map').setView([-37.87, 175.475], 15); // Establece el centro y el zoom inicial
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Añade una capa de mosaico
    const heatLayer = (L as any).heatLayer(heatData).addTo(map);
 
    return () => { 
        // Limpia los recursos cuando el componente se desmonta
        map.remove();
      };
    }, []); // El segundo argumento del useEffect asegura que este código se ejecute solo una vez al montar el componente
  
    return (
        <div className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            <img className="h-12 w-56 mb-8" src={alerta} alt="" />
            <div className="flex flex-row gap-36 w-full">
                <div id="map" style={{ width: '100%', height: '500px' }} className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md w-2/3">
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center justify-center">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-center text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Riesgo</th>
                                                <th scope="col" className="px-6 py-4">Zona</th>
                                                <th scope="col" className="px-6 py-4">Habilitada</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b dark:border-neutral-500 bg-red-200">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    Alto
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">Zona 1</td>
                                                <td className="whitespace-nowrap px-6 py-4">No</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500 bg-red-200">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    Alto
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">Zona 2</td>
                                                <td className="whitespace-nowrap px-6 py-4">No</td>
                                            </tr>
                                            <tr className="border-b dark:border-neutral-500 bg-green-200">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    Bajo
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">Zona 3</td>
                                                <td className="whitespace-nowrap px-6 py-4">Si</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {esquiador &&
                        <div className="flex flex-col items-center justify-center mt-8 bg-white bg-opacity-70 p-4 rounded-lg">
                            <h2 className="text-lg font-bold">Informacion esquiador seleccionado</h2>
                            <table className="min-w-full text-sm font-light mt-4">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500 ">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-left">
                                            Nombre
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center">Zona 1</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500 ">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-left">
                                            ID Pulsera
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center">Zona 2</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500 ">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-left">
                                            Nivel
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-center">Zona 3</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >Enviar alerta</button>
                        </div>}

                </div>
            </div>

        </div>
    );
}

export default DelimitArea;