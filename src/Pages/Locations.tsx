import React, { useState, useEffect } from 'react';
import './Locations.css';
import CardContainer from '../Components/CardContainer/CardContainer';
import Card from '../Components/Card/Card';
import NavMenu from '../Components/NavMenu';
import placeHolderImg from '../Assets/placeholder.jpg';
import { collection, getDocs } from 'firebase/firestore';
import { imgDB } from '../firebase/index';

const Locations = () => {
    const [data, setData] = useState([]);
    const getData = async () => {
        const valRef = collection(imgDB, 'images');
        const dataDB = await getDocs(valRef);
        
        console.log(dataDB);
    }  
    
    useEffect(() => {

    
    })
    return (
        <div className='main'>
            <NavMenu />
            <div className='banner'>
                <img className='placeHolder' id="bannerImg" src={placeHolderImg}/>
                <div id='bannerTint'></div>
                <h1 id='galleryName'>Perspective Gallery</h1>
            </div>
            <div className='disp_img'>
                <div className='testing'></div>
                <div className='testing'></div>
                <div className='testing'></div>
                <div className='testing'></div>
                <div className='testing'></div>
                <div className='testing'></div>
                {/* just added for formatting check */}
                {/* feel free to add onclick listener or smt */}
            </div>
        </div>
        
    );
};
export default Locations;