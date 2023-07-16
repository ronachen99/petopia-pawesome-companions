import React, { useState } from "react";

const Modal = ({ petName, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 h-96">
        <h2 className="text-2xl mb-4">Modal Title</h2>
        <p>Pet Name: {petName}</p>
        <div className="flex justify-end mt-8">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4"
            onClick={closeModal}
          >
            Close
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Adopt
          </button>
        </div>
      </div>
    </div>
  );
};

const Adoption = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState("");

  const openModal = (petName) => {
    setSelectedPet(petName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPet("");
    setModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="flex-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Pet image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Andrew P
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Owner
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => openModal("Pet 1")}
              >
                Pet 1
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Pet image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Andrew P
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Owner
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => openModal("Pet 1")}
              >
                Pet 2
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Pet image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Andrew P
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Owner
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => openModal("Pet 1")}
              >
                Pet 3
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Pet image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Andrew P
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Owner
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => openModal("Pet 1")}
              >
                Pet 4
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="Pet image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Andrew P
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Owner
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => openModal("Pet 1")}
              >
                Pet 5
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <Modal petName={selectedPet} closeModal={closeModal} />}
    </div>
  );
};

export default Adoption;
