import React from 'react';
import Dashboard from './Dashboard';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const Home = () => {
  return (
    <div>
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

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Your content here */}
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
              <h1 className="text-3xl font-bold mb-4">
                PETOPIA: Pawesome Companions
              </h1>
              <p className="text-lg text-gray-600">
                Virtual Pet adoption game.
              </p>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center text-gray-400">
              <span>&copy; 2023 Your Website. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
