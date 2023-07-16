import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LOGIN } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const LoginForm = () => {
  const [login] = useMutation(LOGIN);

  const formFields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (userValues) => {
    console.log(userValues);
    const { email, password } = userValues;
    const { data } = await login({
      variables: { email, password },
    });
    console.log(data);
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
              <h1 className="text-center text-2xl">Log In</h1>
              <Form className="pt-6 pb-2 my-2">
                {formFields.map((field, index) => (
                  <div className="mb-4" key={index}>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor={field.name}
                    >
                      {field.label}
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                    className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border-b-4 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent ${
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
