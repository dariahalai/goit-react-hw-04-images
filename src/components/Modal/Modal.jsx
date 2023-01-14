import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

// class Modal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeydownCloseModal);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeydownCloseModal);
//   }

//   handleOverlayCloseModal = e => {
//     const { onClose } = this.props;
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   handleKeydownCloseModal = e => {
//     const { onClose } = this.props;
//     if (e.code === 'Escape') {
//       onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleOverlayCloseModal}>
//         <ModalContainer>{this.props.children}</ModalContainer>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

function Modal({ onClose, children }) {
  
  const handleKeydownCloseModal = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeydownCloseModal);
    return () => {
      window.removeEventListener('keydown', handleKeydownCloseModal);
    };
  }, []);

  const handleOverlayCloseModal = e => {
    if (e.currentTarget === e.target) {
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
      children:PropTypes.any,
    };

export default Modal;
