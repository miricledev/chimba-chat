import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrophy, FaMedal, FaCrown } from 'react-icons/fa';
import { API_URL } from '../config';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const [leaderboardRes, userRankRes] = await Promise.all([
          axios.get(`${API_URL}/leaderboard`),
          axios.get(`${API_URL}/leaderboard/my-rank`)
        ]);
        setLeaderboard(leaderboardRes.data);
        setUserRank(userRankRes.data);
      } catch (error) {
        toast.error('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff0037]"></div>
      </div>
    );
  }

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <FaTrophy className="text-yellow-500 text-2xl" />;
      case 1:
        return <FaMedal className="text-gray-400 text-2xl" />;
      case 2:
        return <FaMedal className="text-amber-700 text-2xl" />;
      default:
        return <span className="text-dark-100 font-bold text-xl">{index + 1}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-dark-100 text-center mb-8">Tabla de Clasificación</h1>
        
        {userRank && (
          <div className="mb-8 bg-dark-900 shadow-lg rounded-lg p-6 border border-dark-800">
            <h2 className="text-2xl font-bold text-dark-100 mb-6">Tu Progreso</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center p-4 bg-dark-800 rounded-lg">
                <p className="text-sm text-dark-300 mb-2">Tu Posición</p>
                <div className="flex items-center justify-center space-x-2">
                  <FaTrophy className="text-[#ff0037] text-xl" />
                  <p className="text-3xl font-bold text-dark-100">#{userRank.rank}</p>
                </div>
              </div>
              <div className="text-center p-4 bg-dark-800 rounded-lg">
                <p className="text-sm text-dark-300 mb-2">Percentil</p>
                <p className="text-3xl font-bold text-dark-100">{userRank.percentile}<span className="text-[#ff0037]">%</span></p>
              </div>
              <div className="text-center p-4 bg-dark-800 rounded-lg">
                <p className="text-sm text-dark-300 mb-2">Total Usuarios</p>
                <p className="text-3xl font-bold text-dark-100">{userRank.totalUsers?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-dark-900 shadow-lg rounded-lg overflow-hidden border border-dark-800">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-dark-800 bg-dark-800">
            <div className="col-span-1 text-dark-300 font-medium">Rank</div>
            <div className="col-span-5 text-dark-300 font-medium">Usuario</div>
            <div className="col-span-3 text-dark-300 font-medium text-right">XP Total</div>
            <div className="col-span-3 text-dark-300 font-medium text-right">Tier</div>
          </div>
          
          <div className="divide-y divide-dark-800">
            {leaderboard.map((user, index) => (
              <div 
                key={user.id} 
                className={`grid grid-cols-12 gap-4 p-4 items-center ${
                  index === 0 ? 'bg-dark-800 bg-opacity-50' : 'hover:bg-dark-800'
                }`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankIcon(index)}
                </div>
                <div className="col-span-5 flex items-center">
                  <span className="text-dark-100 font-medium">{user.username}</span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-[#ff0037] font-bold">{user.xp?.toLocaleString() || '0'}</span>
                  <span className="text-dark-300 ml-1">XP</span>
                </div>
                <div className="col-span-3 text-right">
                  {user.isPremium ? (
                    <div className="flex items-center justify-end space-x-1">
                      <FaCrown className="text-yellow-500" />
                      <span className="text-yellow-500 font-medium">Premium</span>
                    </div>
                  ) : (
                    <span className="text-dark-300">Free</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;