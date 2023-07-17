import React from "react";

// short introduction in the landing page
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Petopia</h1>
            <div className="flex  justify-center ">
              <img
                src="./images/dittodance.gif"
                alt="ditto dancing"
                className="h-32"
              ></img>
              <img
                src="./images/dittodanceblue.gif"
                alt="blue ditto dancing"
                className="h-32"
              ></img>
            </div>
            <div className="flex flex-row">
              <p className="text-lg text-gray-600">
                Pawesome Companions, a Virtual Pet and Care Application. Start
                dancing with Ditto.
              </p>
              <img
                src="./images/smallditto.gif"
                alt="small ditto dancing"
                className="h-8"
              ></img>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
