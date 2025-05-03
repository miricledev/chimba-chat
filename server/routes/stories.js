const router = require('express').Router();
const { Story, Message, UserProgress } = require('../models');
const { authenticate } = require('../middleware/auth');

// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all user progress for stories
router.get('/progress', authenticate, async (req, res) => {
  try {
    const progress = await UserProgress.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Story,
        as: 'story',
        attributes: ['id', 'title', 'level']
      }]
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single story with its messages
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching story with ID:', req.params.id);
    console.log('Story model:', Story);
    console.log('Message model:', Message);
    
    const story = await Story.findOne({
      where: { id: req.params.id },
      include: [{
        model: Message,
        as: 'messages',
        attributes: ['id', 'text', 'translations', 'order', 'quizType', 'quizQuestion', 'quizAnswer', 'xpValue'],
        order: [['order', 'ASC']]
      }]
    });

    console.log('Story query result:', story);
    
    if (!story) {
      console.log('Story not found in database');
      return res.status(404).json({ error: 'Story not found' });
    }

    // Log the story details
    console.log('Story details:', {
      id: story.id,
      title: story.title,
      messageCount: story.messages ? story.messages.length : 0
    });

    res.json({
      story: {
        id: story.id,
        title: story.title,
        description: story.description,
        level: story.level,
        tags: story.tags,
        imageUrl: story.imageUrl,
        isPremium: story.isPremium
      },
      messages: story.messages || []
    });
  } catch (error) {
    console.error('Error in story route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user progress for a story
router.post('/:id/progress', authenticate, async (req, res) => {
  try {
    const { lastMessageIndex, completed, xpEarned, correctAnswers, totalQuestions } = req.body;
    
    const [progress, created] = await UserProgress.findOrCreate({
      where: {
        userId: req.user.id,
        storyId: req.params.id
      },
      defaults: {
        lastMessageIndex: 0,
        completed: false,
        xpEarned: 0,
        correctAnswers: 0,
        totalQuestions: 0
      }
    });

    if (!created) {
      progress.lastMessageIndex = lastMessageIndex;
      progress.completed = completed;
      progress.xpEarned = xpEarned;
      progress.correctAnswers = correctAnswers;
      progress.totalQuestions = totalQuestions;
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get progress for a specific story
router.get('/:id/progress', authenticate, async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      where: {
        userId: req.user.id,
        storyId: req.params.id
      },
      include: [{
        model: Story,
        as: 'story',
        attributes: ['id', 'title', 'level']
      }]
    });

    if (!progress) {
      return res.json({
        completed: false,
        xpEarned: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        lastMessageIndex: 0
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed a horror story (temporary development route)
router.post('/seed/horror', async (req, res) => {
  try {
    const story = await Story.create({
      title: 'La Casa Abandonada',
      description: 'María investiga una misteriosa casa abandonada en las afueras de Madrid y descubre secretos inquietantes.',
      level: 'intermediate',
      tags: ['horror', 'mystery', 'haunted'],
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      isPremium: false,
      messageCount: 10,
      totalXp: 100
    });

    const messages = await Message.bulkCreate([
      {
        storyId: story.id,
        text: 'María se detiene frente a la antigua mansión. Las ventanas rotas y las paredes agrietadas cuentan historias de años de abandono.',
        translations: {
          'ventanas': 'windows',
          'rotas': 'broken',
          'paredes': 'walls',
          'agrietadas': 'cracked',
          'abandono': 'abandonment'
        },
        order: 0
      },
      {
        storyId: story.id,
        text: 'Con manos temblorosas, saca su cámara. Como periodista, necesita documentar la historia de este lugar misterioso.',
        translations: {
          'temblorosas': 'trembling',
          'cámara': 'camera',
          'periodista': 'journalist',
          'misterioso': 'mysterious'
        },
        order: 1
      },
      {
        storyId: story.id,
        text: '¿Por qué nadie ha entrado en esta casa durante veinte años?',
        translations: {
          'nadie': 'nobody',
          'entrado': 'entered',
          'durante': 'during',
          'años': 'years'
        },
        order: 2
      },
      {
        storyId: story.id,
        text: 'La puerta principal cruje al abrirse, el sonido hace eco en el silencio.',
        translations: {
          'puerta': 'door',
          'cruje': 'creaks',
          'abrirse': 'to open',
          'sonido': 'sound',
          'eco': 'echo',
          'silencio': 'silence'
        },
        order: 3
      },
      {
        storyId: story.id,
        text: '¿Qué profesión tiene María?',
        quizType: 'fill_in_blank',
        quizQuestion: '¿Qué profesión tiene María?',
        quizAnswer: 'periodista',
        xpValue: 10,
        order: 4
      },
      {
        storyId: story.id,
        text: 'El polvo cubre los muebles antiguos como una manta gris. En las paredes, hay fotografías descoloridas de una familia.',
        translations: {
          'polvo': 'dust',
          'muebles': 'furniture',
          'antiguos': 'old',
          'manta': 'blanket',
          'fotografías': 'photographs',
          'descoloridas': 'faded',
          'familia': 'family'
        },
        order: 5
      },
      {
        storyId: story.id,
        text: 'De repente, escucha un ruido que viene del piso de arriba. Pasos lentos y pesados.',
        translations: {
          'repente': 'suddenly',
          'escucha': 'hears',
          'ruido': 'noise',
          'piso': 'floor',
          'arriba': 'upstairs',
          'pasos': 'footsteps',
          'lentos': 'slow',
          'pesados': 'heavy'
        },
        order: 6
      },
      {
        storyId: story.id,
        text: '¿De dónde viene el ruido que escucha María?',
        quizType: 'fill_in_blank',
        quizQuestion: '¿De dónde viene el ruido que escucha María?',
        quizAnswer: 'arriba',
        xpValue: 10,
        order: 7
      },
      {
        storyId: story.id,
        text: 'Su corazón late con fuerza mientras sube las escaleras. La madera cruje bajo sus pies.',
        translations: {
          'corazón': 'heart',
          'late': 'beats',
          'fuerza': 'force',
          'mientras': 'while',
          'sube': 'climbs',
          'escaleras': 'stairs',
          'madera': 'wood',
          'pies': 'feet'
        },
        order: 8
      },
      {
        storyId: story.id,
        text: 'En la habitación principal, encuentra un diario viejo. Las últimas palabras escritas son: "No están solos".',
        translations: {
          'habitación': 'room',
          'encuentra': 'finds',
          'diario': 'diary',
          'viejo': 'old',
          'últimas': 'last',
          'palabras': 'words',
          'escritas': 'written',
          'solos': 'alone'
        },
        order: 9
      },
      {
        storyId: story.id,
        text: '¿Qué encuentra María en la habitación principal?',
        quizType: 'fill_in_blank',
        quizQuestion: '¿Qué encuentra María en la habitación principal?',
        quizAnswer: 'diario',
        xpValue: 10,
        order: 10
      }
    ]);

    res.json({ story, messages });
  } catch (error) {
    console.error('Error seeding horror story:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 