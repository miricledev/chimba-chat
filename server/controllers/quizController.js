const { Story, Message, UserProgress } = require('../models');
const { QUIZ_TYPES, XP_REWARDS } = require('../config');

// Get quiz questions for a story
exports.getStoryQuiz = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    
    // Get all messages with quizzes for the story
    const messages = await Message.findAll({
      where: {
        storyId,
        quizType: {
          [Op.ne]: 'none'
        }
      },
      order: [['order', 'ASC']]
    });

    // Format questions for the quiz
    const questions = messages.map(message => ({
      type: message.quizType,
      question: message.quizQuestion,
      options: message.options,
      correctAnswer: message.correctOption
    }));

    res.json(questions);
  } catch (error) {
    next(error);
  }
};

// Submit quiz answers
exports.submitQuizAnswers = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const { answers } = req.body;
    
    // Get all quiz messages for the story
    const messages = await Message.findAll({
      where: {
        storyId,
        quizType: {
          [Op.ne]: 'none'
        }
      },
      order: [['order', 'ASC']]
    });

    // Calculate score and XP
    let score = 0;
    let totalQuestions = messages.length;
    let xpEarned = 0;

    answers.forEach((answer, index) => {
      const message = messages[index];
      const isCorrect = answer === message.correctOption;
      
      if (isCorrect) {
        score++;
        xpEarned += message.xpValue || XP_REWARDS.quiz;
      }
    });

    // Update user progress
    const [userProgress] = await UserProgress.findOrCreate({
      where: {
        userId: req.user.id,
        storyId
      },
      defaults: {
        lastMessageIndex: 0,
        completed: false,
        xpEarned: 0,
        correctAnswers: 0,
        totalQuestions: 0
      }
    });

    // Update progress
    userProgress.correctAnswers = score;
    userProgress.totalQuestions = totalQuestions;
    userProgress.xpEarned += xpEarned;
    await userProgress.save();

    // Update user XP
    if (xpEarned > 0) {
      await req.user.increment('xp', { by: xpEarned });
    }

    res.json({
      score,
      totalQuestions,
      xpEarned
    });
  } catch (error) {
    next(error);
  }
}; 