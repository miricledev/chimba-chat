import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStories: 0,
    totalQuizzes: 0,
    totalXP: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, storiesRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/stories')
        ]);

        // Calculate stats
        const totalUsers = usersRes.data.length;
        const totalStories = storiesRes.data.length;
        const totalQuizzes = storiesRes.data.reduce((acc, story) => 
          acc + story.messageCount, 0
        );
        const totalXP = usersRes.data.reduce((acc, user) => 
          acc + user.xp, 0
        );

        setStats({
          totalUsers,
          totalStories,
          totalQuizzes,
          totalXP
        });

        // Get recent users (last 5)
        setRecentUsers(usersRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
        );
      } catch (error) {
        toast.error('Failed to load admin dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your application and view statistics
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/stories/create"
            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-900">Create Story</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a new story with messages and quizzes
            </p>
          </Link>
          <Link
            to="/admin/users"
            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-900">Manage Users</h3>
            <p className="mt-1 text-sm text-gray-500">
              View and manage user accounts
            </p>
          </Link>
          <Link
            to="/admin/stories"
            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-900">Manage Stories</h3>
            <p className="mt-1 text-sm text-gray-500">
              Edit or delete existing stories
            </p>
          </Link>
          <Link
            to="/admin/settings"
            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
          >
            <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configure application settings
            </p>
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Stories</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.totalStories}
            </p>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Quizzes</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.totalQuizzes}
            </p>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Total XP</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.totalXP.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    XP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.xp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 