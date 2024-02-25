import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageTest from '../assets/images/imageTest.jpeg';

function ImageComponent() {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    // Fetch image data from an API or server
    const fetchImageData = async () => {
      try {
        const response = await axios.get('https://images.ctfassets.net');
        setImageData(response.data); // Assuming response.data is a Base64-encoded string
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div>
      {imageData ? (
        <img src={`data:image/jpeg;base64,${imageData}`} alt="Image" />
      ) : (
<img className='event-item-image' src={imageTest} alt="this is the backup" />
      )}
    </div>
  );
}

export default ImageComponent;
