import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Your content here */}
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to the Home Page
            </h1>
            <p className="text-lg text-gray-600">
              This is your home page content. Customize it as per your needs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
