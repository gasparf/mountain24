import React, { useState, FormEvent } from 'react';
import CancelToken from 'axios';
import axios from 'axios';
import './Button.css';




const CancelButton = () => {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };


    return (
        <div>
            <button className='viewButton'> Cancel </button>
        </div>
    );
};

export default CancelButton;