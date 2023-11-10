import React from 'react';
import '../../index.css';

export const Modal = ({ largeImageURL, onClose }) => (
  <div className="Overlay" onClick={onClose}>
    <div className="Modal">
      <img src={largeImageURL} alt="Large" />
    </div>
  </div>
);
