import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import '../../index.css';


export const ImageGallery = ({ images, onImageClick, isLoading }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
      {isLoading && <p>Loading...</p>}
    </ul>
  );

};
