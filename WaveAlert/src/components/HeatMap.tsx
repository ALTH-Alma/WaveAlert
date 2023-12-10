
import credentials from "./Credentials/credentials";
import { useEffect, useRef, useState } from "react"
import calor from "../assets/Mapa_de_calor-removebg-preview.png"
import points from "./points";
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { useQuery } from "react-query";
import { getAllAreas, getCentroids } from "../services/alertas";
import useInterval from "../hooks/useInterval";
function HeatMap() {

    const [centroides, setCentroides] = useState([])
    const { data: centroids, refetch } = useQuery({
        queryKey: ["centroids"],
        queryFn: () => getCentroids(),
        onSuccess: (centroids) => {
            const tmp = [];
            centroids.heatmap_centers.forEach(centroid => {

                const centro = [centroid.center.latitude, centroid.center.longitude, centroid.intense.toString()]
                tmp.push(centro)

            })
            setCentroides(tmp)
        }
    })

    const { data: areasData, refetch: refetchDanger } = useQuery({
        queryKey: ["allAreas"],
        queryFn: () => getAllAreas(),
        onSuccess: (danger) => { console.log("All:", danger) }
    })

    useInterval(() => {
        refetch();
    }, 5000);

    const mapRef = useRef(null);
    useEffect(() => {
        if (areasData && areasData.areas) {
            if (!mapRef.current) {
                const data = centroides;
                let punto = [0, 0]
                if (data[0]?.length > 0) {
                    punto = data[0]
                }
                const heatData = data.map(([lat, lon, intensity]) => [lat, lon, intensity]);
                const map = L.map('map').setView(punto, 18); // Establece el centro y el zoom inicial
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Añade una capa de mosaico
                const heatLayer = (L as any).heatLayer(heatData).addTo(map);

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

                return () => {
                    // Limpia los recursos cuando el componente se desmonta
                    map.remove();
                };
            }
        }
    }, [areasData && areasData.areas && centroides.length > 0]);

    return (
        <div className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            <img className="h-16 w-58 mb-8" src={calor} alt="" />
            <div id="map" style={{ width: '100%', height: '800px' }} className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md w-2/3">
            </div>
        </div>
    );
}

export default HeatMap;