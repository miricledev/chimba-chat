import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';

const Settings = () => {
  const [settings, setSettings] = useState({
    premiumPrice: '',
    xpThresholds: {
      beginner: 0,
      intermediate: 1000,
      advanced: 5000
    },
    dailyXpGoal: 100,
    maxStoriesPerDay: 5
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/settings`);
      setSettings(response.data);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: parseInt(value)
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: name === 'premiumPrice' ? parseFloat(value) : parseInt(value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/admin/settings`, settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff0037]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Admin Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-dark-900 p-6 rounded-lg border border-dark-800">
            <h2 className="text-xl font-semibold text-dark-100 mb-6">Premium Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-dark-100 mb-2">Premium Price (USD)</label>
                <input
                  type="number"
                  name="premiumPrice"
                  value={settings.premiumPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                />
              </div>
            </div>
          </div>

          <div className="bg-dark-900 p-6 rounded-lg border border-dark-800">
            <h2 className="text-xl font-semibold text-dark-100 mb-6">XP Thresholds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-dark-100 mb-2">Beginner Level (XP)</label>
                <input
                  type="number"
                  name="xpThresholds.beginner"
                  value={settings.xpThresholds.beginner}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                />
              </div>
              <div>
                <label className="block text-dark-100 mb-2">Intermediate Level (XP)</label>
                <input
                  type="number"
                  name="xpThresholds.intermediate"
                  value={settings.xpThresholds.intermediate}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                />
              </div>
              <div>
                <label className="block text-dark-100 mb-2">Advanced Level (XP)</label>
                <input
                  type="number"
                  name="xpThresholds.advanced"
                  value={settings.xpThresholds.advanced}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                />
              </div>
            </div>
          </div>

          <div className="bg-dark-900 p-6 rounded-lg border border-dark-800">
            <h2 className="text-xl font-semibold text-dark-100 mb-6">Daily Goals</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-dark-100 mb-2">Daily XP Goal</label>
                <input
                  type="number"
                  name="dailyXpGoal"
                  value={settings.dailyXpGoal}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                />
              </div>
              <div>
                <label className="block text-dark-100 mb-2">Max Stories Per Day</label>
                <input
                  type="number"
                  name="maxStoriesPerDay"
                  value={settings.maxStoriesPerDay}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-[#ff0037]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#ff0037] text-white rounded-lg hover:bg-opacity-90 font-medium"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 