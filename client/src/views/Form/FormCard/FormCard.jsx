import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPlatforms,
  getGenres,
  submitVideogame,
  getVideogames,
} from "../../../redux/actions";
import validation from "../validation";
import styles from "./FormCard.module.css";

const FormCard = () => {
  const allPlatforms = useSelector((state) => state.platforms);
  const allGenres = useSelector((state) => state.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlatforms());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [userData, setUserData] = useState({
    name: "",
    description: "",
    released: null,
    rating: 0,
    image: null,
    platforms: [],
    genres: [],
  });

  const [selectedPlatform, setSelectedPlatform] = useState("");

  const [selectedGenre, setselectedGenre] = useState("");

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const handleChange = (event) => {
    const { name, value } = event.target;

    const error = validation[name] ? validation[name](value) : null;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    switch (name) {
      case "platform":
        const selectedPlatform = value;

        if (
          !selectedPlatform ||
          userData.platforms.some((p) => p === selectedPlatform)
        ) {
          return;
        }

        setUserData((prevUserData) => ({
          ...prevUserData,
          platforms: [...prevUserData.platforms, selectedPlatform],
        }));

        setSelectedPlatform("");
        setErrors((prevErrors) => ({
          ...prevErrors,
          platforms: null, // Establece el error en null después de agregar una plataforma
        }));
        break;
      //----------------------------------------------------------------------------------------------
      case "genre":
        const selectedGenre = value;
        const selectedGenreObj = allGenres.find(
          (g) => g.name === selectedGenre
        );

        if (
          !selectedGenreObj ||
          userData.genres.some((g) => g.id === selectedGenreObj.id)
        ) {
          return;
        }
        setUserData((prevUserData) => ({
          ...prevUserData,
          genres: [...prevUserData.genres, selectedGenreObj],
        }));

        setselectedGenre("");
        setErrors((prevErrors) => ({
          ...prevErrors,
          genres: null, // Establece el error en null después de agregar un género
        }));
        break;
      //----------------------------------------------------------------------------------------------

      default:
        setUserData({
          ...userData,
          [name]: value,
        });
    }
  };

  const handleDelete = (index, type) => {
    const updatedUserData = { ...userData };

    switch (type) {
      case "platform":
        const updatedPlatforms = [...updatedUserData.platforms];
        updatedPlatforms.splice(index, 1);
        updatedUserData.platforms = updatedPlatforms;

        // Validar solo las plataformas
        const platformError = validation.platforms(updatedUserData.platforms);

        setErrors((prevErrors) => ({
          ...prevErrors,
          platforms: platformError,
        }));
        break;
      case "genre":
        const updatedGenres = [...updatedUserData.genres];
        updatedGenres.splice(index, 1);
        updatedUserData.genres = updatedGenres;

        // Validar solo los géneros
        const genreError = validation.genres(updatedUserData.genres);

        setErrors((prevErrors) => ({
          ...prevErrors,
          genres: genreError,
        }));
        break;
      default:
        break;
    }

    setUserData(updatedUserData);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(submitVideogame(userData));
      if (response) {
        setSuccessMessage("Success: Game created successfully!");
        setErrorMessage("");
        dispatch(getVideogames()); // Actualiza la lista de videojuegos si es necesario
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSuccessMessage("");
      setErrorMessage("Error: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Video Game</h2>
      <p className={styles.requiredFields}>
        <span className={styles.redAsterisk}>(*)</span> Fields marked with an
        asterisk are required.
      </p>
      <form onSubmit={(event) => submitHandler(event)}>
        <div>
          <label className={styles.label}>
            Name <span className={styles.redAsterisk}>(*)</span>:{" "}
          </label>
          <input
            type="text"
            value={userData.name}
            name="name"
            onChange={handleChange}
            placeholder="Enter the name.."
            className={styles.input}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div>
          <label className={styles.label}>Description: </label>
          <input
            type="text"
            value={userData.description}
            name="description"
            onChange={handleChange}
            placeholder="Enter the description.."
            className={styles.input}
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>
        <div>
          <label className={styles.label}>
            Released <span className={styles.redAsterisk}>(*)</span>:{" "}
          </label>
          <input
            type="date"
            value={userData.released}
            name="released"
            onChange={handleChange}
            className={styles.input}
          />
          {errors.released && (
            <div className={styles.error}>{errors.released}</div>
          )}
        </div>
        <div>
          <label className={styles.label}>
            Rating <span className={styles.redAsterisk}>(*)</span>:{" "}
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={userData.rating}
            name="rating"
            onChange={handleChange}
            placeholder="rating.."
            className={styles.input}
          />
          {errors.rating && <div className={styles.error}>{errors.rating}</div>}
        </div>
        <div>
          <label className={styles.label}>
            Image <span className={styles.redAsterisk}>(*)</span>:{" "}
          </label>
          <input
            type="text"
            value={userData.image}
            name="image"
            onChange={handleChange}
            placeholder="Enter a link image.."
            className={styles.input}
          />
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </div>
        <label className={styles.label}>
          Platforms <span className={styles.redAsterisk}>(*)</span>:{" "}
        </label>
        <select
          name="platform"
          onChange={handleChange}
          value={selectedPlatform}
          className={styles.input}
        >
          <option value="">Select platforms</option>
          {allPlatforms.map((p) => {
            return <option value={p}>{p}</option>;
          })}
        </select>
        {errors.platforms && (
          <div className={styles.error}>{errors.platforms}</div>
        )}
        <label className={styles.label}>Platforms selected:</label>
        <div>
          <ul>
            {userData.platforms.map((p, index) => (
              <li>
                {p}
                <button
                  onClick={() => handleDelete(index, "platform")}
                  className={styles.deleteButton}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <label className={styles.label}>
          Genres <span className={styles.redAsterisk}>(*)</span>:{" "}
        </label>
        <select
          name="genre"
          onChange={handleChange}
          value={selectedGenre}
          className={styles.input}
        >
          <option value="">Select genres</option>
          {allGenres.map((g) => {
            return (
              <option value={g.name} key={g.id}>
                {g.name}
              </option>
            );
          })}
        </select>
        {errors.genres && <div className={styles.error}>{errors.genres}</div>}
        <label className={styles.label}>Genres Selected:</label>
        <div>
          <ul>
            {userData.genres.map((g, index) => (
              <li key={g.id}>
                {g.name}
                <button
                  onClick={() => handleDelete(index, "genre")}
                  className={styles.deleteButton}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <Link to="/home">
          <button className={`${styles.button} ${styles.back}`}>Back</button>
        </Link>
        <button type="submit" className={`${styles.button} ${styles.create}`}>
          CREATE VIDEOGAME
        </button>
        {successMessage && (
          <div className={styles.success}>{successMessage}</div>
        )}
        {errorMessage && <div className={styles.errorMsj}>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default FormCard;
