import { useState, useEffect } from 'react';
import Quiz from './Quiz';
import { QUIZ_TYPES, DEFAULT_QUIZ_SETTINGS } from '../config';

const QuizContainer = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_QUIZ_SETTINGS.timeLimit);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isQuizComplete) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isQuizComplete]);

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setIsQuizComplete(true);
    onComplete(score, questions.length);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isQuizComplete) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p className="text-xl">
          Your score: {score} out of {questions.length}
        </p>
        <p className="text-lg">
          {score === questions.length
            ? 'Perfect! 🎉'
            : score >= questions.length / 2
            ? 'Good job! 👍'
            : 'Keep practicing! 💪'}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-lg">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-lg font-semibold">{formatTime(timeLeft)}</p>
      </div>

      <Quiz
        type={currentQuestion.type}
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        onComplete={handleAnswerSubmit}
      />
    </div>
  );
};

export default QuizContainer; 