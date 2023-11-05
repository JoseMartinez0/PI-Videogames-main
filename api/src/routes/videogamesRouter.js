const { Router } = require("express");
const {
  getVideogamesHandler,
  getVideogamesByIdHandler,
  getPlatformsHandler,
  postVideogamesHandler,
} = require("../handlers/videogamesHandler");

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler);

videogamesRouter.get("/platforms", getPlatformsHandler);

videogamesRouter.get("/:id", getVideogamesByIdHandler);

videogamesRouter.post("/", postVideogamesHandler);

module.exports = videogamesRouter;
