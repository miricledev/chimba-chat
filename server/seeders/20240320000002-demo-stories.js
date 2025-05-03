'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // First, create the stories
    const stories = [
      // Free Stories
      {
        id: uuidv4(),
        title: 'Primer día en Madrid',
        description: 'Anna llega a Madrid para su viaje de estudios y tiene su primera conversación con una familia local.',
        level: 'beginner',
        tags: ['travel', 'introduction', 'greetings'],
        imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
        isPremium: false,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        title: 'En el restaurante',
        description: 'Carlos está en un restaurante en Barcelona y necesita pedir comida y hacer preguntas al camarero.',
        level: 'beginner',
        tags: ['food', 'restaurant', 'ordering'],
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        isPremium: false,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        title: 'De compras',
        description: 'María va de compras en una tienda de ropa y practica cómo pedir tallas y colores diferentes.',
        level: 'beginner',
        tags: ['shopping', 'clothing', 'colors'],
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
        isPremium: false,
        createdAt: now,
        updatedAt: now
      },
      // Premium Stories
      {
        id: uuidv4(),
        title: 'Entrevista de trabajo',
        description: 'Marta tiene una entrevista para un trabajo en una empresa española y necesita impresionar al entrevistador.',
        level: 'intermediate',
        tags: ['business', 'career', 'interview'],
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
        isPremium: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        title: 'En el hospital',
        description: 'Juan tiene que visitar el hospital y explicar sus síntomas al doctor en español.',
        level: 'intermediate',
        tags: ['health', 'medical', 'emergency'],
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        isPremium: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        title: 'Negociando un contrato',
        description: 'Ana es una empresaria que necesita negociar un contrato importante con un cliente español.',
        level: 'advanced',
        tags: ['business', 'negotiation', 'contracts'],
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        isPremium: true,
        createdAt: now,
        updatedAt: now
      }
    ];

    await queryInterface.bulkInsert('Stories', stories, {});

    // Now create messages for each story
    const messages = [];
    
    // Helper function to create a message
    const createMessage = (storyId, text, order, translations = {}, quiz = null) => ({
      id: uuidv4(),
      storyId,
      text,
      translations: JSON.stringify(translations),
      order,
      quizType: quiz ? quiz.type : 'none',
      quizQuestion: quiz ? quiz.question : null,
      quizOptions: quiz ? JSON.stringify(quiz.options) : null,
      quizAnswer: quiz ? quiz.answer : null,
      xpValue: quiz ? quiz.xpValue : 0,
      createdAt: now,
      updatedAt: now
    });

    // Add messages for each story
    stories.forEach(story => {
      if (story.title === 'Primer día en Madrid') {
        messages.push(
          createMessage(story.id, '¡Hola! ¿Cómo te llamas?', 0, { 'llamas': 'call yourself' }),
          createMessage(story.id, 'Me llamo Anna. Soy estudiante de España.', 1, { 'estudiante': 'student' }),
          createMessage(story.id, '¿De dónde eres?', 2, { 'eres': 'are' }, {
            type: 'multiple-choice',
            question: '¿Qué pregunta hace la persona?',
            options: ['¿Cómo te llamas?', '¿De dónde eres?', '¿Qué estudias?'],
            answer: '¿De dónde eres?',
            xpValue: 10
          }),
          createMessage(story.id, 'Soy de Estados Unidos.', 3, { 'estados unidos': 'United States' }),
          createMessage(story.id, '¡Bienvenida a Madrid! ¿Es tu primera vez aquí?', 4, { 'bienvenida': 'welcome', 'primera vez': 'first time' }),
          createMessage(story.id, 'Sí, es mi primera vez. ¡Estoy muy emocionada!', 5, { 'emocionada': 'excited' }, {
            type: 'fill_in_blank',
            question: 'Complete la frase: "Sí, es mi _______ vez."',
            answer: 'primera',
            xpValue: 10
          })
        );
      }
      else if (story.title === 'En el restaurante') {
        messages.push(
          createMessage(story.id, 'Buenas tardes, ¿qué desea ordenar?', 0, { 'desea': 'wish', 'ordenar': 'to order' }),
          createMessage(story.id, 'Hola, ¿me puede recomendar algo típico de España?', 1, { 'recomendar': 'recommend', 'típico': 'typical' }),
          createMessage(story.id, 'Por supuesto, la paella es muy popular.', 2, { 'por supuesto': 'of course', 'popular': 'popular' }, {
            type: 'multiple-choice',
            question: '¿Qué recomienda el camarero?',
            options: ['Tacos', 'Paella', 'Pizza'],
            answer: 'Paella',
            xpValue: 10
          }),
          createMessage(story.id, '¡Perfecto! Quiero una paella y una sangría, por favor.', 3, { 'perfecto': 'perfect', 'quiero': 'I want' }),
          createMessage(story.id, '¿Algo más?', 4, { 'algo más': 'anything else' }, {
            type: 'fill_in_blank',
            question: 'Complete la pregunta del camarero: "¿_____ más?"',
            answer: 'algo',
            xpValue: 10
          })
        );
      }
      else if (story.title === 'De compras') {
        messages.push(
          createMessage(story.id, 'Hola, ¿puedo ayudarte?', 0, { 'puedo': 'can I', 'ayudarte': 'help you' }),
          createMessage(story.id, 'Sí, busco una camisa azul.', 1, { 'busco': 'looking for', 'camisa': 'shirt', 'azul': 'blue' }),
          createMessage(story.id, '¿Qué talla necesitas?', 2, { 'talla': 'size', 'necesitas': 'need' }, {
            type: 'multiple-choice',
            question: '¿Qué pregunta el vendedor?',
            options: ['¿Qué color quieres?', '¿Qué talla necesitas?', '¿Cuánto cuesta?'],
            answer: '¿Qué talla necesitas?',
            xpValue: 10
          }),
          createMessage(story.id, 'Mediana, por favor.', 3, { 'mediana': 'medium' }),
          createMessage(story.id, 'Aquí tienes. Los probadores están allí.', 4, { 'probadores': 'fitting rooms', 'allí': 'there' }, {
            type: 'fill_in_blank',
            question: 'Los _______ están allí.',
            answer: 'probadores',
            xpValue: 10
          })
        );
      }
      else if (story.title === 'Entrevista de trabajo') {
        messages.push(
          createMessage(story.id, 'Buenos días, siéntese por favor. ¿Por qué le interesa este puesto?', 0, { 'siéntese': 'sit down', 'puesto': 'position' }),
          createMessage(story.id, 'Me interesa porque tiene oportunidades de crecimiento profesional.', 1, { 'crecimiento': 'growth', 'profesional': 'professional' }),
          createMessage(story.id, '¿Cuál es su experiencia previa?', 2, { 'experiencia': 'experience', 'previa': 'previous' }, {
            type: 'multiple-choice',
            question: '¿Qué pregunta el entrevistador sobre?',
            options: ['Educación', 'Experiencia previa', 'Salario'],
            answer: 'Experiencia previa',
            xpValue: 15
          }),
          createMessage(story.id, 'Trabajé cinco años en marketing digital.', 3, { 'trabajé': 'worked', 'años': 'years' }),
          createMessage(story.id, '¿Cuáles son sus expectativas salariales?', 4, { 'expectativas': 'expectations', 'salariales': 'salary' }, {
            type: 'fill_in_blank',
            question: 'Complete: "¿Cuáles son sus expectativas _______?"',
            answer: 'salariales',
            xpValue: 15
          })
        );
      }
      else if (story.title === 'En el hospital') {
        messages.push(
          createMessage(story.id, '¿Cuáles son sus síntomas?', 0, { 'síntomas': 'symptoms' }),
          createMessage(story.id, 'Tengo fiebre y dolor de cabeza desde ayer.', 1, { 'fiebre': 'fever', 'dolor de cabeza': 'headache', 'desde': 'since' }),
          createMessage(story.id, '¿Ha tomado algún medicamento?', 2, { 'tomado': 'taken', 'medicamento': 'medication' }, {
            type: 'multiple-choice',
            question: '¿Qué pregunta el doctor?',
            options: ['¿Tiene fiebre?', '¿Ha tomado algún medicamento?', '¿Le duele la cabeza?'],
            answer: '¿Ha tomado algún medicamento?',
            xpValue: 15
          }),
          createMessage(story.id, 'No, no he tomado nada.', 3, { 'nada': 'nothing' }),
          createMessage(story.id, 'Voy a recetarle un antibiótico.', 4, { 'recetarle': 'prescribes', 'antibiótico': 'antibiotic' }, {
            type: 'fill_in_blank',
            question: 'Complete: "Voy a _______ un antibiótico."',
            answer: 'recetarle',
            xpValue: 15
          })
        );
      }
      else if (story.title === 'Negociando un contrato') {
        messages.push(
          createMessage(story.id, 'Revisé su propuesta. Tengo algunas sugerencias.', 0, { 'propuesta': 'proposal', 'sugerencias': 'suggestions' }),
          createMessage(story.id, '¿Qué aspectos le gustaría modificar?', 1, { 'aspectos': 'aspects', 'modificar': 'modify' }),
          createMessage(story.id, 'Los términos de pago y el plazo de entrega.', 2, { 'términos': 'terms', 'plazo': 'deadline', 'entrega': 'delivery' }, {
            type: 'multiple-choice',
            question: '¿Qué quiere modificar el cliente?',
            options: ['El precio y la calidad', 'Los términos de pago y el plazo de entrega', 'La garantía y el servicio'],
            answer: 'Los términos de pago y el plazo de entrega',
            xpValue: 20
          }),
          createMessage(story.id, 'Podemos ofrecer un plazo de 30 días.', 3, { 'ofrecer': 'offer', 'días': 'days' }),
          createMessage(story.id, 'Necesitamos el proyecto finalizado en 15 días.', 4, { 'finalizado': 'finished', 'proyecto': 'project' }, {
            type: 'fill_in_blank',
            question: 'Complete: "Necesitamos el _______ finalizado en 15 días."',
            answer: 'proyecto',
            xpValue: 20
          })
        );
      }
    });

    await queryInterface.bulkInsert('Messages', messages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
    await queryInterface.bulkDelete('Stories', null, {});
  }
}; 