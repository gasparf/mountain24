import React from 'react';
import './Home.css'
import L from 'leaflet'
import { MapContainer, TileLayer} from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'
import markeer from '../Assets/marker-icon.png'

const Home = () => {

    const customIcon = new Icon({
        iconUrl: markeer,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
    return (
        <div className='Home'>
            <div className='map'>

                <MapContainer 
                
                center={[49.2, -123]} zoom={11} scrollWheelZoom={false} 
                
                >
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={[49.2787246, -122.9181736]} icon={customIcon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>

            </div>
            
        </div>
    )
}; 
export default Home;
