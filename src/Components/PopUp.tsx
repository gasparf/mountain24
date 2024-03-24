import React from 'react';
import SubmitButton from './Buttons/SubmitButton';
import CancelButton from './Buttons/CancelButton';
import './PopUp.css';


const PopUp = () => {
    return (
        <div className='popup-inner'>
            <div className='img-upload-box'>
                <input type='file' id='file' />
            </div>
            <div className='button-containers'>
                    <CancelButton />
                    <SubmitButton />
            </div>
        </div>
    );
};

export default PopUp;