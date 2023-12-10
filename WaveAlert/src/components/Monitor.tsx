
import credentials from "./Credentials/credentials";
import { useEffect, useRef, useState } from "react"
import alerta from "../assets/enviarAlerta-removebg-preview.png"
import points from "./points";
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { getAllAreas, getDangerousAreas, getSafeAreas } from "../services/alertas";
import { useQuery } from "react-query";
import { lastposition } from "../services/user";
import useInterval from "../hooks/useInterval"
import real from '../assets/tiempo_real-removebg-preview.png'
function Monitor() {

    const { data: areasData, refetch: refetchDanger } = useQuery({
        queryKey: ["allAreas"],
        queryFn: () => getAllAreas(),
        onSuccess: (danger) => { console.log("All:", danger) }
    })

    const { data: lastPosition, refetch: refetchlastPosition } = useQuery({
        queryKey: ["lastPosition"],
        queryFn: () => lastposition(),
        onSuccess: (danger) => { console.log("Last:", danger) }
    })

    // Refrescar lastPosition cada segundo
    useEffect(() => {
        const intervalId = setInterval(() => {
            refetchlastPosition();
        }, 1000);

        return () => clearInterval(intervalId);  // Limpiar el intervalo cuando el componente se desmonta
    }, [refetchlastPosition]);

    const mapRef = useRef(null);

    useEffect(() => {
        if (areasData && areasData.areas) {
            if (!mapRef.current) {
                const val = areasData.areas[2].area.coordinates[0]
                // Initialize map only if it's not already initialized
                //const map = L.map('map').setView([val[0], val[1]], 18);
                const map = L.map('map').setView([-33.505246, -70.777863], 18)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                areasData.areas.forEach(d => {
                    if (d.risk_level == "Bajo") {
                        var polygon = L.polygon(d.area.coordinates, { color: 'blue' });
                        const label = `${d.area_name}`;
                        const popup = L.popup().setContent(label);
                        polygon.bindPopup(popup);
                        polygon.addTo(map);
                    } else {
                        var polygon = L.polygon(d.area.coordinates, { color: 'red' });
                        const label = `${d.area_name}`;
                        const popup = L.popup().setContent(label);
                        polygon.bindPopup(popup);
                        polygon.addTo(map);
                    }

                });

                mapRef.current = map;
            } else {
                // Limpiar marcadores existentes en el mapa
                mapRef.current?.eachLayer((layer) => {
                    if (layer instanceof L.Marker) {
                        layer.remove();
                    }
                });

                // Agregar marcadores desde lastPosition
                if (lastPosition != undefined) {
                    lastPosition.forEach(p => {
                        L.marker([p.latitude, p.longitude]).addTo(mapRef.current);
                    })
                }
            }
        }
    }, [lastPosition]);

    return (
        <div className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            <img className="h-16 w-58 mb-8" src={real} alt="" />
            <div className="flex flex-row gap-36 w-full">
                <div id="map" style={{ width: '100%', height: '800px' }} className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md w-2/3">
                </div>
            </div>

        </div>
    );
}

export default Monitor;