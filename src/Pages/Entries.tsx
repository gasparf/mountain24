import React from 'react';
import './Entries.css'
import UploadMenu from '../firebase/UploadMenu';

const Entries = () => {
    return (
        <div className='main-def'>
            <div className='form-container'>
                <UploadMenu />
            </div>
        </div>
    );
};

export default Entries;