// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-green-600 text-white p-6 shadow-md flex justify-between items-center">
      <Link to="/" className="text-3xl font-extrabold tracking-wide hover:text-gray-200 transition-colors duration-200">
        FlashLearn
      </Link>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-lg font-medium hover:text-gray-200 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-lg font-medium hover:text-gray-200 transition-colors duration-200">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;