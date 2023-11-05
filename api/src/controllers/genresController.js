const axios = require("axios");
const { Genres } = require("../db");

const getGenres = async () => {
  let genres = await Genres.findAll();

  if (genres.length === 0) {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=d52c00ed98f44c93afcd1c7a8373931c`
    );

    const apiGenres = response.data.results;

    //console.log(apiGenres);

    for (const genre of apiGenres) {
      await Genres.findOrCreate({
        where: {
          name: genre.name,
        },
        defaults: {
          name: genre.name,
        },
      });
    }
    // console.log(apiGenres);
  }

  return genres;
};

//getGenres();

module.exports = { getGenres };
