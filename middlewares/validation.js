const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const authValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.email');
      }
      return value;
    })
      .messages({
        'any.required': 'Е-майл обязателен',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль обязателен',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя не должно быть меньше 2ух символов',
        'string.max': 'Имя не должно быть больше 30ти символов',
      }),
  }),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.email');
      }
      return value;
    })
      .messages({
        'any.required': 'Е-майл обязателен',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя не должно быть меньше 2ух символов',
        'string.max': 'Имя не должно быть больше 30ти символов',
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Это поле обязательно',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Это поле обязательно',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Это поле обязательно',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Это поле обязательно',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Это поле обязательно',
      }),
    image: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.uri');
      }
      return value;
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.uri');
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.uri');
      }
      return value;
    }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Название обязательно',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Название обязательно',
      }),
  }),
});

module.exports = {
  authValidation,
  validateUpdateUserInfo,
  validateMovieId,
  validateMovie,
};
