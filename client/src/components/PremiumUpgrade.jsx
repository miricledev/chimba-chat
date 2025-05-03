import React from 'react';
import { FaCrown, FaStar, FaLock, FaCheck } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { API_URL } from '../config';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PremiumUpgrade = ({ onClose }) => {
  const { user } = useAuth();

  const handleUpgrade = async () => {
    try {
      const stripe = await stripePromise;
      
      // Create a checkout session with auth token
      const response = await axios.post(
        `${API_URL}/create-checkout-session`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
      );
      
      const { id: sessionId } = response.data;
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId
      });
      
      if (result.error) {
        toast.error('Payment failed. Please try again.');
        console.error('Stripe redirect error:', result.error);
      }
    } catch (error) {
      toast.error('Failed to start checkout process');
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="bg-dark-900 rounded-xl p-8 max-w-md w-full mx-auto shadow-2xl border border-primary-500">
      <div className="flex items-center justify-center mb-6">
        <FaCrown className="text-yellow-500 text-4xl" />
        <h2 className="text-2xl font-bold text-white ml-3">Upgrade to Premium</h2>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <FaCheck className="text-primary-500 mt-1 mr-3" />
          <p className="text-dark-100">Access to all premium stories and exclusive content</p>
        </div>
        <div className="flex items-start">
          <FaCheck className="text-primary-500 mt-1 mr-3" />
          <p className="text-dark-100">Advanced vocabulary and grammar exercises</p>
        </div>
        <div className="flex items-start">
          <FaCheck className="text-primary-500 mt-1 mr-3" />
          <p className="text-dark-100">Priority access to new stories and features</p>
        </div>
        <div className="flex items-start">
          <FaCheck className="text-primary-500 mt-1 mr-3" />
          <p className="text-dark-100">Ad-free experience</p>
        </div>
      </div>

      <button
        onClick={handleUpgrade}
        className="w-full py-4 bg-gradient-to-r from-primary-500 to-yellow-500 text-white rounded-lg font-bold text-lg relative overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
      >
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full transition-transform hover:translate-x-0"></div>
        <span className="relative flex items-center justify-center">
          <FaStar className="mr-2" /> Upgrade Now
        </span>
      </button>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-dark-300 hover:text-dark-100 transition-colors"
        >
          Maybe Later
        </button>
      )}
    </div>
  );
};

export default PremiumUpgrade; 