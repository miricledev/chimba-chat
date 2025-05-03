const router = require('express').Router();
const { User } = require('../models');
const { authenticate } = require('../middleware/auth');

// Get leaderboard
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'xp', 'isPremium'],
      order: [['xp', 'DESC']],
      limit: 100
    });

    // Add rank to each user
    const leaderboard = users.map((user, index) => ({
      ...user.toJSON(),
      rank: index + 1
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's rank
router.get('/my-rank', authenticate, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'xp'],
      order: [['xp', 'DESC']]
    });

    const userRank = users.findIndex(user => user.id === req.user.id) + 1;
    const totalUsers = users.length;

    res.json({
      rank: userRank,
      totalUsers,
      percentile: Math.round((userRank / totalUsers) * 100)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 