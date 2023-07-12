const router = require('express').Router();
const {
  getUsersСurrent, updateProfile,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationUpdateProfile } = require('../middlewares/validation');

router.get('/me', auth, getUsersСurrent);
router.patch('/me', auth, validationUpdateProfile, updateProfile);

module.exports = router;
