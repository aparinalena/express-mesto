const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  getUserData,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const {
  avatarValidation,
  userDataValidation,
  userIdValidation,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserData);
usersRouter.get('/:_id', userIdValidation, getUser);
usersRouter.patch('/me', userDataValidation, updateUser);
usersRouter.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = usersRouter;
