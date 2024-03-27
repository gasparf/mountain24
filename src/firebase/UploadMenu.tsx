import React, {useState, ChangeEvent, FormEvent} from 'react';
import {dataSubmission, SnapshotInfo} from  "./FirebaseManager";

enum Direction {
    North = 'North',
    NorthEast = 'NorthEast',
    East = 'East',
    SouthEast = 'SouthEast',
    South = 'South',
    SouthWest = 'SouthWest',
    West = 'West',
    NorthWest = 'NorthWest',
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

    const [formData, setFormData] = useState<SnapshotInfo>({
        direction: Direction.North,
        locationName: '',
        photo: null,
        lat: 49.2787246,
        lon: -122.9181736,
        season: Seasons.Spring,
        time: Times.Morning
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dataSubmission(formData);
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
                Direction:
            </label>
            <select id="seasonSelect" name="season" value={formData.season} onChange={handleChange}>
                {
                    Object.keys(Direction).map((dir) => (
                        <option value={Direction[dir as keyof typeof Direction]}>{Direction[dir as keyof typeof Direction]}</option>
                    ))
                }
            </select>
            <br/>
            <label>
                Season:
            </label>
            <select id="seasonSelect" name="season" value={formData.season} onChange={handleChange}>
                {
                    Object.keys(Seasons).map((season) => (
                        <option value={Seasons[season as keyof typeof Seasons]}>{Seasons[season as keyof typeof Seasons]}</option>
                    ))
                }
            </select>
            <br/>
            <label>
                Time:
            </label>
            <select id="timeSelect" name="time" value={formData.time} onChange={handleChange}>
                {
                    Object.keys(Times).map((time) => (
                        <option value={Times[time as keyof typeof Times]}>{Times[time as keyof typeof Times]}</option>
                    ))
                }
            </select>
            <br />
            <button type="submit">Submit</button>
        </form>
        
    )
};
export default UploadMenu;