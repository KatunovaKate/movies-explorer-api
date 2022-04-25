const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const NotAccessError = require('../errors/not-access-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFoundError('Фильм не существует');
    })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не существует');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ data: movie }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы неверные данные'));
      }
      if (err.name === 'ForbiddenError') {
        next(new NotAccessError('Нет доступа'));
      }
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const userId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы неверные данные'));
      }
      if (err.name === 'ReferenceError') {
        next(new NotFoundError('Страница не найдена'));
      }
      next(err);
    });
};
