import { downloadImage } from 'app/services/rest';
import React, { useState, useEffect } from 'react';
import Buffer from 'buffer';

function ImageComponent({ id, queryParams }) {
    let [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await downloadImage(id, queryParams);
                // console.log(response);
                // const binaryString = Buffer.toString(response, 'base64');
                // const arrayBuffer = new ArrayBuffer(binaryString.length);
                // const bytes = new Uint8Array(arrayBuffer);
                // for (let i = 0; i < binaryString.length; i++) {
                //     bytes[i] = binaryString.charCodeAt(i);
                // }
                // const blob = new Blob([bytes], { type: 'image/jpeg' })
                // const imageURL = URL.createObjectURL(blob);
                // console.log(imageURL)
                // setImageUrl(imageURL);
                const img = response.data;
                const encoder = new TextEncoder();
                const utf8Bytes = encoder.encode(img);
                // Convert bytes to base64
                const base64String = window.btoa(String.fromCharCode.apply(null, utf8Bytes));
                // Construct the data URL
                const imageDataUrl = `data:image/jpeg;base64,${base64String}`;
                console.log("URL ===> ", imageDataUrl);
                setImageUrl(imageDataUrl)
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchImage();
    }, [id, queryParams]);

    return (
        <div>
            {imageUrl && (
                <img src={imageUrl} alt="VehicleImage"  ></img>
            )}
        </div>
    );
}

export default ImageComponent;
