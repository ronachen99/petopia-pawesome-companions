import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_SPECIES } from "../utils/queries";
import { ADD_PET } from "../utils/mutations";
import { PiArrowFatLinesLeftDuotone } from "react-icons/pi";

const Modal = ({ pet, closeModal, handleAdopt }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-400 rounded-lg p-8 w-6/12">
        <h2 className="text-2xl mb-4 font-semibold">
          Adopt {pet.species.speciesType}
        </h2>
        <div className="flex justify-center mb-3">
          <img
            className="flex justify-center mb-3 w-64 h-4/6"
            src={pet.species.image}
            alt={pet.species.alt}
          />
        </div>
        <p className="mb-2">
          <span className="font-semibold">Species:</span>{" "}
          {pet.species.speciesType}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {pet.species.description}
        </p>
        {pet.species.needs.map((need) => (
          <p key={need._id} className="mt-2">
            <span className="font-semibold">{need.needType}:</span>{" "}
            {need.description}
          </p>
        ))}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded mr-4"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => handleAdopt(pet.species._id)}
          >
            Adopt
          </button>
        </div>
      </div>
    </div>
  );
};

const Adoption = () => {
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading: speciesLoading, data: speciesData } =
    useQuery(QUERY_SPECIES);
  const [addPet] = useMutation(ADD_PET);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const user = userData?.user;

  const handleAdopt = async (speciesID, gender, name, age) => {
    try {
      console.log(handleAdopt);
      await addPet({ variables: { speciesID, gender, name, age } });
      console.log("pet Added!");
      setSuccessMessage((_prevMessage) => "Congratulations on your new pet!");
      closeModal();
      console.log("EVERYTHING ENDED");
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (pet) => {
    setSelectedPet((prevPet) => pet);
    setModalOpen((prevStatus) => true);
  };

  const closeModal = () => {
    setSelectedPet((prevPet) => null);
    setModalOpen((prevStatus) => false);
  };

  if (userLoading || speciesLoading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-wrap justify-center">
        {speciesData.species.map((species) => (
          <div
            className="m-2 w-full max-w-sm bg-white border rounded-lg"
            key={species._id}
          >
            <div className="flex flex-col items-center pt-6 pb-4">
              <img
                className="w-24 h-24 mt-2 mb-1 rounded-full shadow-lg"
                src={species.image}
                alt={species.alt}
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900">
                {species.speciesType}
              </h3>
              <h4 className="text-sm text-gray-500 uppercase">
                {species.description}
              </h4>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <button
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-4"
                  onClick={() => openModal({ species })}
                >
                  Adopt
                </button>
              </div>
            </div>
          </div>
        ))}

        {modalOpen && (
          <Modal
            pet={selectedPet}
            closeModal={closeModal}
            handleAdopt={handleAdopt}
          />
        )}

        {successMessage && (
          <div className="mt-4 text-green-500">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Adoption;
