const axios = require("axios");
const { API_KEY } = process.env;
const { Genres, Videogame } = require("../db");
const { Op } = require("sequelize");

const getAllVideogames = async () => {
  let videogames = [];

  for (let i = 1; i < 6; i++) {
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`
    );
    let api = response.data.results;

    videogames = [...videogames, ...api];
  }

  const filteredResults = videogames.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    rating: game.rating,
    genres: game.genres,
  }));

  const videogamesDb = await Videogame.findAll({
    include: [{ model: Genres }],
  });

  return [...videogamesDb, ...filteredResults];
};

const getVideogames = async (name) => {
  const lowercaseName = name.toLowerCase();

  const apiSearch = await axios.get(
    `https://api.rawg.io/api/games?search=${lowercaseName}&key=${process.env.API_KEY}`
  );
  const apiResults = apiSearch.data.results;

  const filteredResults = apiResults.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    rating: game.rating,
    genres: game.genres,
  }));

  let dbResults = await Videogame.findAll({
    include: [{ model: Genres }],
  });

  dbResults = dbResults.filter((game) =>
    game.name.toLowerCase().includes(name)
  );

  console.log(dbResults);
  const apiDbVideogames = [...dbResults, ...filteredResults].slice(0, 15);

  return apiDbVideogames;
};

//--------------------------------------------------------------------

const getVideogameById = async (id, source) => {
  if (source === "api") {
    let response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`
    );

    const game = response.data;

    return {
      name: game.name,
      description: game.description_raw || game.description,
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres,
    };
  } else {
    let results = await Videogame.findByPk(id, {
      include: [
        {
          model: Genres,
        },
      ],
    });

    return results;
  }
};

//---------------------------------------------------------------------

const getAllPlatforms = async () => {
  let apiPlatforms = await axios.get(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}`
  );

  let apiResults = apiPlatforms.data.results;

  const uniquePlatforms = new Set();

  apiResults.forEach((game) => {
    game.platforms.forEach((platform) => {
      uniquePlatforms.add(platform.platform.name);
    });
  });

  // Convierte el conjunto de plataformas nuevamente a un array
  const uniquePlatformArray = Array.from(uniquePlatforms);

  return uniquePlatformArray;
};

//---------------------------------------------------------------------

const createVideogame = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genres
) => {
  const newVideogame = await Videogame.findOrCreate({
    where: {
      name,
      description,
      platforms,
      image,
      released,
      rating,
    },
  });

  if (genres && genres.length > 0) {
    let genresId = genres.map((g) => g.id);

    newVideogame[0].addGenres(genresId);
  }

  return newVideogame[0];
};

module.exports = {
  getAllVideogames,
  getVideogames,
  getVideogameById,
  getAllPlatforms,
  createVideogame,
};
