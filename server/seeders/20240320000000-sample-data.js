const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Create admin and regular user
      const adminPassword = await bcrypt.hash('admin123', 10);
      const userPassword = await bcrypt.hash('user123', 10);
      
      const users = [
        {
          id: uuidv4(),
          username: 'admin',
          email: 'admin@example.com',
          password: adminPassword,
          role: 'admin',
          xp: 500,
          isPremium: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          username: 'user',
          email: 'user@example.com',
          password: userPassword,
          role: 'user',
          xp: 250,
          isPremium: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await queryInterface.bulkInsert('Users', users);
      
      // Create sample stories
      const stories = [
        // Beginner story
        {
          id: uuidv4(),
          title: 'Primer día en Madrid',
          description: 'Anna llega a Madrid para su viaje de estudios y tiene su primera conversación con una familia local.',
          level: 'beginner',
          tags: ['travel', 'introduction', 'greetings'],
          imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
          isPremium: false,
          messageCount: 10,
          totalXp: 70,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Intermediate story
        {
          id: uuidv4(),
          title: 'En el restaurante',
          description: 'Carlos está en un restaurante en Barcelona y necesita pedir comida y hacer preguntas al camarero.',
          level: 'intermediate',
          tags: ['food', 'restaurant', 'ordering'],
          imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
          isPremium: false,
          messageCount: 12,
          totalXp: 95,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Advanced story
        {
          id: uuidv4(),
          title: 'Entrevista de trabajo',
          description: 'Marta tiene una entrevista para un trabajo en una empresa española y necesita impresionar al entrevistador.',
          level: 'advanced',
          tags: ['business', 'career', 'interview'],
          imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
          isPremium: true,
          messageCount: 15,
          totalXp: 120,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await queryInterface.bulkInsert('Stories', stories);
      
      // Create messages for the first story (Beginner: "Primer día en Madrid")
      const beginnerStoryId = stories[0].id;
      
      const beginnerMessages = [
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: '¡Hola! Me llamo María. Bienvenida a Madrid. ¿Cómo te llamas?',
          order: 0,
          quizType: 'none',
          xpValue: 5,
          translations: JSON.stringify({
            'hola': 'hello',
            'me llamo': 'my name is',
            'bienvenida': 'welcome',
            'cómo te llamas': 'what is your name'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: 'Hola María. Me llamo Anna. Estoy muy feliz de estar en Madrid.',
          order: 1,
          quizType: 'none',
          xpValue: 5,
          translations: JSON.stringify({
            'estoy': 'I am',
            'muy': 'very',
            'feliz': 'happy',
            'de estar': 'to be',
            'en': 'in'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: '¿De dónde eres, Anna?',
          order: 2,
          quizType: 'none',
          xpValue: 5,
          translations: JSON.stringify({
            'de dónde eres': 'where are you from'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: 'Soy de los Estados Unidos, de California. ¿Y tú?',
          order: 3,
          quizType: 'multiple-choice',
          quizQuestion: '¿Qué significa "Soy de los Estados Unidos"?',
          options: JSON.stringify(['I am from the United States', 'I am going to the United States', 'I like the United States']),
          correctOption: 'I am from the United States',
          xpValue: 10,
          translations: JSON.stringify({
            'soy de': 'I am from',
            'los estados unidos': 'the United States',
            'y tú': 'and you'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: 'Yo soy de Madrid, nací aquí. ¿Es tu primera vez en España?',
          order: 4,
          quizType: 'none',
          xpValue: 5,
          translations: JSON.stringify({
            'yo soy de': 'I am from',
            'nací': 'I was born',
            'aquí': 'here',
            'es tu primera vez': 'is it your first time',
            'españa': 'Spain'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: 'Sí, es mi primera vez. Estoy aquí para estudiar español por tres meses.',
          order: 5,
          quizType: 'fill-blank',
          quizQuestion: 'Complete: "Estoy aquí para _______ español"',
          options: JSON.stringify(['comer', 'estudiar', 'comprar']),
          correctOption: 'estudiar',
          xpValue: 10,
          translations: JSON.stringify({
            'sí': 'yes',
            'es mi primera vez': 'it is my first time',
            'estoy aquí para': 'I am here to',
            'estudiar': 'study',
            'por': 'for',
            'tres meses': 'three months'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: '¡Qué bien! Te va a encantar Madrid. Hay muchas cosas para hacer y ver.',
          order: 6,
          quizType: 'none',
          xpValue: 5,
          translations: JSON.stringify({
            'qué bien': 'that\'s great',
            'te va a encantar': 'you are going to love',
            'hay': 'there are',
            'muchas': 'many',
            'cosas': 'things',
            'para hacer': 'to do',
            'y ver': 'and see'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: '¿Tienes algunas recomendaciones? Me gustaría visitar lugares interesantes.',
          order: 7,
          quizType: 'word-match',
          quizQuestion: 'Match "recomendaciones" with its meaning:',
          options: JSON.stringify(['advice', 'recommendations', 'directions']),
          correctOption: 'recommendations',
          xpValue: 10,
          translations: JSON.stringify({
            'tienes': 'do you have',
            'algunas': 'some',
            'recomendaciones': 'recommendations',
            'me gustaría': 'I would like to',
            'visitar': 'visit',
            'lugares': 'places',
            'interesantes': 'interesting'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: 'Claro, debes visitar el Museo del Prado, el Parque del Retiro, y la Plaza Mayor. También la comida es muy buena.',
          order: 8,
          quizType: 'none',
          xpValue: 5,
          translations: JSON.stringify({
            'claro': 'of course',
            'debes': 'you should',
            'visitar': 'visit',
            'el museo del prado': 'the Prado Museum',
            'el parque del retiro': 'Retiro Park',
            'la plaza mayor': 'the Main Square',
            'también': 'also',
            'la comida': 'the food',
            'es muy buena': 'is very good'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          storyId: beginnerStoryId,
          text: '¡Gracias por las recomendaciones, María! Estoy muy emocionada de explorar la ciudad.',
          order: 9,
          quizType: 'multiple-choice',
          quizQuestion: '¿Cómo se siente Anna sobre explorar Madrid?',
          options: JSON.stringify(['Emocionada', 'Asustada', 'Aburrida']),
          correctOption: 'Emocionada',
          xpValue: 10,
          translations: JSON.stringify({
            'gracias por': 'thank you for',
            'las recomendaciones': 'the recommendations',
            'estoy muy emocionada': 'I am very excited',
            'de explorar': 'to explore',
            'la ciudad': 'the city'
          }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await queryInterface.bulkInsert('Messages', beginnerMessages);
      
      // Create user progress records
      const userProgress = [
        {
          id: uuidv4(),
          userId: users[1].id, // regular user
          storyId: beginnerStoryId,
          lastMessageIndex: 5,
          completed: false,
          xpEarned: 40,
          correctAnswers: 2,
          totalQuestions: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await queryInterface.bulkInsert('UserProgresses', userProgress);
      
      return true;
    } catch (error) {
      console.error('Seeding error:', error);
      return false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserProgresses', null, {});
    await queryInterface.bulkDelete('Messages', null, {});
    await queryInterface.bulkDelete('Stories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
}; 