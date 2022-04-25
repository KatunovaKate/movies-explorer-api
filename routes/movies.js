const router = require('express').Router();
const { validateMovieId, validateMovie } = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateMovie, createMovie);
router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;
