import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
import ImageGallery from 'components/ImageGallery';
import * as ImageService from 'api/fetchImages';

export default class App extends Component {
  state = {
    requestName: '',
    images: [],
    bigImageLink: '',
    bigImageDescription: '',
    page: 1,
  };

//FORM HANDLER START//
  
  handleFormSubmit = requestName => {
    this.setState({ requestName });
  };

//FORM HANDLER END//

//MODAL HELPER METHODS START// 
  
  setBigImageLink = (link, desc) => {
    this.setState({ bigImageLink: link, bigImageDescription: desc });
  };

  resetBigImageLink = () => {
    this.setState({ bigImageLink: '', bigImageDescription: '' });
  };

//MODAL HELPER METHODS END// 

//FETCH IMAGES START//
  getImages = async (requestName, page) => {
    try {
      const { hits } = await ImageService.fetchImages(requestName, page);
      if (hits.length > 0) {
        this.setState(prevState => ({ images: [...prevState.images, hits] }));
        toast.success('Hooray, we found something!');
      } else {
        // this.setState({ isLoading: false });
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }
  // updateImages = images => {
  //   this.setState(prevState => ({ images: [...prevState.images, ...images] }));
  //   // this.setState(prevState => ({ ...prevState, images }));
  // };

//FETCH IMAGES END//

  render() {
    const { images, requestName, bigImageLink, page } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery
          requestName={requestName}
          galleryImages={images}
          page={page}
          // updateImages={this.updateImages}
          renderImages={this.getImages}
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
