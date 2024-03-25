import React, { useState } from 'react';
import './Locations.css';
import CardContainer from '../Components/CardContainer/CardContainer';
import Card from '../Components/Card/Card';
import NavMenu from '../Components/NavMenu';
import UploadMenu from '../firebase/UploadMenu';
import { getImgURL } from '../firebase/FirebaseManager';

const Locations = () => {

    const [imgURL, setURL] = useState<string | null>(null);

    setURL(getImgURL('ASBuilding.jpg'));
    
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