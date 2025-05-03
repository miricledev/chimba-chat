import { QUIZ_TYPES } from '../config';

export const sampleQuestions = [
  {
    type: QUIZ_TYPES.MULTIPLE_CHOICE,
    question: '¿Qué significa "Soy de los Estados Unidos"?',
    options: ['I am from the United States', 'I am going to the United States', 'I like the United States'],
    correctAnswer: 'I am from the United States'
  },
  {
    type: QUIZ_TYPES.FILL_IN_BLANK,
    question: 'Complete: "Estoy aquí para _______ español"',
    options: ['comer', 'estudiar', 'comprar'],
    correctAnswer: 'estudiar'
  },
  {
    type: QUIZ_TYPES.WORD_MATCH,
    question: 'Match "recomendaciones" with its meaning:',
    options: ['advice', 'recommendations', 'directions'],
    correctAnswer: 'recommendations'
  },
  {
    type: QUIZ_TYPES.MULTIPLE_CHOICE,
    question: '¿Para cuántas personas quiere Carlos una mesa?',
    options: ['Una persona', 'Dos personas', 'Tres personas'],
    correctAnswer: 'Una persona'
  },
  {
    type: QUIZ_TYPES.WORD_MATCH,
    question: '¿Qué significa "la carta" en este contexto?',
    options: ['The letter', 'The menu', 'The bill'],
    correctAnswer: 'The menu'
  }
]; 