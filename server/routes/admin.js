const router = require('express').Router();
const { Story, Message, User, Settings } = require('../models');
const { authenticate, isAdmin } = require('../middleware/auth');
const { Op } = require('sequelize');

// Get all users (admin only)
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'xp', 'isPremium', 'createdAt']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user (admin only)
router.patch('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all stories with stats (admin only)
router.get('/stories', authenticate, isAdmin, async (req, res) => {
  try {
    const stories = await Story.findAll({
      include: [
        {
          model: Message,
          attributes: ['id']
        }
      ],
      attributes: [
        'id',
        'title',
        'description',
        'level',
        'imageUrl',
        'isPremium',
        'createdAt'
      ]
    });

    const storiesWithStats = stories.map(story => ({
      ...story.toJSON(),
      messageCount: story.Messages.length,
      totalXp: story.Messages.reduce((sum, msg) => sum + (msg.xpValue || 0), 0)
    }));

    res.json(storiesWithStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new story (admin only)
router.post('/stories', authenticate, isAdmin, async (req, res) => {
  try {
    const { messages, ...storyData } = req.body;
    const story = await Story.create(storyData);

    if (messages && messages.length > 0) {
      await Message.bulkCreate(
        messages.map(msg => ({
          ...msg,
          storyId: story.id
        }))
      );
    }

    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a story (admin only)
router.put('/stories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { messages, ...storyData } = req.body;
    const story = await Story.findByPk(req.params.id);
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    await story.update(storyData);

    if (messages) {
      // Delete existing messages
      await Message.destroy({ where: { storyId: story.id } });
      
      // Create new messages
      await Message.bulkCreate(
        messages.map(msg => ({
          ...msg,
          storyId: story.id
        }))
      );
    }

    res.json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a story (admin only)
router.delete('/stories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    await story.destroy();
    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get settings (admin only)
router.get('/settings', authenticate, isAdmin, async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || {
      premiumPrice: 9.99,
      xpThresholds: {
        beginner: 0,
        intermediate: 1000,
        advanced: 5000
      },
      dailyXpGoal: 100,
      maxStoriesPerDay: 5
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings (admin only)
router.put('/settings', authenticate, isAdmin, async (req, res) => {
  try {
    const [settings] = await Settings.upsert(req.body);
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 