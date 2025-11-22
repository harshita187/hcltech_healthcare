const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Protect all routes
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;