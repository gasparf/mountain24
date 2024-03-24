import React, { useEffect, useState } from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { createCanvas, loadImage } from 'canvas';
import radish from './radishes.jpg';

export default function Stitching() {
    const imgUrl = radish;
    const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
    const images: Image[] = [];
    const test_urls = [imgUrl, imgUrl, imgUrl];

    const getImages = async (): Promise<void>  => {
        // get from firebase? 
        
        for(const url of test_urls){
            
        }
    }

    useEffect(() => {
        const processImage = async (imgUrl: string): Promise<string> => {
            var stitched_image = new Image();

            // create canvas
            const canvas = createCanvas();

            // draw image
            const ctx = canvas.getContext('2d');


            const totalWidth = images.reduce((acc, img) => acc + img.width, 0);
            const totalHeight = Math.max(...images.map(img => img.height));
            canvas.width = totalWidth;
            canvas.height = totalHeight;
            let x = 0;
            for(const img of images){
                ctx.drawImage(img, x, 0);
                x += img.width;
            }
           
            return canvas.toDataURL();
        };

        processImage(imgUrl)
            .then((dataUrl) => { setImageDataUrl(dataUrl); })
            .catch((error) => { console.error('Error processing image:', error); });
    }, [imgUrl]);

    return (
        <div className="flex">
            <img src={imageDataUrl?? undefined} alt="img" />
        </div>
    );
}


// Manipulate the image data 
// const imageData = ctx.getImageData(0, 0, stitched_image.width, stitched_image.height);

// const data = imageData.data;
// // invert colors
// for (let i = 0; i < data.length; i += 4) {
//     data[i] = 255 - data[i]; // Red
//     data[i + 1] = 255 - data[i + 1]; // Green
//     data[i + 2] = 255 - data[i + 2]; // Blue
// }

// Put the manipulated image data back onto the canvas
// ctx.putImageData(imageData, 0, 0);