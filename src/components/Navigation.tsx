import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              DonoBank
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/donations" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 