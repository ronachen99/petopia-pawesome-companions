// import the necessary dependencies
import React from "react";
// import form library
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import mutation functions
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
// for authentication
import Auth from "../utils/auth";

// a functional component for signup
const SignupForm = () => {
  // using the useMutation hook to execute the ADD_USER, the resulting mutation function is destrucutred into addUser
  const [addUser] = useMutation(ADD_USER);

  // predefine form fields to be dynamically populated in the form
  const formFields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  // predefine the validation criteria to be dynamically populated in the form
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm password is required."),
  });

  // set intial states to be dynamically populated in the form
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  // takes in the userValues object as prameter
  const handleSubmit = async (userValues) => {
    console.log(userValues);
    // destructure email and password
    const { email, password } = userValues;
    // add the user using email password
    const { data } = await addUser({
      variables: { email, password },
    });
    console.log(data);
    // generate token
    Auth.login(data.addUser.token);
    window.location.href = "/";
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
              <h1 className="text-center text-2xl text-black ">Sign Up</h1>

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
                    Sign Up
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

export default SignupForm;
