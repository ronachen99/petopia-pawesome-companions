import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="flex flex-col min-h-screen">
          {/* Navigation Bar */}
          <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex-shrink-0">
                  <span className="text-white text-lg font-bold">Logo</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <button
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Petopia
                    </button>
                    <button
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {' '}
                      <Link to="/Dashboard">Dashboard</Link>
                    </button>
                    <button
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Link to="/Adoption">Adoption</Link>
                    </button>
                    <button
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Link to="/Login">Login</Link>
                    </button>

                    <button
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Link to="/Signup">Signup</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }

  return (
    <header>
      <div className="container mx-auto">{showNavigation()}</div>
    </header>
  );
}

export default Nav;
