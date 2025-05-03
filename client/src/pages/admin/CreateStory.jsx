import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';

const CreateStory = () => {
  const [story, setStory] = useState({
    title: '',
    description: '',
    level: 'beginner',
    tags: '',
    imageUrl: '',
    isPremium: false
  });

  const [messages, setMessages] = useState([{
    text: '',
    translations: {},
    order: 0,
    quizType: '',
    quizQuestion: '',
    quizAnswer: '',
    xpValue: 10
  }]);

  const handleStoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStory(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMessageChange = (index, field, value) => {
    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[index] = {
        ...newMessages[index],
        [field]: value
      };
      return newMessages;
    });
  };

  const handleTranslationChange = (messageIndex, word, translation) => {
    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        translations: {
          ...newMessages[messageIndex].translations,
          [word]: translation
        }
      };
      return newMessages;
    });
  };

  const addMessage = () => {
    setMessages(prev => [...prev, {
      text: '',
      translations: {},
      order: prev.length,
      quizType: '',
      quizQuestion: '',
      quizAnswer: '',
      xpValue: 10
    }]);
  };

  const removeMessage = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedTags = story.tags.split(',').map(tag => tag.trim());
      const storyData = {
        ...story,
        tags: formattedTags,
        messages: messages.map((msg, index) => ({
          ...msg,
          order: index
        }))
      };

      await axios.post(`${API_URL}/stories`, storyData);
      toast.success('Story created successfully!');
      
      // Reset form
      setStory({
        title: '',
        description: '',
        level: 'beginner',
        tags: '',
        imageUrl: '',
        isPremium: false
      });
      setMessages([{
        text: '',
        translations: {},
        order: 0,
        quizType: '',
        quizQuestion: '',
        quizAnswer: '',
        xpValue: 10
      }]);
    } catch (error) {
      console.error('Error creating story:', error);
      toast.error('Failed to create story');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Create New Story</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-dark-900 p-6 rounded-lg border border-dark-800">
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Story Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-dark-100 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={story.title}
                  onChange={handleStoryChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                  required
                />
              </div>

              <div>
                <label className="block text-dark-100 mb-2">Description</label>
                <textarea
                  name="description"
                  value={story.description}
                  onChange={handleStoryChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-dark-100 mb-2">Level</label>
                <select
                  name="level"
                  value={story.level}
                  onChange={handleStoryChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-100 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={story.tags}
                  onChange={handleStoryChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                  placeholder="horror, mystery, etc."
                />
              </div>

              <div>
                <label className="block text-dark-100 mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={story.imageUrl}
                  onChange={handleStoryChange}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPremium"
                  checked={story.isPremium}
                  onChange={handleStoryChange}
                  className="h-4 w-4 text-[#ff0037] bg-dark-800 border-dark-700 rounded focus:ring-[#ff0037]"
                />
                <label className="ml-2 text-dark-100">Premium Content</label>
              </div>
            </div>
          </div>

          <div className="bg-dark-900 p-6 rounded-lg border border-dark-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-dark-100">Messages</h2>
              <button
                type="button"
                onClick={addMessage}
                className="px-4 py-2 bg-[#ff0037] text-white rounded-lg hover:bg-opacity-90"
              >
                Add Message
              </button>
            </div>

            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className="p-4 bg-dark-800 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-dark-100">Message {index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeMessage(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-dark-100 mb-2">Text</label>
                      <textarea
                        value={message.text}
                        onChange={(e) => handleMessageChange(index, 'text', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                        rows="2"
                      />
                    </div>

                    <div>
                      <label className="block text-dark-100 mb-2">Quiz Type</label>
                      <select
                        value={message.quizType}
                        onChange={(e) => handleMessageChange(index, 'quizType', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                      >
                        <option value="">No Quiz</option>
                        <option value="fill_in_blank">Fill in the Blank</option>
                      </select>
                    </div>

                    {message.quizType && (
                      <>
                        <div>
                          <label className="block text-dark-100 mb-2">Quiz Question</label>
                          <input
                            type="text"
                            value={message.quizQuestion}
                            onChange={(e) => handleMessageChange(index, 'quizQuestion', e.target.value)}
                            className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                          />
                        </div>

                        <div>
                          <label className="block text-dark-100 mb-2">Quiz Answer</label>
                          <input
                            type="text"
                            value={message.quizAnswer}
                            onChange={(e) => handleMessageChange(index, 'quizAnswer', e.target.value)}
                            className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                          />
                        </div>

                        <div>
                          <label className="block text-dark-100 mb-2">XP Value</label>
                          <input
                            type="number"
                            value={message.xpValue}
                            onChange={(e) => handleMessageChange(index, 'xpValue', parseInt(e.target.value))}
                            className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                            min="0"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-dark-100 mb-2">Translations</label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Spanish word"
                          className="px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value && e.target.nextElementSibling.value) {
                              handleTranslationChange(
                                index,
                                e.target.value.toLowerCase(),
                                e.target.nextElementSibling.value
                              );
                              e.target.value = '';
                              e.target.nextElementSibling.value = '';
                            }
                          }}
                        />
                        <input
                          type="text"
                          placeholder="English translation"
                          className="px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value && e.target.previousElementSibling.value) {
                              handleTranslationChange(
                                index,
                                e.target.previousElementSibling.value.toLowerCase(),
                                e.target.value
                              );
                              e.target.value = '';
                              e.target.previousElementSibling.value = '';
                            }
                          }}
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(message.translations).map(([word, translation]) => (
                          <div
                            key={word}
                            className="px-2 py-1 bg-dark-700 rounded-lg text-sm text-dark-100 flex items-center"
                          >
                            <span>{word} → {translation}</span>
                            <button
                              type="button"
                              className="ml-2 text-red-500 hover:text-red-600"
                              onClick={() => {
                                const newTranslations = { ...message.translations };
                                delete newTranslations[word];
                                handleMessageChange(index, 'translations', newTranslations);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#ff0037] text-white rounded-lg hover:bg-opacity-90 font-medium"
            >
              Create Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStory; 