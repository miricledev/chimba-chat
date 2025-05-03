import { useState } from 'react';
import { QUIZ_TYPES } from '../config';

const Quiz = ({ type, question, options, correctAnswer, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = type === QUIZ_TYPES.MULTIPLE_CHOICE || type === QUIZ_TYPES.WORD_MATCH
      ? selectedAnswer === correctAnswer
      : selectedAnswer.toLowerCase() === correctAnswer.toLowerCase();

    setIsCorrect(correct);
    setIsSubmitted(true);
    onComplete(correct);
  };

  const renderMultipleChoice = () => (
    <div className="space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !isSubmitted && setSelectedAnswer(option)}
          className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
            isSubmitted
              ? option === correctAnswer
                ? 'border-green-500 bg-green-50'
                : selectedAnswer === option
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
              : selectedAnswer === option
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const renderFillInBlank = () => (
    <div className="space-y-4">
      <input
        type="text"
        value={selectedAnswer}
        onChange={(e) => !isSubmitted && setSelectedAnswer(e.target.value)}
        className={`w-full p-4 rounded-lg border-2 ${
          isSubmitted
            ? isCorrect
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
            : 'border-gray-200 focus:border-blue-500'
        }`}
        placeholder="Type your answer here..."
        disabled={isSubmitted}
      />
      {isSubmitted && !isCorrect && (
        <p className="text-red-500">Correct answer: {correctAnswer}</p>
      )}
    </div>
  );

  const renderWordMatch = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isSubmitted && setSelectedAnswer(option)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              isSubmitted
                ? option === correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : selectedAnswer === option
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200'
                : selectedAnswer === option
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{question}</h3>
      
      {type === QUIZ_TYPES.MULTIPLE_CHOICE && renderMultipleChoice()}
      {type === QUIZ_TYPES.FILL_IN_BLANK && renderFillInBlank()}
      {type === QUIZ_TYPES.WORD_MATCH && renderWordMatch()}

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};

export default Quiz; 