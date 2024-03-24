import React from 'react';
import './Locations.css';
import CardContainer from '../Components/CardContainer/CardContainer';
import Card from '../Components/Card/Card';
import NavMenu from '../Components/NavMenu';
import placeHolderImg from '../Assets/placeholder.jpg';

const Locations = () => {
    return (
        <div className='main'>
            <NavMenu />
            <div className='banner'>
                <img className='placeHolder' id="bannerImg" src={placeHolderImg}/>
                <div id='bannerTint'></div>
                <h1 id='galleryName'>Perspective Gallery</h1>
            </div>
            <div className='disp_img'>

            </div>
        </div>
    );
};
export default Locations;