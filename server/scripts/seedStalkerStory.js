const { Story, Message } = require('../models');

async function seedStalkerStory() {
  try {
    console.log('Creating stalker story...');
    const story = await Story.create({
      title: 'Un Mensaje Inquietante',
      description: 'Una conversación escalofriante entre Ana y un extraño que parece saber demasiado sobre ella.',
      level: 'intermediate',
      tags: ['horror', 'thriller', 'stalker'],
      imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800',
      isPremium: false
    });

    console.log('Story created:', story.id);
    console.log('Creating messages...');

    const messages = await Message.bulkCreate([
      {
        storyId: story.id,
        text: 'Hola Ana. Me encanta tu suéter rojo hoy.',
        translations: {
          'suéter': 'sweater',
          'rojo': 'red',
          'hoy': 'today'
        },
        order: 0
      },
      {
        storyId: story.id,
        text: '¿Quién eres? No te conozco.',
        translations: {
          'conozco': 'know'
        },
        order: 1
      },
      {
        storyId: story.id,
        text: 'Te veo todos los días en la cafetería de la calle Valencia. Siempre pides un café con leche.',
        translations: {
          'cafetería': 'coffee shop',
          'calle': 'street',
          'todos los días': 'every day',
          'pides': 'order',
          'leche': 'milk'
        },
        order: 2
      },
      {
        storyId: story.id,
        text: '¿Qué bebida ordena Ana en la cafetería?',
        quizType: 'multiple-choice',
        quizQuestion: '¿Qué bebida ordena Ana en la cafetería?',
        quizOptions: ['té verde', 'café con leche', 'chocolate caliente', 'agua mineral'],
        quizAnswer: 'café con leche',
        xpValue: 10,
        order: 3
      },
      {
        storyId: story.id,
        text: 'Voy a llamar a la policía. Déjame en paz.',
        translations: {
          'llamar': 'call',
          'policía': 'police',
          'déjame': 'leave me',
          'paz': 'peace'
        },
        order: 4
      },
      {
        storyId: story.id,
        text: 'No servirá de nada. Ya sé dónde vives. Bonitas cortinas azules, por cierto.',
        translations: {
          'servirá': 'will serve',
          'nada': 'nothing',
          'vives': 'live',
          'cortinas': 'curtains',
          'azules': 'blue',
          'por cierto': 'by the way'
        },
        order: 5
      },
      {
        storyId: story.id,
        text: '¿De qué color son las cortinas de Ana?',
        quizType: 'multiple-choice',
        quizQuestion: '¿De qué color son las cortinas de Ana?',
        quizOptions: ['rojas', 'verdes', 'azules', 'blancas'],
        quizAnswer: 'azules',
        xpValue: 10,
        order: 6
      },
      {
        storyId: story.id,
        text: '*Bloqueando el número*',
        translations: {
          'bloqueando': 'blocking',
          'número': 'number'
        },
        order: 7
      },
      {
        storyId: story.id,
        text: 'No importa. Tengo otros números. Y me gusta cómo tocas el piano por las noches.',
        translations: {
          'importa': 'matters',
          'otros': 'other',
          'tocas': 'play',
          'piano': 'piano',
          'noches': 'nights'
        },
        order: 8
      },
      {
        storyId: story.id,
        text: '¿Qué instrumento toca Ana por las noches?',
        quizType: 'multiple-choice',
        quizQuestion: '¿Qué instrumento toca Ana por las noches?',
        quizOptions: ['violín', 'guitarra', 'piano', 'flauta'],
        quizAnswer: 'piano',
        xpValue: 10,
        order: 9
      },
      {
        storyId: story.id,
        text: 'Estoy llamando al 112 ahora mismo.',
        translations: {
          'llamando': 'calling',
          'ahora mismo': 'right now'
        },
        order: 10
      },
      {
        storyId: story.id,
        text: 'Deberías cerrar mejor tu ventana por las noches. El aire frío no es bueno para ti.',
        translations: {
          'deberías': 'should',
          'cerrar': 'close',
          'mejor': 'better',
          'ventana': 'window',
          'aire': 'air',
          'frío': 'cold',
          'bueno': 'good'
        },
        order: 11
      },
      {
        storyId: story.id,
        text: '¿Qué sugiere el acosador que Ana debería hacer?',
        quizType: 'multiple-choice',
        quizQuestion: '¿Qué sugiere el acosador que Ana debería hacer?',
        quizOptions: ['abrir la puerta', 'cerrar la ventana', 'apagar las luces', 'cambiar de casa'],
        quizAnswer: 'cerrar la ventana',
        xpValue: 10,
        order: 12
      }
    ]);

    console.log('Created', messages.length, 'messages');
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding story:', error);
  }
}

seedStalkerStory(); 