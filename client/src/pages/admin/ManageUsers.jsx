import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import { FaCrown } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`);
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const togglePremium = async (userId, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/admin/users/${userId}`, {
        isPremium: !currentStatus
      });
      
      setUsers(users.map(user => {
        if (user.id === userId) {
          return { ...user, isPremium: !currentStatus };
        }
        return user;
      }));
      
      toast.success(`User ${currentStatus ? 'removed from' : 'upgraded to'} premium`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Manage Users</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
          />
        </div>

        <div className="bg-dark-900 rounded-lg shadow-lg overflow-hidden border border-dark-800">
          <div className="grid grid-cols-12 gap-4 p-4 bg-dark-800 border-b border-dark-700">
            <div className="col-span-3 text-dark-300 font-medium">Username</div>
            <div className="col-span-4 text-dark-300 font-medium">Email</div>
            <div className="col-span-2 text-dark-300 font-medium text-right">XP</div>
            <div className="col-span-3 text-dark-300 font-medium text-right">Actions</div>
          </div>

          <div className="divide-y divide-dark-800">
            {filteredUsers.map(user => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-dark-800">
                <div className="col-span-3 flex items-center space-x-2">
                  <span className="text-dark-100">{user.username}</span>
                  {user.isPremium && <FaCrown className="text-yellow-500" />}
                </div>
                <div className="col-span-4 text-dark-300">{user.email}</div>
                <div className="col-span-2 text-right">
                  <span className="text-[#ff0037] font-bold">{user.xp?.toLocaleString() || '0'}</span>
                  <span className="text-dark-300 ml-1">XP</span>
                </div>
                <div className="col-span-3 flex justify-end space-x-2">
                  <button
                    onClick={() => togglePremium(user.id, user.isPremium)}
                    className={`px-3 py-1 rounded ${
                      user.isPremium
                        ? 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                        : 'bg-yellow-500 text-dark-900 hover:bg-yellow-600'
                    }`}
                  >
                    {user.isPremium ? 'Remove Premium' : 'Make Premium'}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
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

export default ManageUsers; 