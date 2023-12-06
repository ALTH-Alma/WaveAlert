
import credentials from "./Credentials/credentials";
import { useEffect, useState } from "react"
import calor from "../assets/Mapa_de_calor-removebg-preview.png"
import points from "./points";
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
function HeatMap() {
    const [esquiador, setEsquiador] = useState(false);
    const position = [51.505, -0.09]
    const recibirDatos = (value: any) => {
        setEsquiador(value);
    }
    useEffect(() => {
    // Datos de ejemplo (latitud, longitud, intensidad)
    const data = points;
    const heatData = data.map(([lat, lon, intensity]) => [lat, lon, intensity]);
    const map = L.map('map').setView([-37.87, 175.475], 12); // Establece el centro y el zoom inicial
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Añade una capa de mosaico
    const heatLayer = (L as any).heatLayer(heatData).addTo(map);
 
    return () => { 
        // Limpia los recursos cuando el componente se desmonta
        map.remove();
      };
    }, []); // El segundo argumento del useEffect asegura que este código se ejecute solo una vez al montar el componente
  
    return (
        <div className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            <img className="h-12 w-56 mb-8" src={calor} alt="" />
                <div id="map" style={{ width: '100%', height: '500px' }} className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md w-2/3">
                </div>
        </div>
    );
}

export default HeatMap;