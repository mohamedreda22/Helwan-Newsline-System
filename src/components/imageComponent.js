/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageTest from '../assets/images/imageTest.jpeg';

function ImageComponent() {
  const [imageData, setImageData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch image data from an API or server
    const fetchImageData = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/');
        setImageData(response.data); // Assuming response.data is a Base64-encoded string
      } catch (error) {
        console.error('Error fetching image data:', error);
        setError('Error fetching image data. Please try again later.');
      }
    };

    fetchImageData();
  }, []);

  return (
    <div>
      {error ? (
        <img className='event-item-image' src={imageTest} alt="Backup Image" />
      ) : (
        <img src={`data:image/jpeg;base64,${imageData}`} alt="Dynamic Image" />
      )}
    </div>
  );
}

export default ImageComponent;
 */