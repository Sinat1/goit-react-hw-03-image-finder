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
    showModal: false,
  };

  handleFormSubmit = requestName => {
    this.setState({ requestName });
  }
  
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          requestName={this.state.requestName}
          galleryImages={this.state.images}
        />
        {showModal && <Modal onClose={this.toggleModal} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
