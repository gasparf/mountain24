import React, { useEffect, useState } from 'react';
import './Home.css'
import L from 'leaflet'
import { MapContainer, TileLayer} from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'
import markeer from '../Assets/marker-icon.png'
import NavMenu from '../Components/NavMenu'
import PopUpCard from '../Components/PopUp'
import { getExploreData, SnapshotInfo } from '../firebase/FirebaseManager';

const Home = () => {

    const [exploreData, setExploreData] = useState<SnapshotInfo[]>([]);

    const customIcon = new Icon({
        iconUrl: markeer,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })

    useEffect(() => {
        const exploreDataInit = async () => {
            try{
                const test = await getExploreData()
                setExploreData(test)
            } catch(e) {
                console.log(e)
            }
        }
        
        exploreDataInit();
    }, [])

    return (
        <>
            <div className='Home'>

            <div className='map'>
                <MapContainer 
                
                center={[49.2, -123]} zoom={11} scrollWheelZoom={true} 
                
                >
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={[49.2787246, -122.9181736]} icon={customIcon}>
                        <Popup>
                            <div className="popup"> 
                                <PopUpCard />
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>

            </div>
            <div className='menu'>
                    
                    <NavMenu />

            </div>



            </div>
            <div id='exploreSection'>
                {
                    exploreData.map((loc) => (
                        <img src={loc.photo as string} className='panel'></img>
                    ))
                }
            </div>
        </>
        
    )
}; 
export default Home;
