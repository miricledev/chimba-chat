import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesRes, progressRes, userRes] = await Promise.all([
          axios.get(`${API_URL}/stories`),
          axios.get(`${API_URL}/stories/progress`),
          axios.get(`${API_URL}/auth/me`)
        ]);
        setStories(storiesRes.data);
        setUserProgress(progressRes.data);
        setUser(userRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProgressForStory = (storyId) => {
    const progress = userProgress.find(p => p.storyId === storyId);
    if (!progress) {
      return {
        completed: false,
        xpEarned: 0,
        correctAnswers: 0,
        totalQuestions: 0
      };
    }
    return {
      completed: progress.completed,
      xpEarned: progress.xpEarned,
      correctAnswers: progress.correctAnswers,
      totalQuestions: progress.totalQuestions
    };
  };

  const handleStartStory = (storyId) => {
    // Navigate to the story view
    window.location.href = `/story/${storyId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-dark-100">Please log in to view your dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-dark-900 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-dark-900">{user.username[0].toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-dark-300 truncate">Welcome back</dt>
                      <dd className="text-lg font-medium text-dark-100">{user.username}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-900 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-dark-900">XP</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-dark-300 truncate">Total XP</dt>
                      <dd className="text-lg font-medium text-dark-100">{user.xp}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-900 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-dark-900">L</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-dark-300 truncate">Level</dt>
                      <dd className="text-lg font-medium text-dark-100">{Math.floor(user.xp / 1000) + 1}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-dark-100 mb-4">Your Stories</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => {
                const progress = getProgressForStory(story.id);
                const progressPercentage = progress.totalQuestions > 0
                  ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
                  : 0;

                return (
                  <div key={story.id} className="bg-dark-900 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-dark-100">{story.title}</h3>
                      <p className="mt-2 text-sm text-dark-300">{story.description}</p>
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary-500">Level {story.level}</span>
                          <span className="text-sm text-dark-300">
                            {progressPercentage}% Complete
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="h-2 bg-dark-800 rounded-full">
                            <div
                              className="h-2 bg-primary-500 rounded-full"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => handleStartStory(story.id)}
                          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-dark-900 bg-primary-500 hover:bg-primary-600"
                        >
                          {progress.completed ? 'Review' : 'Continue'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 