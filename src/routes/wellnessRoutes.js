const express = require('express');
const router = express.Router();
const { 
  getDashboard, 
  updateMetric, 
  addGoal, 
  toggleGoal, 
  deleteGoal 
} = require('../controllers/wellnessController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

// Dashboard & Metrics
router.get('/', getDashboard);
router.patch('/metric/:metric', updateMetric); // Changed to /metric/:metric to avoid collision

// Custom Goals Routes
router.post('/goals', addGoal);
router.patch('/goals/:id', toggleGoal);
router.delete('/goals/:id', deleteGoal);

module.exports = router;