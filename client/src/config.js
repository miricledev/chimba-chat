export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const LEVELS = {
  beginner: {
    label: 'Beginner',
    color: 'green',
    description: 'Basic vocabulary and simple phrases'
  },
  intermediate: {
    label: 'Intermediate',
    color: 'blue',
    description: 'More complex sentences and grammar'
  },
  advanced: {
    label: 'Advanced',
    color: 'purple',
    description: 'Complex conversations and idiomatic expressions'
  }
};

export const QUIZ_TYPES = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  FILL_IN_BLANK: 'FILL_IN_BLANK',
  WORD_MATCH: 'WORD_MATCH'
};

export const DEFAULT_QUIZ_SETTINGS = {
  questionsPerQuiz: 5,
  timeLimit: 300, // 5 minutes in seconds
  showCorrectAnswers: true,
  allowRetries: true
};

export const QUIZ_DIFFICULTY = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export const XP_REWARDS = {
  message: 5,
  quiz: 10,
  storyCompletion: 50,
  dailyLogin: 20
}; 