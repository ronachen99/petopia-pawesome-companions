import React from "react";

// short introduction in the landing page
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
            <h1 className="text-3xl text-black mb-4">Welcome to Petopia</h1>
            <div className="flex  justify-center ">
              <img
                src="./images/dittodance.gif"
                alt="ditto dancing"
                className="h-32"
              ></img>
            </div>
            <p className="text-lg text-zinc-600">
              Pawesome Companions, a Virtual Pet and Care Application. Start
              dancing with Ditto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
