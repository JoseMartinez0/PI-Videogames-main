import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import style from "./Home.module.css";
import Paginated from "../../components/Paginated/Paginated";

const Home = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allVideogames]);

  return (
    <div className={style.container}>
      {
        <Paginated
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      }

      <h1 className={style.title}>Videogames</h1>
      <div className={style.cardsContainer}>
        <CardsContainer currentVideogames={currentVideogames} />
      </div>
    </div>
  );
};

export default Home;
