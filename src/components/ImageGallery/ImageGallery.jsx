// import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
// import * as ImageService from 'api/fetchImages';
import { SlyledImageGallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import Button from 'components/Button';
// import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    // page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.requestName !== this.props.requestName) {
    //   this.setState({ page: 1 });
    // }
    // if (
    //   prevState.page !== this.state.page ||
    //   prevProps.requestName !== this.props.requestName
    // ) {
    //   console.log('fetch data');
    //   this.getImages(this.props.requestName, this.state.page);
    // }
     if (
      prevProps.page !== this.props.page ||
      prevProps.requestName !== this.props.requestName
    ) {
      console.log('fetch data');
    this.props.renderImages(this.props.requestName, this.props.page);
    
    }
  }

  // loadMore = () => {
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }));
  // };

  // getImages = async (requestName, page) => {
  //   try {
  //     this.setState({ isLoading: true });

  //     const { hits } = await ImageService.fetchImages(requestName, page);
  //     //FUNC//
  //     // this.setState(prevState => ({ galleryImages: [...prevState.galleryImages, ...hits] }));
  //     // this.props.updateImages(hits);
  //     if (hits.length > 0) {
  //       this.props.updateImages(hits);
  //       toast.success('Hooray, we found something!');
  //       this.setState({ isLoading: false });
  //     } else {
  //       this.setState({ isLoading: false });
  //       toast.error('Something went wrong');
  //     }
  //   } catch (error) {
  //     toast.error(`${error.message}`);
  //   }
  // };

  clickHandlerFunction = (link, desc) => {
    this.props.clickProp(link, desc);
  };

  render() {
    const { galleryImages } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        <SlyledImageGallery>
          {galleryImages.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              preview={image.webformatURL}
              clickHandler={() =>
                this.clickHandlerFunction(image.largeImageURL, image.tags)
              }
              tags={image.tags}
            />
          ))}
        </SlyledImageGallery>
        {galleryImages.length > 0 && galleryImages.length >= 12 ? (
          <Button onClick={this.loadMore} />
        ) : (
          ''
        )}
      </>
    );
  }
}

// ImageGallery.propTypes = {
//   requestName: PropTypes.string.isRequired,
//   galleryImages: PropTypes.array.isRequired,
//   updateImages: PropTypes.func.isRequired,
//   clickProp: PropTypes.func.isRequired,
// };
