import React, {useState, ChangeEvent, FormEvent} from 'react';
import fireConfig from './firebase_config.json'
import firebase from 'firebase/app';
import 'firebase/firestore';

interface FormData {
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

const UploadMenu = () => {
    const [formData, setFormData] = useState<FormData>({
        locationName: '',
        photo: null,
        lat: 49.2787246,
        lon: -122.9181736,
        season: Seasons.Spring,
        time: Times.Morning
    })

    firebase.initializeApp(fireConfig);

    // const db = firebase.firestore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        // try {
        //     const response = await fetch('api-endpoint', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });
        //     if (response.ok) {
        //         console.log(response.ok);
        //     } else {
        //         console.error('Failure!');
        //     }
        // } catch (error) {
        //     console.error('Error:', error); 
        // }
        return
    };

    //not taking into consideration for the file upload
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        
        const {name, value} = e.target;

        if(e.target.name === 'fileUpload'){
            const ev = e as ChangeEvent<HTMLInputElement>;
            if(ev.target.files){
                setFormData({...formData, [name]:ev.target.files[0]});
            }
        } else {
            setFormData({...formData, [name]:e.target.value})
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Location:
                <input
                    type="text"
                    name="locationName"
                    value={formData.locationName}
                    onChange={handleChange}
                    required
                />
            </label>
            <br/>
            <div id="fileUpload">
                <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    accept=".jpg, .jpeg, .png"
                    required
                />
            </div>
            <br/>
            <label>
                Lat:
                <input
                    type="number"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    required
                />
            </label>
            <br/>
            <label>
                Long:
                <input
                    type="number"
                    name="lon"
                    value={formData.lon}
                    onChange={handleChange}
                    required
                />
            </label>
            <br/>
            <label>
                Season:
            </label>
            <select id="seasonSelect" name="season" value={formData.season} onChange={handleChange}>
                <option value={Seasons.Spring}>{Seasons.Spring}</option>
                <option value={Seasons.Summer}>{Seasons.Summer}</option>
                <option value={Seasons.Autumn}>{Seasons.Autumn}</option>
                <option value={Seasons.Winter}>{Seasons.Winter}</option>
            </select>
            <br/>
            <label>
                Time:
            </label>
            <select id="timeSelect" name="time" value={formData.time} onChange={handleChange}>
                <option value={Times.Morning}>{Times.Morning}</option>
                <option value={Times.Noon}>{Times.Noon}</option>
                <option value={Times.Evening}>{Times.Evening}</option>
                <option value={Times.Night}>{Times.Night}</option>
            </select>
            <br />
            <button type="submit">Submit</button>
        </form>
    )
};
export default UploadMenu;