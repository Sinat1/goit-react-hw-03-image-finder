const ImageGalleryItem = ({id, webformatURL}) => {
<li key={id}>
  <img src={webformatURL} alt="request" />
</li>
}



export default ImageGalleryItem;