import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const LoginForm = () => {
  const [loginUser] = useMutation(LOGIN);

  const formFields = [
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' }
  ];

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (userValues) => {
    console.log(userValues);
    const { email, password } = userValues;
    const { data } = await loginUser({
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

export default LoginForm;
