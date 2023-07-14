import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const SignupForm = () => {
  const [addUser] = useMutation(ADD_USER);
  const formFields = [
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
  ];

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (userValues) => {
    console.log(userValues);
    const { email, password } = userValues;
    const { data } = await addUser({
      variables: { email, password }
    });
    console.log(data);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            {formFields.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.name}>{field.label}</label>
                <Field type={field.type} id={field.name} name={field.name} />
                <ErrorMessage name={field.name} component="p" />
              </div>
            ))}
            <button type="submit" disabled={!isValid || isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
