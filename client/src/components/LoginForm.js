// import the necessary dependencies
import React, { useState } from "react";
// import form library
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import mutation functions
import { LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";
// for authentication
import Auth from "../utils/auth";

// a functional component for login
const LoginForm = () => {
  // useMutation hook executs the LOGIN mutation and the resulting mutation function is destructured into login
  const [login] = useMutation(LOGIN);
  // set the initial state for the error message
  const [errorMessage, setErrorMessage] = useState(null);

  // predefined the form fields to be dynamically populated later
  const formFields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  // predefined the form validations to be dynamically populated later
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  // predefined the initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // handle submission of the form, takes in the userValues as an object
  const handleSubmit = async (userValues) => {
    console.log(userValues);
    // destructure into email and password
    const { email, password } = userValues;
    try {
      // use the login mutation to login
      const { data } = await login({
        variables: { email, password },
      });
      console.log(data);
      // once logged in, a token is generated
      Auth.login(data.login.token);
      window.location.href="/";
    } catch (err) {
      // else send an error message for invalid credentials
      setErrorMessage("Wrong password or email. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <div className="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3">
            <div className="shadow-lg bg-white rounded-lg p-8">
              <h1 className="text-center text-2xl text-black ">Log In</h1>
              <Form className="pt-6 pb-2 my-2">
                {formFields.map((field, index) => (
                  <div className="mb-4" key={index}>
                    <label
                      className="block text-sm text-black mb-2"
                      htmlFor={field.name}
                    >
                      {field.label}
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                      type={field.type}
                      id={field.name}
                      name={field.name}
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name={field.name}
                      component="p"
                    />
                  </div>
                ))}

                {errorMessage && (
                  <p className="text-red-500 text-center mt-4">
                    {errorMessage}
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    className={`bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded border-b-4 border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent ${
                      isValid && !isSubmitting
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    }`}
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    Log In
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
