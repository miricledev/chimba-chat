import { useState } from 'react';
import QuizContainer from '../components/QuizContainer';
import { sampleQuestions } from '../data/sampleQuestions';

const QuizPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const handleQuizComplete = (score, totalQuestions) => {
    setFinalScore({ score, totalQuestions });
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setFinalScore(null);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Spanish Quiz</h2>
            <p className="mt-2 text-gray-600">
              Test your Spanish knowledge with this interactive quiz!
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={handleStartQuiz}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <QuizContainer
          questions={sampleQuestions}
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
};

export default QuizPage; 