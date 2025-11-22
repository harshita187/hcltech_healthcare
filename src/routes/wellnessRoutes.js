const express = require('express');
const router = express.Router();
const { getDashboard, updateMetric } = require('../controllers/wellnessController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // Protect all routes

router.get('/', getDashboard);
// Route to update specific widgets (e.g., PATCH /api/wellness/steps)
router.patch('/:metric', updateMetric);

module.exports = router;