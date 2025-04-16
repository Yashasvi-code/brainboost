const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const QuizAttempt = require('../models/QuizAttempt');

// Save quiz results
router.post('/', auth, async (req, res) => {
  try {
    const { score, totalQuestions, recommendations } = req.body;
    
    const newAttempt = new QuizAttempt({
      user: req.user,
      score,
      totalQuestions,
      recommendations
    });

    await newAttempt.save();
    
    // Update user's progress
    await User.findByIdAndUpdate(req.user, {
      $inc: { experience: score * 10 }
    });

    res.json(newAttempt);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user's quiz history
router.get('/', auth, async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user });
    res.json(attempts);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;