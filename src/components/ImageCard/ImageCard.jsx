import css from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={css.gallery_item} onClick={() => onClick(image.urls.regular)}>
      <img src={image.urls.small} alt={image.alt_description} />
      <ul className={css.img_description}>
        <li className={css.description_item}>
          Name:&nbsp;<span className={css.description_span}> {image.user.name}</span>
        </li>
        <li className={css.description_item}>
          Location:&nbsp;<span className={css.description_span}> {image.user.location}</span>
        </li>
        <li className={css.description_item}>
          Likes:&nbsp;<span className={css.description_span}> {image.user.total_likes}</span>
        </li>
      </ul>
    </div>
  );
};

export default ImageCard;
