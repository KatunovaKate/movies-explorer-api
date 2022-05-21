const router = require('express').Router();
const { registerValidation, loginValidation } = require('../middlewares/validation');
const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', loginValidation, login);
router.post('/signup', registerValidation, createUser);

module.exports = router;
