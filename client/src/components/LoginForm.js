// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { LOGIN } from '../utils/mutations';
// import { useMutation } from '@apollo/client';

// const LoginForm = () => {
//   const [loginUser] = useMutation(LOGIN);

//   const formFields = [
//     { label: 'Email', name: 'email', type: 'email' },
//     { label: 'Password', name: 'password', type: 'password' }
//   ];

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required'),
//     password: Yup.string().required('Password is required')
//   });

//   const initialValues = {
//     email: '',
//     password: ''
//   };

//   const handleSubmit = async (userValues) => {
//     console.log(userValues);
//     const { email, password } = userValues;
//     const { data } = await loginUser({
//       variables: { email, password }
//     });
//     console.log(data);
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isValid, isSubmitting }) => (
//           <Form>
//             {formFields.map((field, index) => (
//               <div key={index}>
//                 <label htmlFor={field.name}>{field.label}</label>
//                 <Field type={field.type} id={field.name} name={field.name} />
//                 <ErrorMessage name={field.name} component="p" />
//               </div>
//             ))}
//             <button type="submit" disabled={!isValid || isSubmitting}>
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default LoginForm;
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
    <div className="h-screen">
      <div className="fixed pin flex items-center">
        <div className="fixed pin bg-black opacity-75 z-10"></div>

        <div className="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-1/3 z-20 m-8">
          <div className="shadow-lg bg-white rounded-lg p-8">
            <div className="flex justify-end mb-6">
              <button>
                <span className="mr-2">Close</span>
                <span>
                  <i className="fa fa-times"></i>
                </span>
              </button>
            </div>

            <h1 className="text-center text-2xl text-green-dark">Login</h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid, isSubmitting }) => (
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.label}
                      />
                      <ErrorMessage
                        className="text-red-500 text-sm"
                        name={field.name}
                        component="p"
                      />
                    </div>
                  ))}

                  <div className="block md:flex items-center justify-between">
                    <div>
                      <button
                        className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded border-b-4 border-green-darkest"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                      >
                        Sign In
                      </button>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <a href="#" className="text-green no-underline">
                        Forget Password?
                      </a>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
