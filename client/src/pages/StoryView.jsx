import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import PremiumUpgrade from '../components/PremiumUpgrade';
import { useAuth } from '../contexts/AuthContext';

const Message = ({ text, translations, isPersonB }) => {
  const [hoveredWord, setHoveredWord] = useState(null);
  
  if (!text) return null;
  
  const words = text.split(/(\s+)/).filter(Boolean);
  
  return (
    <div className={`flex ${isPersonB ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
        isPersonB ? 'bg-[#ff0037] text-white' : 'bg-gray-700 text-dark-100'
      }`}>
        <p className="text-lg">
          {words.map((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[.,!?]$/, '');
            const hasTranslation = translations && translations[cleanWord];
            
            return (
              <span
                key={index}
                className={`${hasTranslation ? 'cursor-help border-b border-dotted border-current' : ''}`}
                onMouseEnter={() => hasTranslation && setHoveredWord(cleanWord)}
                onMouseLeave={() => setHoveredWord(null)}
                style={{ position: 'relative' }}
              >
                {word}
                {hoveredWord === cleanWord && translations && (
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-dark-900 text-dark-100 text-sm rounded shadow-lg whitespace-nowrap z-10">
                    {translations[cleanWord]}
                  </span>
                )}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Quiz = ({ question, onSubmit, isSubmitted, isCorrect, selectedAnswer, setSelectedAnswer, correctAnswer, options }) => {
  return (
    <div className="bg-dark-800 rounded-2xl p-6 mb-4 border border-dark-700">
      <h3 className="text-xl font-medium text-dark-100 mb-4">{question}</h3>
      <div className="flex flex-col space-y-4">
        {options ? (
          // Multiple choice question
          <div className="space-y-3">
            {JSON.parse(options).map((option, idx) => (
              <button
                key={idx}
                onClick={() => !isSubmitted && setSelectedAnswer(option)}
                className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  isSubmitted
                    ? option === correctAnswer
                      ? 'bg-green-500 bg-opacity-10 border-green-500'
                      : selectedAnswer === option
                      ? 'bg-[#ff0037] bg-opacity-10 border-[#ff0037]'
                      : 'bg-dark-900 border-dark-700'
                    : selectedAnswer === option
                    ? 'bg-[#ff0037] bg-opacity-10 border-[#ff0037]'
                    : 'bg-dark-900 border-dark-700 hover:border-[#ff0037]'
                } border`}
                disabled={isSubmitted}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          // Fill in blank question
          <input
            type="text"
            value={selectedAnswer}
            onChange={(e) => !isSubmitted && setSelectedAnswer(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037] focus:border-transparent placeholder-dark-400"
            placeholder="Escribe tu respuesta aquí..."
            disabled={isSubmitted}
          />
        )}
        
        {isSubmitted && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-500 bg-opacity-10' : 'bg-[#ff0037] bg-opacity-10'}`}>
            {isCorrect ? (
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-lg font-medium">¡Correcto!</span>
                <span className="text-2xl">🎉</span>
              </div>
            ) : (
              <div>
                <span className="text-[#ff0037] text-lg font-medium">Incorrecto</span>
                <div className="text-dark-300 mt-2">
                  La respuesta correcta era: <span className="text-dark-100 font-medium">{correctAnswer}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {!isSubmitted && (
          <button
            onClick={onSubmit}
            disabled={!selectedAnswer}
            className="w-full py-3 px-4 rounded-lg bg-[#ff0037] text-white font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff0037] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Comprobar Respuesta
          </button>
        )}
      </div>
    </div>
  );
};

const StoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [userProgress, setUserProgress] = useState({
    xpEarned: 0,
    correctAnswers: 0,
    totalQuestions: 0
  });
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const [storyResponse, progressResponse] = await Promise.all([
          axios.get(`${API_URL}/stories/${id}`),
          axios.get(`${API_URL}/stories/${id}/progress`)
        ]);
        
        if (!storyResponse.data.story) {
          throw new Error('Story not found');
        }

        // Check if user can access premium content
        if (storyResponse.data.story.isPremium && !currentUser?.isPremium) {
          setShowUpgrade(true);
          return;
        }
        
        setStory(storyResponse.data.story);
        setMessages(storyResponse.data.messages || []);
        setDisplayedMessages([storyResponse.data.messages[0]]);
        
        if (progressResponse.data) {
          setUserProgress(progressResponse.data);
          if (progressResponse.data.completed) {
            setIsComplete(true);
          }
        }
      } catch (error) {
        console.error('Error fetching story:', error);
        toast.error('Failed to load story');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, currentUser]);

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer) return;

    const currentMessage = messages[currentMessageIndex];
    console.log('Quiz data:', {
      selectedAnswer,
      correctAnswer: currentMessage.quizAnswer,
      message: currentMessage
    });

    // Normalize both answers for comparison (trim whitespace and convert to lowercase)
    const normalizedSelected = selectedAnswer.trim().toLowerCase();
    const normalizedCorrect = currentMessage.quizAnswer ? currentMessage.quizAnswer.trim().toLowerCase() : '';
    const correct = normalizedSelected === normalizedCorrect;
    
    console.log('Answer comparison:', {
      normalizedSelected,
      normalizedCorrect,
      isCorrect: correct
    });

    setIsCorrect(correct);
    setIsSubmitted(true);

    try {
      const isLastMessage = currentMessageIndex === messages.length - 1;
      
      // Update local progress
      const newProgress = {
        xpEarned: userProgress.xpEarned + (correct ? (currentMessage.xpValue || 10) : 0),
        correctAnswers: userProgress.correctAnswers + (correct ? 1 : 0),
        totalQuestions: userProgress.totalQuestions + 1
      };
      setUserProgress(newProgress);

      // Update server progress
      await axios.post(`${API_URL}/stories/${id}/progress`, {
        lastMessageIndex: currentMessageIndex + 1,
        completed: isLastMessage,
        ...newProgress
      });

      if (correct) {
        toast.success('¡Correcto!');
      } else {
        toast.error(`Incorrecto. La respuesta correcta era: ${currentMessage.quizAnswer || 'estudiar'}`);
      }

      setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
          setCurrentMessageIndex(prev => prev + 1);
          setDisplayedMessages(prev => [...prev, messages[currentMessageIndex + 1]]);
          setSelectedAnswer('');
          setIsSubmitted(false);
        } else {
          completeStory(newProgress);
        }
      }, 2000);
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const completeStory = async (finalProgress) => {
    try {
      // Final progress update
      await axios.post(`${API_URL}/stories/${id}/progress`, {
        lastMessageIndex: messages.length - 1,
        completed: true,
        ...finalProgress
      });
      
      setIsComplete(true);
      toast.success('¡Felicitaciones! Has completado la historia.');
    } catch (error) {
      console.error('Error completing story:', error);
      toast.error('Error saving progress');
    }
  };

  const handleNextMessage = async () => {
    if (currentMessageIndex < messages.length - 1) {
      const nextIndex = currentMessageIndex + 1;
      setCurrentMessageIndex(nextIndex);
      setDisplayedMessages(prev => [...prev, messages[nextIndex]]);
      
      // If this is the last message, complete the story
      if (nextIndex === messages.length - 1) {
        await completeStory(userProgress);
      } else {
        // Update progress for non-quiz messages
        await axios.post(`${API_URL}/stories/${id}/progress`, {
          lastMessageIndex: nextIndex,
          completed: false,
          ...userProgress
        });
      }
    }
  };

  const handleRetry = async () => {
    try {
      // Reset progress on the server
      await axios.post(`${API_URL}/stories/${id}/progress`, {
        lastMessageIndex: 0,
        completed: false,
        xpEarned: 0,
        correctAnswers: 0,
        totalQuestions: 0
      });

      // Reset local state
      setCurrentMessageIndex(0);
      setDisplayedMessages([messages[0]]);
      setSelectedAnswer('');
      setIsSubmitted(false);
      setIsCorrect(false);
      setIsComplete(false);
      setUserProgress({
        xpEarned: 0,
        correctAnswers: 0,
        totalQuestions: 0
      });

      toast.success('¡Historia reiniciada! Buena suerte.');
    } catch (error) {
      console.error('Error resetting story:', error);
      toast.error('Error al reiniciar la historia');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (showUpgrade) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
        <PremiumUpgrade onClose={() => navigate('/dashboard')} />
      </div>
    );
  }

  if (!story || !messages.length) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-100 mb-4">Story Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-primary-500 text-dark-900 rounded-md hover:bg-primary-600"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-100">{story.title}</h1>
          <p className="mt-2 text-sm text-dark-300">{story.description}</p>
        </div>

        <div className="bg-dark-900 shadow rounded-lg p-6 border border-dark-800">
          <div className="space-y-4 mb-6">
            {displayedMessages.map((message, index) => {
              console.log('Rendering message:', message);
              return (
                <React.Fragment key={index}>
                  <Message 
                    text={message.text} 
                    translations={message.translations}
                    isPersonB={index % 2 === 1}
                  />
                  {message.quizType && index === currentMessageIndex && !isSubmitted && (
                    <div className="mt-4">
                      <Quiz
                        question={message.quizQuestion}
                        onSubmit={handleAnswerSubmit}
                        isSubmitted={isSubmitted}
                        isCorrect={isCorrect}
                        selectedAnswer={selectedAnswer}
                        setSelectedAnswer={setSelectedAnswer}
                        correctAnswer={message.quizAnswer}
                        options={message.quizOptions}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {isComplete ? (
            <div className="text-center">
              <h3 className="text-xl font-bold text-dark-100 mb-4">¡Felicitaciones!</h3>
              <p className="text-dark-300 mb-2">Has completado esta historia.</p>
              <p className="text-dark-300 mb-6">
                XP Ganado: {userProgress.xpEarned} | 
                Respuestas Correctas: {userProgress.correctAnswers}/{userProgress.totalQuestions}
              </p>
              <div className="space-x-4">
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-dark-800 text-dark-100 rounded-md hover:bg-dark-700 transition-colors"
                >
                  Reintentar Historia
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 bg-[#ff0037] text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Volver al Dashboard
                </button>
              </div>
            </div>
          ) : (
            !isSubmitted && currentMessageIndex < messages.length - 1 && (
              <button
                onClick={handleNextMessage}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff0037] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff0037]"
              >
                Siguiente Mensaje
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryView; 