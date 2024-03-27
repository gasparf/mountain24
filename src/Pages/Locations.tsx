import React, { useEffect, useState } from 'react';
import './Locations.css';
import CardContainer from '../Components/CardContainer/CardContainer';
import Card from '../Components/Card/Card';
import NavMenu from '../Components/NavMenu';
import UploadMenu from '../firebase/UploadMenu';
import { getCollectionInfo, getImgURL, SnapshotInfo } from '../firebase/FirebaseManager';
import placeHolderImg from '../Assets/placeholder.jpg';

const Locations = () => {

    const [imgURL, setURL] = useState<string | null>(null);
    const [imgs, setImgs] = useState<SnapshotInfo[]>([]);

    useEffect(() => {
        const setStitchImgs = async () => {
            try{
                const data = await getCollectionInfo("Images Theatre Pond");
                setImgs(data)
            } catch (e) {
                console.log(e)
            }
        }

        setStitchImgs();
    }, [])

    const setup = async () => {
        const url = await getImgURL('ASBuilding.jpg');
        setURL(url);
    }

    setup();

    let renderI = 0;

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
                <div id="stitch">
                    {
                        imgs.map((pic) => (
                            <div id="stitch" style={{left: (-25 * renderI).toString() + "%"}}>
                                <img src={pic.photo} className='panoImg' style={{left: (-100 * renderI++).toString() + "%"}}></img>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        
    );
};
export default Locations;