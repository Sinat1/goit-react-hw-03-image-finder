import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import * as ImageService from 'api/fetchImages';

export default class ImageGallery extends Component {
    state = {
        page: 1,
        // imageRequest: null,
        // error: null,
        //   status: 'idle',
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.requestName !== this.state.requestName) {
            this.fetchImages(this.state.requestName, this.state.page);
        };
    };

    getImages = async (requestName, page) => {
        const { photos } = await ImageService.fetchImages(requestName, page);
        this.setState(prevState => ({ galleryImages: [...prevState.galleryImages, ...photos] }));
    }
        
    // if (prevProps.requestName !== this.props.requestName) {
    //   this.setState({ status: 'pending' });
    //   fetch(
    //     `https://pixabay.com/api/?q=${this.props.requestName}&page=1&key=31096187-0d9572226d1d5a0a27ca69533&image_type=photo&orientation=horizontal&per_page=12`
    //   )
    //     .then(response => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //       return Promise.reject(
    //         new Error(`wrong request ${this.props.requestName}`)
    //       );
    //     })
    //     .then(imageRequest =>
    //       this.setState({ imageRequest, status: 'resolved' })
    //     )
    //     .catch(error => this.setState({ error, status: 'rejected' }));
    // }
  

    render() {
      

        //   const { imageRequest, error, status } = this.state;
        const { galleryImages } = this.props;
        // if (status === 'idle') {
        //   return <div>Type request</div>;
        // }

        // if (status === 'pending') {
        //   return <div>Loading images...</div>;
        // }

        // if (status === 'rejected') {
        //   return <h1>{error.message}</h1>;
        // }

        // if (status === 'resolved') {
        return (
            <ul>
                {galleryImages.map(image => (
                    <ImageGalleryItem
                        key={image.id}
                        id={image.id}
                        preview={image.webformatURL}
                        detailedView={image.largeImageURL}
                    />
                ))}
              
            </ul>
        );
        // }
    };
};
