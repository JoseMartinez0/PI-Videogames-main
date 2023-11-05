import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const imageUrl = props.background_image || props.image;
  return (
    <div className={style.card}>
      <img src={imageUrl} alt={props.name} className={style.cardImage} />
      <div className={style.cardInfo}>
        <h2 className={style.cardTitle}>{props.name}</h2>
        <div className={style.cardGenresContainer}>
          <p className={style.cardGenresTitle}>Genres:</p>
          <p className={style.cardGenres}>{props.genres.join(", ")}</p>
        </div>
        <p className={style.cardRating}>Rating: {props.rating}</p>
      </div>

      <Link to={`/detail/${props.id}`} className={style.seeMoreButton}>
        See more
      </Link>
    </div>
  );
};

export default Card;
