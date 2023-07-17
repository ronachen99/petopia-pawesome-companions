// import necessary dependencies
import React, { useState } from "react";
// for retrieving user data
import { QUERY_USER } from "../utils/queries";
// to use mutation and query
import { useQuery, useMutation } from "@apollo/client";
// for deleting and updating pet data
import { DELETE_PET, UPDATE_PET } from "../utils/mutations";
// authentication
import Auth from "../utils/auth";
// icons
import { PiPawPrintThin, PiPencilThin } from "react-icons/pi";

// functional componenet
const Dashboard = () => {
  // hooks used to fetach data and perform mutation
  // the QUERY_USER query is executed using the hook and the result is destrucuteed into loading and data
  const { loading, data } = useQuery(QUERY_USER);
  // the DELETE_PET and UPDATE_PET mutations are executed using this hook and the functions are destrucuted to deletePet and updatePet
  const [deletePet] = useMutation(DELETE_PET);
  const [updatePet] = useMutation(UPDATE_PET);
  // use optioanl chaining to hnadle cases where data is undefined
  const userData = data?.getUser || {};
  console.log(userData);

  // use state hook to modify the state of editingPetId and updatedPetName
  const [editingPetId, setEditingPetId] = useState(null);
  const [updatedPetName, setUpdatedPetName] = useState("");

  // handles the deletion of the peet, taking in the petId and userId and calls the deletePet mutation function
  const handleDeletePet = async (petId, userId) => {
    console.log(petId, userId);
    // first check if logged in or not
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

  // function is triggered when the user clicks on the pencil icon, taking the petId, and it then sets the updatedPetName state to the current name
  const handleStartEditing = (petId) => {
    // look for the pet id in the data obj
    const pet = data.user.pets.find((pet) => pet._id === petId);
    // if id is found then send the id to the setEditingPetId and pass the current name to the setUpdatedPetName (i.e. state hooks)
    if (pet) {
      setEditingPetId(petId);
      setUpdatedPetName(pet.name);
    }
  };

  // handles the updating of the pets name once the user finishes editing by losing out of focus (i.e., blurring the input field)
  const handleUpdatePetName = async () => {
    // check for whitespace and empty
    if (!updatedPetName.trim()) {
      return;
    }

    // calls the updatePet mutation, passing in the statehook values
    try {
      await updatePet({
        variables: { petId: editingPetId, name: updatedPetName },
      });
      // reset the id state to null
      setEditingPetId(null);
    } catch (error) {
      console.error(error);
    }
  };

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
                src={pet.speciesId.image}
                alt={pet.speciesId.alt}
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
                  {pet.speciesId.speciesType}
                </h4>
              </div>
              {pet.speciesId.needs.map((need) => (
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