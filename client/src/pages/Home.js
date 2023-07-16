import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Petopia 🐈</h1>
            <p className="text-lg text-gray-600">
              Petopia: Pawesome Companions, a Virtual Pet and Care Application
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
