const router = require('express').Router();

const {
  getMovies,
  delMoviesById,
  createMovies,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { validationCreateMovies } = require('../middlewares/validation');

router.get('/', auth, getMovies);
router.delete('/:cardId', auth, delMoviesById);
router.post('/', auth, validationCreateMovies, createMovies);

module.exports = router;
