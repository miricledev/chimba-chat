import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminStoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState({
    title: '',
    description: '',
    level: 'beginner',
    tags: [],
    imageUrl: '',
    isPremium: false
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const [storyRes, messagesRes] = await Promise.all([
          axios.get(`/api/admin/stories/${id}`),
          axios.get(`/api/admin/stories/${id}/messages`)
        ]);

        setStory(storyRes.data);
        setMessages(messagesRes.data);
      } catch (error) {
        toast.error('Failed to load story');
        navigate('/admin/stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, navigate]);

  const handleStoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStory(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMessageChange = (index, e) => {
    const { name, value } = e.target;
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, [name]: value } : msg
    ));
  };

  const addMessage = () => {
    setMessages(prev => [...prev, {
      text: '',
      order: prev.length,
      quizType: 'none',
      quizQuestion: '',
      options: '[]',
      correctOption: '',
      xpValue: 5,
      translations: '{}'
    }]);
  };

  const removeMessage = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update story
      await axios.put(`/api/admin/stories/${id}`, story);

      // Update messages
      await Promise.all(messages.map(message => {
        if (message.id) {
          return axios.put(`/api/admin/stories/${id}/messages/${message.id}`, message);
        } else {
          return axios.post(`/api/admin/stories/${id}/messages`, message);
        }
      }));

      toast.success('Story updated successfully');
      navigate('/admin/stories');
    } catch (error) {
      toast.error('Failed to update story');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Story</h1>
          <p className="mt-2 text-sm text-gray-600">
            Modify story details and messages
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Story Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Story Details</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={story.title}
                  onChange={handleStoryChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <select
                  name="level"
                  id="level"
                  required
                  value={story.level}
                  onChange={handleStoryChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  required
                  value={story.description}
                  onChange={handleStoryChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  value={story.imageUrl}
                  onChange={handleStoryChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPremium"
                    id="isPremium"
                    checked={story.isPremium}
                    onChange={handleStoryChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-900">
                    Premium Story
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Messages</h2>
              <button
                type="button"
                onClick={addMessage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Message
              </button>
            </div>

            {messages.map((message, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium text-gray-900">Message {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeMessage(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor={`text-${index}`} className="block text-sm font-medium text-gray-700">
                      Text
                    </label>
                    <textarea
                      name="text"
                      id={`text-${index}`}
                      required
                      value={message.text}
                      onChange={(e) => handleMessageChange(index, e)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor={`quizType-${index}`} className="block text-sm font-medium text-gray-700">
                      Quiz Type
                    </label>
                    <select
                      name="quizType"
                      id={`quizType-${index}`}
                      value={message.quizType}
                      onChange={(e) => handleMessageChange(index, e)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="none">No Quiz</option>
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="fill-blank">Fill in the Blank</option>
                      <option value="word-match">Word Match</option>
                    </select>
                  </div>

                  {message.quizType !== 'none' && (
                    <>
                      <div>
                        <label htmlFor={`quizQuestion-${index}`} className="block text-sm font-medium text-gray-700">
                          Question
                        </label>
                        <input
                          type="text"
                          name="quizQuestion"
                          id={`quizQuestion-${index}`}
                          required
                          value={message.quizQuestion}
                          onChange={(e) => handleMessageChange(index, e)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor={`options-${index}`} className="block text-sm font-medium text-gray-700">
                          Options (JSON array)
                        </label>
                        <input
                          type="text"
                          name="options"
                          id={`options-${index}`}
                          required
                          value={message.options}
                          onChange={(e) => handleMessageChange(index, e)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor={`correctOption-${index}`} className="block text-sm font-medium text-gray-700">
                          Correct Option
                        </label>
                        <input
                          type="text"
                          name="correctOption"
                          id={`correctOption-${index}`}
                          required
                          value={message.correctOption}
                          onChange={(e) => handleMessageChange(index, e)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor={`xpValue-${index}`} className="block text-sm font-medium text-gray-700">
                          XP Value
                        </label>
                        <input
                          type="number"
                          name="xpValue"
                          id={`xpValue-${index}`}
                          required
                          min="1"
                          value={message.xpValue}
                          onChange={(e) => handleMessageChange(index, e)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor={`translations-${index}`} className="block text-sm font-medium text-gray-700">
                      Translations (JSON object)
                    </label>
                    <input
                      type="text"
                      name="translations"
                      id={`translations-${index}`}
                      value={message.translations}
                      onChange={(e) => handleMessageChange(index, e)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/stories')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminStoryEdit; 