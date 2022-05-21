const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.email');
      }
      return value;
    })
      .messages({
        'any.required': 'Е-майл обязателен',
        'string.empty': 'Е-майл обязателен',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль обязателен',
        'string.empty': 'Пароль обязателен',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Имя обязательно',
        'string.empty': 'Имя обязательно',
        'string.min': 'Имя не должно быть меньше 2ух символов',
        'string.max': 'Имя не должно быть больше 30ти символов',
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.email');
      }
      return value;
    })
      .messages({
        'any.required': 'Е-майл обязателен',
        'string.empty': 'Е-майл обязателен',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль обязателен',
        'string.empty': 'Пароль обязателен',
      }),
    name: Joi.string(),
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
        'string.empty': 'Е-майл обязателен',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Имя обязательно',
        'string.empty': 'Имя обязательно',
        'string.min': 'Имя не должно быть меньше 2ух символов',
        'string.max': 'Имя не должно быть больше 30ти символов',
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24)
      .messages({
        'string.length': 'id должен быть равен 24 знакам',
      }),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required()
      .messages({
        'any.required': 'movieId обязателен',
        'string.empty': 'movieId обязателен',
      }),
    country: Joi.string().required()
      .messages({
        'any.required': 'Страна обязательна',
        'string.empty': 'Страна обязательна',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Режиссер обязателен',
        'string.empty': 'Режиссер обязателен',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Длина обязательна',
        'string.empty': 'Длина обязательна',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Год обязателен',
        'string.empty': 'Год обязателен',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Описание обязательно',
        'string.empty': 'Описание обязательно',
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
        'string.empty': 'Название обязательно',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Название обязательно',
        'string.empty': 'Название обязательно',
      }),
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
  validateUpdateUserInfo,
  validateMovieId,
  validateMovie,
};
