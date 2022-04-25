const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NotAccessError = require('../errors/not-access-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    password,
    email,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь уже существует');
      }
      return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({
      name, password: hash, email,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы неверные данные'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAccessError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAccessError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.send({ token });
        });
    })
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

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы неверные данные'));
      }
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неверные данные'));
      } else {
        next(err);
      }
    });
};
