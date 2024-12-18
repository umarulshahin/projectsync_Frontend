import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(-1); // Change '/' to your desired home route
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-200/80">
      <h1 className="md:text-4xl font-bold text-red-500 mb-4">Something Went Wrong</h1>
      <p className="md:text-lg text-gray-700 mb-8 text-center">
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
