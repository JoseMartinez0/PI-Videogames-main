import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, filtrosVideogames } from "../../redux/actions";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const allVideogames = useSelector((state) => state.videogamesCopy);

  const [filtros, setFiltros] = useState({
    genre: "all",
    origin: "all",
    order: "all",
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleChange = (event) => {
    const key = event.target.name;
    switch (key) {
      case "genre":
        const selectedGenre = event.target.value;
        dispatch(
          filtrosVideogames({ ...filtros, genre: selectedGenre }, allVideogames)
        );
        setFiltros({ ...filtros, genre: selectedGenre });
        break;

      case "origin":
        const selectedOrigin = event.target.value;
        dispatch(
          filtrosVideogames(
            { ...filtros, origin: selectedOrigin },
            allVideogames
          )
        );
        setFiltros({ ...filtros, origin: selectedOrigin });
        break;

      case "order":
        const selectedOrder = event.target.value;
        dispatch(
          filtrosVideogames({ ...filtros, order: selectedOrder }, allVideogames)
        );
        setFiltros({ ...filtros, order: selectedOrder });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <select name="genre" onChange={handleChange}>
        <option value="all">By Genres</option>
        {allGenres.map((g) => {
          return (
            <option value={g.name} key={g.id}>
              {g.name}
            </option>
          );
        })}
      </select>
      <select name="origin" onChange={handleChange}>
        <option value="all">By Origin</option>
        <option value="api">API</option>
        <option value="database">Database</option>
      </select>
      <select name="order" onChange={handleChange}>
        <option value="all">Order</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
        <option value="ascendente">Higher Rating</option>
        <option value="descendente">Lower Rating</option>
      </select>
      <SearchBar />
      <div>
        <Link to="/create" className={styles.addGameLink}>
          Add Game
        </Link>
        <br />
      </div>
    </div>
  );
};

export default NavBar;

//select con 3 opociones all base de datos y api. Que tenga la funcion onChange del handleChange y en esta funcion
