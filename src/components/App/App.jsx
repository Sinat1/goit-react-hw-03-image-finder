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
    isLoading: false,
    loadAllPages: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.requestName !== this.state.requestName
    ) {
      this.getImages(this.state.requestName, this.state.page);
    }
  }

  handleFormSubmit = requestName => {
    if (requestName !== this.state.requestName) {
      this.setState({
        requestName,
        images: [],
        page: 1,
        loadAllPages: false,
      });
    }
  };

  getImages = async (requestName, page) => {
    try {
      this.setState({ isLoading: true });
      const { hits } = await ImageService.fetchImages(requestName, page);
      if (hits.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          loadAllPages: true,
        }));
        toast.success('Hooray, we found something!');
        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: false });
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setBigImageLink = (link, desc) => {
    this.setState({ bigImageLink: link, bigImageDescription: desc });
  };

  resetBigImageLink = () => {
    this.setState({ bigImageLink: '', bigImageDescription: '' });
  };

  render() {
    const { images, requestName, bigImageLink, page, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} page={page} />
        <ImageGallery
          galleryImages={images}
          onLoadMore={this.loadMore}
          isLoading={isLoading}
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
