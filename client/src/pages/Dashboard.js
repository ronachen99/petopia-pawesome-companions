import React from "react";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

const Dashboard = () => {
  const { loading, data } = useQuery;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 ">
        <div className="w-full max-w-sm bg-white border rounded-lg">
          <div className="flex flex-col items-center pt-6 pb-4">
            <img
              className="w-24 h-24 mt-2 mb-1 rounded-full shadow-lg"
              src="./images/cat.png"
              alt="Pet image"
            />
            <h3 className="mb-1 text-xl font-medium text-gray-900">name</h3>
            <h4 className="text-sm text-gray-500">species</h4>
            <p className="mt-2">need 1</p>
            <p>need 2</p>
            <p>need 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
