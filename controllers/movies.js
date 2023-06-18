const Movies = require('../models/movies');
const BadRequestError = require('../errors/badrequest');
const NotFoundError = require('../errors/notfound');
const ForbiddenError = require('../errors/forbidden');

// Вовзращает лайкнуте фильмы, нужно скорей всего передалить
module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: { $in: [req.user._id] } })
    .then((movies) => {
      if (movies.length === 0) {
        res.send({ message: 'У вас нет сохраненных фильмов' });
      } else {
        res.send(movies);
      }
    })
    .catch(next);
};

// удаляет сохранённый фильм по id
module.exports.delMoviesById = (req, res, next) => {
  Movies.findById(req.params.cardId)
    .then((reqMovies) => {
      if (!reqMovies) {
        throw new NotFoundError('Фильм с данным Id не найдена');
      }
      if (reqMovies.owner.toString() === req.user._id) {
        Movies.findByIdAndRemove(req.params.cardId)
          .then((data) => {
            res.send({ data });
          })
          .catch((err) => next(err));
      } else {
        next(new ForbiddenError('Этот фильм сохранили не Вы'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

// создаёт фильм
module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    trailerLink,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    trailerLink,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
