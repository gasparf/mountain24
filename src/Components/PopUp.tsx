import React from 'react';
import SubmitButton from './Buttons/SubmitButton';
import CancelButton from './Buttons/CancelButton';

const PopUp = () => {
    return (
        <div className='popup-inner'>
            <div className='img-upload-box'>
                <input type='file'/>
            </div>
            <div className='button-containers'>
                <SubmitButton />
                <CancelButton />
            </div>
        </div>
    );
};

export default PopUp;