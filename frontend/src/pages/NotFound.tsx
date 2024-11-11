import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className='bg-gradient-to-br from-pink-400 via-pink-500 to-pink-800 active:bg-pink-700 text-transparent bg-clip-text text-9xl pb-4'>404</h1>
      <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a href="/" className="px-6 py-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 active:bg-pink-700 shadow-xl shadow-pink-500/60 rounded-lg font-semibold">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;