const express = require('express');
const { createMovie, getMovie } = require("../controller/movie.controller");
const Route = express.Router();

Route.post("/", createMovie);

Route.get("/", getMovie);





module.exports = Route;

// const { getMovies, getMovie, createMovie, updateMovie, deleteMovie } = require('../controllers/movies.controller');
