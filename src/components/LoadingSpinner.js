import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      <span>Carregando dados...</span>
    </div>
  );
}

export default LoadingSpinner;
