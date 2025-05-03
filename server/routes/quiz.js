const router = require('express').Router();
const quizController = require('../controllers/quizController');
const { authenticate } = require('../middleware/auth');

// Get quiz questions for a story
router.get('/story/:storyId', authenticate, quizController.getStoryQuiz);

// Submit quiz answers
router.post('/story/:storyId/submit', authenticate, quizController.submitQuizAnswers);

module.exports = router; 