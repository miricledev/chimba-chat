import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaLock } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import PremiumUpgrade from './PremiumUpgrade';

const StoryCard = ({ story }) => {
  const { currentUser } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleStoryClick = (e) => {
    if (story.isPremium && !currentUser?.isPremium) {
      e.preventDefault();
      setShowUpgrade(true);
    }
  };

  const levelClass = story.level === 'beginner' 
    ? 'bg-green-100 text-green-800'
    : story.level === 'intermediate'
    ? 'bg-yellow-100 text-yellow-800'
    : 'bg-red-100 text-red-800';

  return (
    <>
      <div className="bg-dark-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div className="relative h-48 bg-indigo-100">
          {story.imageUrl ? (
            <img 
              src={story.imageUrl} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl font-bold">
              {story.title.charAt(0)}
            </div>
          )}
          
          {story.isPremium && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center">
              <FaLock className="mr-1" size={12} />
              <span className="text-xs font-medium">Premium</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-dark-100 truncate">{story.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelClass}`}>
              {story.level.charAt(0).toUpperCase() + story.level.slice(1)}
            </span>
          </div>
          
          <p className="text-dark-300 text-sm mb-3 line-clamp-2">{story.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-dark-300 text-sm">{story.totalXp} XP</span>
            </div>
            
            {story.isPremium && !currentUser?.isPremium ? (
              <button 
                onClick={() => setShowUpgrade(true)}
                className="btn bg-gradient-to-r from-primary-500 to-yellow-500 text-white py-1 px-4 text-sm rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Upgrade to Read
              </button>
            ) : (
              <Link 
                to={`/story/${story.id}`}
                onClick={handleStoryClick}
                className="btn btn-primary py-1 px-4 text-sm"
              >
                Start Reading
              </Link>
            )}
          </div>
        </div>
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <PremiumUpgrade onClose={() => setShowUpgrade(false)} />
        </div>
      )}
    </>
  );
};

export default StoryCard; 