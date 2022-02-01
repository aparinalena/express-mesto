const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ConflictError('Необходимо авторизоваться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    throw new AuthError('Необходимо авторизоваться');
  }
  req.user = payload;

  return next();
};
