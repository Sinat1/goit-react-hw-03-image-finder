import {
  StyledGalleryItem,
  StyledGalleryItemImage,
} from './ImageGalleryItem.styled';
// import PropTypes from 'prop-types';

const ImageGalleryItem = ({  preview, tags, clickHandler }) => {
  return (
    <StyledGalleryItem  onClick={clickHandler}>
      <StyledGalleryItemImage src={preview} alt={tags} />
    </StyledGalleryItem>
  );
};

// ImageGalleryItem.propTypes = {
//   id: PropTypes.number.isRequired,
//   preview: PropTypes.string.isRequired,
//   clickHandler: PropTypes.func.isRequired,
//   tags: PropTypes.string.isRequired,
// };

export default ImageGalleryItem;
