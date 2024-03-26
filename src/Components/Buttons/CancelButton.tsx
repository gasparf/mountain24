import React, { useState } from 'react';
import CancelToken from 'axios';
import axios from 'axios';
import './Button.css';



const CancelButton = () => {

    return (
        <div>
            <button className='viewButton'> Cancel </button>
        </div>
    );
};

export default CancelButton;