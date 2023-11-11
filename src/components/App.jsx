import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Grid } from 'react-loader-spinner';
import { fetchImages } from '../fetchimages';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
    isLoading: false,
    hasMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchImages();
    }
  }

  handleSubmit = newQuery => {
    if (newQuery.trim() === '') {
      alert('Can not be empty');
      return;
    }
    this.setState({
      query: newQuery,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    if (!this.state.isLoading && this.state.hasMore) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    }
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

  fetchImages = async () => {
    const { query, page, images } = this.state;
    try {
      this.setState({ isLoading: true });
      const imageData = await fetchImages({
        query,
        page,
      });

      if (imageData !== null) {
        const newImages = [...images, ...imageData.hits];
        const hasMore = page < Math.ceil(imageData.total / 12);

        this.setState({
          images: newImages,
          hasMore: hasMore,
        });
      }
    } catch (error) {
      console.error('Ошибка при получении изображений:', error);
    } finally {
      this.setState({ isLoading: false });
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
        {isLoading && (
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}

        {this.state.hasMore && <Button onClick={this.handleLoadMore} />}
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
