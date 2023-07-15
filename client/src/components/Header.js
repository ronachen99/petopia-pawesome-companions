import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 py-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center text-gray-400">
          <h1 className="text-white text-3xl font-bold uppercase">Petopia</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
