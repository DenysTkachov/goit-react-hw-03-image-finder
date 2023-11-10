import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '39742873-b30b3450f220389da52a09ee2',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      const requestId = `${Date.now()}/${this.state.query}`;
      this.fetchImages(requestId);
    }
  }

  handleSubmit = newQuery => {
    const requestId = `${Date.now()}/${newQuery}`;
    this.setState(
      {
        query: newQuery,
        page: 1,
        images: [],
      },
      () => this.fetchImages(requestId)
    );
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => this.fetchImages()
    );
  };

  handleImageClick = image => {
    this.setState({
      showModal: true,
      largeImageURL: image.largeImageURL,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  fetchImages = async requestId => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await axios.get('', {
        params: {
          q: query,
          page,
        },
      });

      const newImages = response.data.hits;

      if (
        newImages.every(
          newImage =>
            !this.state.images.some(
              existingImage => existingImage.id === newImage.id
            )
        )
      ) {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
        }));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  render() {
    const { images, showModal, largeImageURL, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={images}
          onImageClick={this.handleImageClick}
          isLoading={isLoading}
        />
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
