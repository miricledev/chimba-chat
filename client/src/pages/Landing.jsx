import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaArrowRight, FaComments, FaStar, FaTrophy } from 'react-icons/fa';

// Import flag images
import spainFlag from '../assets/flags/spain.png';
import mexicoFlag from '../assets/flags/mexico.png';
import colombiaFlag from '../assets/flags/colombia.png';
import argentinaFlag from '../assets/flags/argentina.png';
import peruFlag from '../assets/flags/peru.png';
import ecuadorFlag from '../assets/flags/ecuador.png';
import venezuelaFlag from '../assets/flags/venezuela.png';
import puertoRicoFlag from '../assets/flags/puerto-rico.png';
import dominicanRepublicFlag from '../assets/flags/dominican-republic.png';

const flags = [
  { name: 'Spain', image: spainFlag },
  { name: 'Mexico', image: mexicoFlag },
  { name: 'Colombia', image: colombiaFlag },
  { name: 'Argentina', image: argentinaFlag },
  { name: 'Peru', image: peruFlag },
  { name: 'Ecuador', image: ecuadorFlag },
  { name: 'Venezuela', image: venezuelaFlag },
  { name: 'Puerto Rico', image: puertoRicoFlag },
  { name: 'Dominican Republic', image: dominicanRepublicFlag }
];

const Landing = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Learn Spanish Through Interactive Conversations
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Master Spanish naturally with our interactive text-message style stories. 
                Read, respond, and learn in a fun, engaging way!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {currentUser ? (
                  <Link to="/dashboard" className="btn bg-white text-indigo-600 hover:bg-indigo-50 flex items-center justify-center">
                    Go to Stories <FaArrowRight className="ml-2" />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn bg-white text-indigo-600 hover:bg-indigo-50 flex items-center justify-center">
                      Try Free <FaArrowRight className="ml-2" />
                    </Link>
                    <Link to="/login" className="btn bg-indigo-700 text-white hover:bg-indigo-800">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flags Section */}
      <div className="bg-dark-950 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark-100 text-center mb-12">
            Learn Spanish from Different Regions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {flags.map((flag, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dark-800 shadow-lg">
                  <img
                    src={flag.image}
                    alt={`${flag.name} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-dark-300 text-center">
                  {flag.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-dark-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaComments className="mx-auto h-12 w-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-bold text-dark-100">Interactive Stories</h3>
              <p className="mt-2 text-dark-300">
                Learn through engaging conversations and real-life scenarios
              </p>
            </div>
            <div className="text-center">
              <FaStar className="mx-auto h-12 w-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-bold text-dark-100">Track Progress</h3>
              <p className="mt-2 text-dark-300">
                Monitor your learning journey with detailed progress tracking
              </p>
            </div>
            <div className="text-center">
              <FaTrophy className="mx-auto h-12 w-12 text-primary-500" />
              <h3 className="mt-4 text-xl font-bold text-dark-100">Earn Rewards</h3>
              <p className="mt-2 text-dark-300">
                Unlock achievements and level up as you learn
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Learning Spanish Today!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are improving their Spanish with our interactive conversation-based approach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link to="/dashboard" className="btn bg-white text-indigo-600 hover:bg-indigo-50 flex items-center justify-center">
                Go to Stories <FaArrowRight className="ml-2" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn bg-white text-indigo-600 hover:bg-indigo-50 flex items-center justify-center">
                  Try Free <FaArrowRight className="ml-2" />
                </Link>
                <Link to="/login" className="btn bg-indigo-800 text-white hover:bg-indigo-900">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 