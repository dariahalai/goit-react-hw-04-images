import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  
  useEffect(() => {
    const handleKeydownCloseModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydownCloseModal);
    return () => {
      window.removeEventListener('keydown', handleKeydownCloseModal);
    };
  }, [onClose]);

  const handleOverlayCloseModal = e => {
    if (e.currentTarget === e.target) {
      console.log('yay')
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayCloseModal}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Modal;
