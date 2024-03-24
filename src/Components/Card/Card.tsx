import React from 'react';
import './Card.css';

const Card = ({ height, width, image }: { height: number, width: number, image: URL }) => {
    return (
        <div className='card' style = {{height: height, width: width}}>
            <div className = 'img-container'>
                <img src = {image.toString()} alt = 'Card Image' />
            </div>
        </div>
    );
};

export default Card;
