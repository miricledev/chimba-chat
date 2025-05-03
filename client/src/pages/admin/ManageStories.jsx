import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import { FaCrown, FaEdit, FaTrash } from 'react-icons/fa';

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_URL}/stories`);
      setStories(response.data);
    } catch (error) {
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const togglePremium = async (storyId, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/admin/stories/${storyId}`, {
        isPremium: !currentStatus
      });
      
      setStories(stories.map(story => {
        if (story.id === storyId) {
          return { ...story, isPremium: !currentStatus };
        }
        return story;
      }));
      
      toast.success(`Story ${currentStatus ? 'removed from' : 'set to'} premium`);
    } catch (error) {
      toast.error('Failed to update story status');
    }
  };

  const deleteStory = async (storyId) => {
    if (!window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/admin/stories/${storyId}`);
      setStories(stories.filter(story => story.id !== storyId));
      toast.success('Story deleted successfully');
    } catch (error) {
      toast.error('Failed to delete story');
    }
  };

  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff0037]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark-100">Manage Stories</h1>
          <Link
            to="/admin/stories/create"
            className="px-4 py-2 bg-[#ff0037] text-white rounded-lg hover:bg-opacity-90"
          >
            Create New Story
          </Link>
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
          />
        </div>

        <div className="bg-dark-900 rounded-lg shadow-lg overflow-hidden border border-dark-800">
          <div className="grid grid-cols-12 gap-4 p-4 bg-dark-800 border-b border-dark-700">
            <div className="col-span-4 text-dark-300 font-medium">Title</div>
            <div className="col-span-2 text-dark-300 font-medium">Level</div>
            <div className="col-span-2 text-dark-300 font-medium text-right">Messages</div>
            <div className="col-span-2 text-dark-300 font-medium text-right">Total XP</div>
            <div className="col-span-2 text-dark-300 font-medium text-right">Actions</div>
          </div>

          <div className="divide-y divide-dark-800">
            {filteredStories.map(story => (
              <div key={story.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-dark-800">
                <div className="col-span-4 flex items-center space-x-2">
                  <span className="text-dark-100">{story.title}</span>
                  {story.isPremium && <FaCrown className="text-yellow-500" />}
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-1 bg-dark-800 rounded text-dark-100 text-sm">
                    {story.level}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-dark-100">{story.messageCount}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[#ff0037] font-bold">{story.totalXp}</span>
                  <span className="text-dark-300 ml-1">XP</span>
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <Link
                    to={`/admin/stories/edit/${story.id}`}
                    className="p-2 bg-dark-700 text-dark-300 rounded hover:bg-dark-600"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => togglePremium(story.id, story.isPremium)}
                    className={`p-2 rounded ${
                      story.isPremium
                        ? 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                        : 'bg-yellow-500 text-dark-900 hover:bg-yellow-600'
                    }`}
                  >
                    <FaCrown />
                  </button>
                  <button
                    onClick={() => deleteStory(story.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStories; 