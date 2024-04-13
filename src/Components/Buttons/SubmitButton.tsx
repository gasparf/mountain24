import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Button.css'




const ViewButton= () => {
    const [uploadImg, setuploadImg] = useState<{time: string}>({
        time: ''
    });

    const [receivedData, setReceivedData] = useState<string>(' ');
    

    return (
    <div>
        <button className="viewButton" > Submit </button>
    </div>
    )
};

export default ViewButton;

