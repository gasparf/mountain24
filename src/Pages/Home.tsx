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
import { MdArrowDropDown, MdFullscreen } from "react-icons/md";
import { IconContext } from 'react-icons';

const Home = () => {

    const [exploreData, setExploreData] = useState<SnapshotInfo[]>([]);
    const [exploreToggle, setExplore] = useState(false);

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
                const data = await getExploreData();
                setExploreData(data);
            } catch(e) {
                console.log(e);
            }
        }

        document.addEventListener("scroll", () => {
            if(!exploreToggle){
                setExplore(true);
            }
            if(window.scrollY == 0){
                setExplore(false);
            }
        })
        
        exploreDataInit();
    }, [])

    const toggleExplore = () => {
        if(!exploreToggle){
            document.getElementById('exploreSection')?.scrollIntoView({behavior: 'smooth'});
        }else{
            document.getElementById('map')?.scrollIntoView({behavior: "smooth"});
        }
        setExplore(exploreToggle => !exploreToggle);
    }

    return (
        <>
            <div className='Home'>

            <div className='map' id="map">
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
            <IconContext.Provider value={{color: '#fff'}}>
                {
                    !exploreToggle && (<MdArrowDropDown id="exploreToggle" onClick={toggleExplore}/>)
                }
                {
                    exploreToggle && (<MdFullscreen id="exploreToggle" onClick={toggleExplore}/>)
                }
            </IconContext.Provider>


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
