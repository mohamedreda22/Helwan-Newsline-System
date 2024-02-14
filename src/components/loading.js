import React from 'react';
import '../styles/loading.css'; 

function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
