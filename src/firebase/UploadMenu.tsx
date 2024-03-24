import React, {useState, ChangeEvent, FormEvent} from 'react';
import firebase from 'firebase/app';
import db, {storage} from  "./FirebaseConfig"
import {doc, setDoc} from 'firebase/firestore';
import store, { UploadResult, ref,uploadBytes } from "firebase/storage";


interface FormData {
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

const UploadMenu = () => {

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
        
        if(!formData.photo){
            return;
        }
        const imgRef = ref(storage, 'images/' + formData.locationName + '.jpg');

        let fileUrl = "";

        try {
            await uploadBytes(imgRef, formData.photo).then((snapshot : UploadResult) => {
                console.log('upload success!');
                fileUrl = snapshot.ref.fullPath
            });
        } catch (e) {
            console.log(e)
        }

        try {

            await setDoc(doc(db, 'Locations', 'testLocation', 'locationEntries', formData.locationName), {
                direction: formData.direction,
                imageReference: fileUrl,
                latitude: formData.lat,
                longitude: formData.lon,
                season: formData.season,
                time: formData.time
            })
            // clean out form data? setFormData('')
            console.log('success!!')
        } catch (error) {
            console.error('Error:', error); 
        }
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
                    onChange={handleFileUpload}
                    accept=".jpg"
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