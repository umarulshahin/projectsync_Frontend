import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/'); // Change '/' to your desired home route
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-300">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Something Went Wrong</h1>
      <p className="text-lg text-gray-700 mb-8">
        We're sorry, but something unexpected happened. Please try again later.
      </p>
      <button
        onClick={redirectToHome}
        className="px-6 py-3 border-0  text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
