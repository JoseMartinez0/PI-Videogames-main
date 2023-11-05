import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getVideogame, clearVideogameById } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogameWithId);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideogame(id));
    return () => {
      dispatch(clearVideogameById());
    };
  }, [dispatch, id]);

  const imageUrl = videogame.background_image || videogame.image;

  console.log(videogame);

  return (
    <div className={styles.container}>
      {videogame && (
        <>
          <div className={styles.left}>
            <img src={imageUrl} alt="" className={styles.image} />
            {videogame.released && <h3>Released: {videogame.released}</h3>}
            {videogame.rating && <h3>Rating: {videogame.rating}</h3>}
            {videogame.platforms && (
              <h3>Platforms: {videogame.platforms?.map((p) => p + ", ")}</h3>
            )}
            {videogame.genres && (
              <h3>
                Genres:{" "}
                {videogame.genres.map((genre) => genre.name).join(" | ")}
              </h3>
            )}
            <Link to="/home">
              <button className={styles.back}>Back</button>
            </Link>
          </div>
          <div className={styles.right}>
            {videogame.name && <h1>{videogame.name}</h1>}
            {videogame.description_raw ? (
              <p>{videogame.description_raw}</p>
            ) : (
              <p>{videogame.description}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
