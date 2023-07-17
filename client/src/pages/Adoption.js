import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_SPECIES } from "../utils/queries";
import { ADD_PET } from "../utils/mutations";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const petValidationSchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  Age: Yup.number()
    .required("Age is required")
    .min(0, "Age must be a positive number"),
  Gender: Yup.string().required("Gender is required"),
});

const Modal = ({ pet, closeModal, handleAdopt }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-400 rounded-lg p-8 w-6/12">
        <h2 className="text-2xl mb-4 font-semibold">
          Adopt {pet?.species.speciesType}
        </h2>
        <div className="flex justify-center mb-3">
          <img
            className="flex justify-center mb-3 w-64 h-4/6"
            src={pet?.species.image}
            alt={pet?.species.alt}
          />
        </div>
        <p className="mb-2">
          <span className="font-semibold">Species:</span>{" "}
          {pet?.species.speciesType}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {pet?.species.description}
        </p>
        {pet?.species.needs.map((need) => (
          <p key={need._id} className="mt-2">
            <span className="font-semibold">{need.needType}:</span>{" "}
            {need.description}
          </p>
        ))}
        <div className="flex flex-col items-center justify-center mt-4">
          <Formik
            initialValues={{
              Name: "",
              Age: 0,
              Gender: "",
            }}
            validationSchema={petValidationSchema}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              handleAdopt(pet?.species._id, values);
              closeModal();
            }}
          >
            <Form className="flex flex-col items-center justify-center space-y-4">
              <label htmlFor="Name">Name:</label>
              <Field
                id="Name"
                name="Name"
                className="w-full px-3 py-1 rounded"
              />
              <ErrorMessage
                name="Name"
                component="div"
                className="text-red-700"
              />
              <label htmlFor="Age">Age:</label>
              <Field
                id="Age"
                type="number"
                name="Age"
                min="0"
                className="w-full px-3 py-1 rounded"
              />
              <ErrorMessage
                name="Age"
                component="div"
                className="text-red-700"
              />
              <label htmlFor="Gender">Gender:</label>
              <Field
                as="select"
                id="Gender"
                name="Gender"
                className="w-full px-3 py-1 rounded"
              >
                <option value="">Choose Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </Field>
              <ErrorMessage
                name="Gender"
                component="div"
                className="text-red-700"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-grow bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Adopt
                </button>
                <button
                  className="flex-grow bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

const CongratulationsModal = ({ closeModal }) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      closeModal();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-400 rounded-lg p-8 w-6/12">
        <h2 className="text-2xl mb-4 font-semibold">Congratulations!</h2>
        <p className="text-lg text-center">
          You have successfully adopted a new pet.
        </p>
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

  const user = userData?.getUser;
  console.log(user);

  const handleAdopt = async (speciesId, values) => {
    const { Name, Gender, Age } = values;
    console.log(values);
    console.log(speciesId);
    try {
      await addPet({
        variables: { speciesId, gender: Gender, name: Name, age: Age },
      });
      setSuccessMessage("Congratulations on your new pet!");
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setModalOpen(false);
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
          <CongratulationsModal closeModal={() => setSuccessMessage("")} />
        )}
      </div>
    </div>
  );
};

export default Adoption;
