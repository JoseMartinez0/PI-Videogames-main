import {
  GET_VIDEOGAMES,
  ERROR_GETTING_VIDEOGAMES,
  SELECTED_VIDEOGAME,
  ERROR_SELECTED_VIDEOGAME,
  CLEAR_SELECTION,
  GET_PLATFORMS,
  ERROR_GETING_PLATFORMS,
  GET_GENRES,
  ERROR_GETTING_GENRES,
  SUBMIT_VIDEOGAME,
  FILTRO_VIDEOGAMES,
} from "./actions";

const initialState = {
  videogamesCopy: [],
  videogames: [],
  videogameWithId: {},
  platforms: [],
  genres: [],
  auxiliar: true,
  error: null,
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        videogamesCopy: action.payload,
      };

    case ERROR_GETTING_VIDEOGAMES:
      return { ...state, error: action.payload };

    //-----------------------------------------------------------------------------------------------

    case SELECTED_VIDEOGAME:
      return { ...state, videogameWithId: action.payload };
    case ERROR_SELECTED_VIDEOGAME:
      return { ...state, error: action.payload };

    case CLEAR_SELECTION:
      return { ...state, videogameWithId: {} };

    //-----------------------------------------------------------------------------------------------

    case GET_PLATFORMS:
      return { ...state, platforms: action.payload };

    case ERROR_GETING_PLATFORMS:
      return { ...state, error: action.payload };

    //-----------------------------------------------------------------------------------------------
    case GET_GENRES:
      return { ...state, genres: action.payload };

    case ERROR_GETTING_GENRES:
      return { ...state, error: action.payload };

    //-----------------------------------------------------------------------------------------------

    case SUBMIT_VIDEOGAME:
      return { ...state };

    //---------------------------------------------------------------------------------------------
    case FILTRO_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        auxiliar: !state.auxiliar,
      };

    default:
      return { ...state };

    //-----------------------------------------------------------------------------------------------
  }
};

export default reducer;
