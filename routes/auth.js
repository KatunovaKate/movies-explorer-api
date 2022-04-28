const router = require('express').Router();
const { authValidation } = require('../middlewares/validation');
const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', authValidation, login);
router.post('/signup', authValidation, createUser);

module.exports = router;
