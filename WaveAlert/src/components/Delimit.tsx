import MapDrawingTools from "./MapDrawingTools";
import delimitar from "../assets/delimitar-removebg-preview.png"
import React, { useState } from "react";

import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import L from 'leaflet';



function SendAlert() {
    const position = [51.505, -0.09]
    const [editableFG, setEditableFG] = useState(null);

    const onCreated = (e:any) => {
        setEditableFG(e.layer);
    };

    const onEdited = (e:any) => {
        setEditableFG(e.layers.getLayers()[0]);
    };

    const onDeleted = () => {
        setEditableFG(null);
    };

    const saveMap = () => {
        if (editableFG) {
            const geoJSON = editableFG.toGeoJSON();
            console.log('Guardar GeoJSON:', geoJSON);
            // Aquí puedes almacenar geoJSON en tu estado, base de datos, etc.
        }
    };
    return (
        <div className="flex flex-col items-center justify-center p-2 bg-opacity-50 bg-white h-full bg-blur-md">
            <img className="h-12 w-56 mb-8" src={delimitar} alt="" />
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
                
                <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png" />
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={onCreated}
                        onEdited={onEdited}
                        onDeleted={onDeleted}
                        draw={{
                            rectangle: false,
                            circle: false,
                            marker: true,
                        }}
                    />
                </FeatureGroup>
                
            </MapContainer>
            <button className="flex items-center justify-center" onClick={saveMap}>Guardar Mapa</button>
        </div>
    )
}

export default SendAlert;