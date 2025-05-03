import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-dark-900 rounded-lg shadow-lg border border-dark-800">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-primary-500">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-dark-100">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-dark-300">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="w-full flex justify-center py-2 px-4 border border-dark-700 rounded-md shadow-sm text-sm font-medium text-dark-100 bg-dark-800 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 