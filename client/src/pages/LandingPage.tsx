import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedParagraph from '../components/core/AnimatedParagraph';

const paragraphs = [
    "The nothing app",
    "True frens only",
    "Hello world?",
    "The slop app"
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-3">Tomodachi</h1>
      <AnimatedParagraph paragraphs={paragraphs} />
      <div className="space-x-4">
        <Link
          to="/auth/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;