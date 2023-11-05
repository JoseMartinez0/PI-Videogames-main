const {
  getAllVideogames,
  getVideogames,
  getVideogameById,
  getAllPlatforms,
  createVideogame,
} = require("../controllers/videogamesController");

const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    let videogames = name
      ? await getVideogames(name)
      : await getAllVideogames();

    res.status(200).json(videogames);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      error: "Error al obtener los videojuegos",
    });
  }
};

const getVideogamesByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    let videogame = await getVideogameById(id, source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el detalle del videojuego",
    });
  }
};

const getPlatformsHandler = async (req, res) => {
  try {
    let platforms = await getAllPlatforms();
    res.status(200).json(platforms);
  } catch (error) {
    res.status(500).json({ error: "Error al intentar obtener las platforms" });
  }
};

const postVideogamesHandler = async (req, res) => {
  const { name, description, platforms, image, released, rating, genres } =
    req.body;

  try {
    const newVideogame = await createVideogame(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres
    );
    res.status(201).json(newVideogame);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se pudo crear la actividad turística en la base de datos.",
    });
  }
};

module.exports = {
  getVideogamesHandler,
  getVideogamesByIdHandler,
  getPlatformsHandler,
  postVideogamesHandler,
};
