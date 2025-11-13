import React from 'react';
import '../styles/loadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-indicator-container">
        <div className="loader"></div>
        <p className="loading-text">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;