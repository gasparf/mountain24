import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';



// NOTE: CHANGE THIS TO A SUBMIT BUTTON FOR UPLOADING IMAGE
// TODO: CHANGE THIS & CREATE CANCEL BUTTON
// route to the locations page
interface ViewButtonProps {
    onClick: () => void;
}

const ViewButton: React.FC<ViewButtonProps> = ({onClick}) => {
    return (
    <div>
        <button onClick={onClick} className="viewButton">View Stitch</button>
    </div>
    )
};

export default ViewButton;

