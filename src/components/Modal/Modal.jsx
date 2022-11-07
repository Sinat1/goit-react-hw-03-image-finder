import { createPortal } from 'react-dom';
import { Component } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

    handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }
    
  render() {
    const {imageLink, requestName } = this.props;
    return createPortal(
      <StyledOverlay className="overlay" onClick={this.handleOverlayClick}>
        <StyledModal className="modal">
          <img src={imageLink} alt={requestName} width="100%"/>
        </StyledModal>
      </StyledOverlay>,
      modalRoot
    );
  }
}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  requestName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
}
