const { celebrate, Joi } = require('celebrate');

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validationCreateMovies = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    movieId: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/http(s)?:\/\/(www.)?[a-z0-9.-]+\/[a-z0-9.\-_~:/?#[\]@!$&'()*+,;=]+/),
    trailerLink: Joi.string().required().pattern(/http(s)?:\/\/(www.)?[a-z0-9.-]+\/[a-z0-9.\-_~:/?#[\]@!$&'()*+,;=]+/),
    thumbnail: Joi.string().required().pattern(/http(s)?:\/\/(www.)?[a-z0-9.-]+\/[a-z0-9.\-_~:/?#[\]@!$&'()*+,;=]+/),
  }),
});

module.exports.validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().pattern(/^[a-zA-Z0-9]+$/),
  }),
});
