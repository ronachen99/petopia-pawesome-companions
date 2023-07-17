import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_SPECIES } from "../utils/queries";
import { ADD_PET } from "../utils/mutations";
import { PiArrowFatLinesLeftDuotone } from "react-icons/pi";

const Modal = ({ pet, closeModal, handleAdopt }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 h-96">
        <h2 className="text-2xl mb-4">Adopt {pet.species.speciesType}</h2>
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={pet.species.image}
          alt={pet.species.alt}
        />
        <p>Species: {pet.species.speciesType}</p>
        <p>Description: {pet.species.description}</p>

        <div className="flex justify-end mt-8">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {species.speciesType}
              </h5>
              <p>{species.description}</p>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
