import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  return (
    <Modal
      className={css.modal}
      contentLabel="Image Modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={css.modalOverlay}
    >
      <img src={imageUrl} alt="Full-size" />
    </Modal>
  );
};

export default ImageModal;
