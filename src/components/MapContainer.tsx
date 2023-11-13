import React from 'react';
import { GoogleMap, useLoadScript, DrawingManager, Autocomplete, Polygon, useJsApiLoader, LoadScript, Marker} from '@react-google-maps/api';
import { useState, useRef } from "react";
import CircularWithValueLabel from './CircularWithLabeledValue';

const mapContainerStyle = {
  width: '1000px',
  height: '500px',
};
const center = {
  lat: -33.3366134, // default latitude
  lng: -70.2895661, // default longitude
};


const alertas = [
    {id:1, value:"Avalancha"},
    {id:2, value:"Fuera de zona delimitada"},
    {id:3, value:"Zona de riesgo"},
    {id:4, value:"Accidente cerca"}
]

const MapContainer = () => {
    const [modal, setModal] = useState(false);
    const [count, setCount] = useState(false);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDd4LbLjZurArUzMUcRJeddv1GtQ6xooKY',
        libraries:['drawing']
      });
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }
    
    function onMarkerClick () {
        setModal(true);
    }

    return (
        <div>
            
            <GoogleMap
            zoom={15}
            center={center}
            mapContainerStyle={mapContainerStyle}
            >
                <Marker onClick={onMarkerClick} position={center} />
            </GoogleMap>
            {modal ? <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex flex flex-col">
                                    
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Enviar alerta a esquiador
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                            Seleccione tipo de alerta
                                        </p>

                                        {alertas.map((item,index)=> {
                                            return (
                                                <div key={item.id} className='checkbox-container'>
                                                    <input type="checkbox" name="alertas" value={item.value}/><label className='ml-2'>{item.value}</label>
                                                </div>
                                            )
                                        })}

                                        <div className='flex items-center justify-center'>
                                            {count && <CircularWithValueLabel></CircularWithValueLabel>}
                                        </div>
                                        </div>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2"
                                                onClick={() =>
                                                    setCount(true)
                                                }
                                            >
                                                Enviar
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setModal(false)
                                                }
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>:<></>}

                        
        </div>

        
    );
};

export default MapContainer;