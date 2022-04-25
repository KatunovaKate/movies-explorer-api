const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const NotAccessError = require('../errors/not-access-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAccessError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new NotAccessError('Необходима авторизация');
  }

  req.user = payload;

  return next();
};
