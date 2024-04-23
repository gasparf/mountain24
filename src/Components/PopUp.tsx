import React, { useState, ChangeEvent, FormEvent } from 'react';
import SubmitButton from './Buttons/SubmitButton';
import CancelButton from './Buttons/CancelButton';
import './PopUp.css';

// implement upload feature using functinos from firebase manager

export interface FormData {
    direction: string;
    locationName: string;
    photo: File | null;
    lat: number;
    lon: number;
    season: string;
    time: string;
}

enum Seasons {
    Spring = 'Spring',
    Summer = 'Summer',
    Autumn = 'Autumn',
    Winter = 'Winter'
}

enum Times {
    Morning = 'Morning',
    Noon = 'Noon',
    Evening = 'Evening',
    Night = 'Night'
}


const PopUp = () => {

    const [formData, setFormData] = useState<FormData>({
        direction: 'North',
        locationName: '',
        photo: null,
        lat: 49.2787246,
        lon: -122.9181736,
        season: Seasons.Spring,
        time: Times.Morning
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // dataSubmission(formData);
    };

    //not taking into consideration for the file upload
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        
        const {name, value} = e.target;
        setFormData({...formData, [name]:e.target.value})
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files){
            return
        }
        const name = e.target.name
        setFormData({...formData, [name]:e.target.files[0]});
    }
    return(
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