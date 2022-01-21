const router = require('express').Router();
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
