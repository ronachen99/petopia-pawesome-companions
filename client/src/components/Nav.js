import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex items-center">
          <li className="mx-2">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </li>
          <li className="mx-2">
            {/* Use button element for Logout */}
            <button
              onClick={() => Auth.logout()}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex items-center">
          <li className="mx-2">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/signup"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Signup
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
      <h1 className="text-lg font-semibold">
        <Link
          to="/"
          className="text-gray-800 hover:text-gray-900 transition-colors duration-300"
        >
          <span role="img" aria-label="shopping bag" className="mr-2"></span>
          Pet's Dashboard
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
