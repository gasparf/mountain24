import React, { useState } from 'react';
import './Locations.css';
import CardContainer from '../Components/CardContainer/CardContainer';
import Card from '../Components/Card/Card';
import NavMenu from '../Components/NavMenu';
import UploadMenu from '../firebase/UploadMenu';
import {ref, getDownloadURL} from "firebase/storage";
import {storage} from "../firebase/FirebaseManager";

const Locations = () => {

    const [imgURL, setURL] = useState<string | null>(null);

    const imRef = ref(storage, 'ASBuilding.jpg');

    getDownloadURL(imRef).then((url) => {
        setURL(url);
    }).catch((e) => {
        console.error("download url retrieval error");
    })
    
    return (
        <div className='main'>
            <NavMenu />
            <div className='banner'> 

            </div>
            <div className='disp_img'>
                <UploadMenu/>
                <img src={imgURL ? imgURL : ''} className='test'/>
            </div>
        </div>
    );
};
export default Locations;