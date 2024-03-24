import React from 'react';
import Card from '../Card/Card';

const CardContainer = ({ height, width, images }: { height: number, width: number, images: URL[] }) => {
    return (
        <div className='card-container'>
            <div className = "card-container-inner">
                {images.map((image, index) => {
                    return <Card key={index} height={height} width={width} image={image} />
                })}
            </div>
            
        </div>
    );
}

export default CardContainer;