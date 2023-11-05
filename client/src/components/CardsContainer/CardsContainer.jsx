import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = ({ currentVideogames }) => {
  return (
    <div className={style.container}>
      {currentVideogames.length &&
        currentVideogames.map(
          ({
            id,
            name,
            description,
            platform,
            background_image,
            image,
            released,
            rating,
            genres,
          }) => {
            return (
              <Card
                id={id}
                name={name}
                description={description}
                platform={platform}
                background_image={background_image}
                image={image}
                released={released}
                rating={rating}
                genres={genres?.map((genre) => genre.name && genre.name)}
                key={id}
              />
            );
          }
        )}
    </div>
  );
};

export default CardsContainer;
