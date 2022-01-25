const usersRouter = require('express').Router();
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const {
  avatarValidation,
  userDataValidation,
  userIdValidation,
} = require('../middlewares/validation');

usersRouter.post('/', createUser);
usersRouter.get('/:id', userIdValidation, getUser);
usersRouter.get('/', getUsers);
usersRouter.patch('/me', userDataValidation, updateUser);
usersRouter.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = usersRouter;
