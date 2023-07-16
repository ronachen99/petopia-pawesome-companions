import React, { useState } from "react";
import { QUERY_USER } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_PET, UPDATE_PET } from "../utils/mutations";
import Auth from "../utils/auth";
import { PiPawPrintThin, PiPencilThin } from "react-icons/pi";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const [deletePet] = useMutation(DELETE_PET);
  const [updatePet] = useMutation(UPDATE_PET);
  const userData = data?.getUser || {};

  const [editingPetId, setEditingPetId] = useState(null);
  const [updatedPetName, setUpdatedPetName] = useState("");

  console.log(userData);

  const handleDeletePet = async (petId, userId) => {
    console.log(petId, userId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deletePet({ variables: { petId, userId } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEditing = (petId) => {
    const pet = data.user.pets.find((pet) => pet._id === petId);
    if (pet) {
      setEditingPetId(petId);
      setUpdatedPetName(pet.name);
    }
  };

  const handleUpdatePetName = async () => {
    if (!updatedPetName.trim()) {
      return;
    }

    try {
      await updatePet({
        variables: { petId: editingPetId, name: updatedPetName },
      });
      setEditingPetId(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log(data);
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
              <div className="flex items-center">
                <h3 className="mb-1 text-xl font-medium text-gray-900">
                  {editingPetId === pet._id ? (
                    <input
                      type="text"
                      value={updatedPetName}
                      onChange={(e) => setUpdatedPetName(e.target.value)}
                      onBlur={handleUpdatePetName}
                    />
                  ) : (
                    <>
                      <div className="flex flex-row">
                        {pet.name}
                        <span
                          onClick={() => handleStartEditing(pet._id)}
                          className="ml-2 cursor-pointer"
                        >
                          <PiPencilThin />
                        </span>
                      </div>
                    </>
                  )}
                </h3>
              </div>
              <div className="flex flex-row">
                <PiPawPrintThin />

                <h4 className="text-sm text-gray-500 uppercase">
                  {pet.species.speciesType}
                </h4>
              </div>
              {pet.species.needs.map((need) => (
                <p key={need._id} className="mt-2">
                  {need.needType}
                </p>
              ))}
              <button
                onClick={() => handleDeletePet(pet._id, data.user._id)}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
