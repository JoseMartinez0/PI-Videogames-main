import axios, { all } from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const ERROR_GETTING_VIDEOGAMES = "ERROR_GETTING_VIDEOGAMES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const ERROR_GETING_PLATFORMS = "ERROR_GETING_PLATFORMS";
export const GET_GENRES = "GET_GENRES";
export const ERROR_GETTING_GENRES = "ERROR_GETTING_GENRES";
export const SUBMIT_VIDEOGAME = "SUBMIT_VIDEOGAME";
export const FILTRO_VIDEOGAMES = "FILTRO_VIDEOGAMES";
export const SELECTED_VIDEOGAME = "SELECTED_VIDEOGAME";
export const ERROR_SELECTED_VIDEOGAME = "ERROR_SELECTED_VIDEOGAME";
export const CLEAR_SELECTION = "CLEAR_SELECTION";

export const getVideogames = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/videogames");

      const videogames = apiData.data;
      dispatch({ type: GET_VIDEOGAMES, payload: videogames });
    } catch (error) {
      dispatch({ type: ERROR_GETTING_VIDEOGAMES, payload: error.message });
    }
  };
};

//--------------------------------------------------------------------------------------------

export const getVideogame = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/videogames/${id}`);
      const videogame = res.data;
      dispatch({ type: SELECTED_VIDEOGAME, payload: videogame });
    } catch (error) {
      dispatch({ type: ERROR_SELECTED_VIDEOGAME, payload: error.message });
    }
  };
};

export const clearVideogameById = () => {
  return {
    type: CLEAR_SELECTION,
  };
};

//--------------------------------------------------------------------------------------------

export const getPlatforms = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        "http://localhost:3001/videogames/platforms"
      );

      const platforms = apiData.data;

      dispatch({ type: GET_PLATFORMS, payload: platforms });
    } catch (error) {
      dispatch({ type: ERROR_GETING_PLATFORMS, payload: error.message });
    }
  };
};

//--------------------------------------------------------------------------------------------

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/genres");

      const genres = apiData.data;

      dispatch({ type: GET_GENRES, payload: genres });
    } catch (error) {
      dispatch({ type: ERROR_GETTING_GENRES, payload: error.message });
    }
  };
};

//--------------------------------------------------------------------------------------------

export function submitVideogame(userData) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames",
        userData
      );
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error(
          "Unable to create the game. Please check the required fields."
        );
      }
    } catch (err) {
      throw new Error(
        "Unable to create the game. Please check the required fields."
      );
    }
  };
}

//--------------------------------------------------------------------------------------------
export const filterVideogames = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );

      const videogames = apiData.data;
      dispatch({ type: GET_VIDEOGAMES, payload: videogames });
    } catch (error) {
      dispatch({ type: ERROR_GETTING_VIDEOGAMES, payload: error.message });
    }
  };
};

//--------------------------------------------------------------------------------------------

export const filtrosVideogames = (filtros, videogames) => {
  const genreSelected = filtros.genre;
  const origin = filtros.origin;
  const order = filtros.order;
  let videogameFiltered = videogames;

  //filtro por genero
  if (genreSelected !== "all") {
    videogameFiltered = videogameFiltered.filter((g) => {
      return g.genres.some((genre) => genre.name === genreSelected);
    });
  }

  //filtro por origen
  if (origin !== "all") {
    if (origin === "api") {
      videogameFiltered = videogameFiltered.filter((g) => {
        return !isNaN(g.id);
      });
    } else if (origin === "database") {
      videogameFiltered = videogameFiltered.filter((g) => {
        return isNaN(g.id);
      });
    }
  }

  //primer ordenamiento, alfabetico
  if (order !== "all") {
    if (order === "az") {
      videogameFiltered = videogameFiltered.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (order === "za") {
      videogameFiltered = videogameFiltered.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    //ordenamiento por rating

    if (order === "descendente") {
      videogameFiltered = videogameFiltered.sort((a, b) => a.rating - b.rating);
    } else if (order === "ascendente") {
      videogameFiltered = videogameFiltered.sort((a, b) => b.rating - a.rating);
    }
  }

  //retorno videogameFiltered cuando pasó por todos los filtrados

  return async function (dispatch) {
    dispatch({ type: FILTRO_VIDEOGAMES, payload: videogameFiltered });
  };
};
