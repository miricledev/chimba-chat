import { useState } from 'react';
import { WordTooltip } from './WordTooltip';

const MessageBubble = ({ message, isUser = false, onAnswer }) => {
  const [showTranslations, setShowTranslations] = useState(false);
  const translations = JSON.parse(message.translations || '{}');

  const handleAnswer = (answer) => {
    if (onAnswer) {
      onAnswer(answer);
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          isUser
            ? 'bg-primary-600 text-white'
            : 'bg-white text-gray-900 border border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            {isUser ? 'You' : 'Character'}
          </span>
          {Object.keys(translations).length > 0 && (
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {showTranslations ? 'Hide translations' : 'Show translations'}
            </button>
          )}
        </div>

        <div className="space-y-2">
          {message.text.split(' ').map((word, index) => (
            <WordTooltip
              key={index}
              word={word}
              translation={translations[word.toLowerCase()]}
              showTranslations={showTranslations}
            />
          ))}
        </div>

        {message.quizType !== 'none' && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">{message.quizQuestion}</p>
            {message.quizType === 'multiple-choice' && (
              <div className="space-y-2">
                {JSON.parse(message.options).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="block w-full text-left px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {message.quizType === 'fill-blank' && (
              <div className="space-y-2">
                {JSON.parse(message.options).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="block w-full text-left px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {message.quizType === 'word-match' && (
              <div className="space-y-2">
                {JSON.parse(message.options).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="block w-full text-left px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble; 