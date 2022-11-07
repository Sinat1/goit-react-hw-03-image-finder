import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
import ImageGallery from 'components/ImageGallery';

export default class App extends Component {
  state = {
    requestName: '',
    images: [],
    bigImageLink: '',
    bigImageDescription: '',
  };

  handleFormSubmit = requestName => {
    this.setState({ requestName });
  };

  setBigImageLink = (link, desc) => {
    this.setState({ bigImageLink: link, bigImageDescription: desc });
  };

  resetBigImageLink = () => {
    this.setState({ bigImageLink: '', bigImageDescription: '' });
  };

  updateImages = images => {
    this.setState(prevState => ({ images: [...prevState.images, ...images] }));
    // this.setState(prevState => ({ ...prevState, images }));
  };

  render() {
    const { images, requestName, bigImageLink } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          requestName={requestName}
          galleryImages={images}
          updateImages={this.updateImages}
          clickProp={this.setBigImageLink}
        />
        {bigImageLink.length > 0 && (
          <Modal
            onClose={this.resetBigImageLink}
            requestName={requestName}
            imageLink={bigImageLink}
          />
        )}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
