import React from "react";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.getUser || {};
  console.log(userData);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-wrap justify-center">
        {data.user.pets.map((pet) => (
          <div
            key={pet._id}
            className="m-2 w-full max-w-sm bg-white border rounded-lg"
          >
            <div className="flex flex-col items-center pt-6 pb-4">
              <img
                className="w-24 h-24 mt-2 mb-1 rounded-full shadow-lg"
                src={pet.species.image}
                alt={pet.species.alt}
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900">
                {pet.name}
              </h3>
              <h4 className="text-sm text-gray-500">
                {pet.species.speciesType}
              </h4>
              {pet.species.needs.map((need) => (
                <p key={need._id} className="mt-2">
                  {need.needType}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
