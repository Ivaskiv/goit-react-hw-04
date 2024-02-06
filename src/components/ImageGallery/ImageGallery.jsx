import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.image_gallery}>
      {images.map((image, index) => (
        <li key={index}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
