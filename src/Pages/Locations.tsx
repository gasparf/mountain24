import React, { useEffect, useState } from 'react';
import './Locations.css';
import CardContainer from '../Components/CardContainer/CardContainer';
import Card from '../Components/Card/Card';
import NavMenu from '../Components/NavMenu';
import UploadMenu from '../firebase/UploadMenu';
import { getImgURL } from '../firebase/FirebaseManager';

const Locations = () => {

    const [imgURL, setURL] = useState<string | null>(null);

    const setup = async () => {
        const url = await getImgURL('ASBuilding.jpg');
        setURL(url);
    }

    setup();

    return (
        <div className='main'>
            <NavMenu />
            <div className='banner'>
                <img className='placeHolder' id="bannerImg" src={placeHolderImg}/>
                <div id='bannerTint'></div>
                <h1 id='galleryName'>Perspective Gallery</h1>
            </div>
            <div className='disp_img'>
                <UploadMenu/>
                <img src={imgURL ? imgURL : ''} className='test'/>
            </div>
        </div>
        
    );
};
export default Locations;