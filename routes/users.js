const router = require('express').Router();
const { validateUpdateUserInfo } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
