import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9_]{2,}$/,
      "Username must start with a letter, cannot contain spaces or special characters, and must be at least 3 characters long"
    )
    .required("Username is required"),
  email: Yup.string().email("Invalid format").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
  con_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = () => {

  const { Signup_Axios } = useAuth();

  return (
    <div className="min-w-full min-h-screen flex flex-col justify-center items-center ">
     
      <div className="md:w-2/4  flex-col-reverse md:flex-row flex   md:h-[500px] rounded-3xl shadow-[0_4px_8px_8px_rgba(173,216,230,0.7)]">
        <div className=" md:w-4/6 h-full bg-gray-100 flex items-center justify-center rounded-lg">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              con_password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Custom Hook for Signup api call using Axios

              Signup_Axios(values, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full p-6 md:p-10">
                <span className="text-center py-3 text-2xl font-bold ">
                  Hello, friend!
                </span>
                <Field
                  type="text"
                  name="username"
                  placeholder="Name"
                  className="py-2 rounded-full px-4 my-3 placeholder-sky-500 font-semibold   shadow-[2px_2px_8px_4px_rgba(173,216,230,1)]"
                />
                <ErrorMessage
                  name="username"
                  className="text-red-600"
                  component="div"
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="py-2 rounded-full px-4  my-3 placeholder-sky-500 font-semibold shadow-[2px_2px_8px_4px_rgba(173,216,230,1)]"
                />
                <ErrorMessage
                  name="email"
                  className="text-red-600"
                  component="div"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="py-2 rounded-full px-4 my-3 placeholder-sky-500 font-semibold shadow-[2px_2px_8px_4px_rgba(173,216,230,1)]"
                />
                <ErrorMessage
                  name="password"
                  className="text-red-600"
                  component="div"
                />

                <Field
                  type="password"
                  name="con_password"
                  placeholder="Confirm Password"
                  className="py-2 rounded-full px-4 my-3 placeholder-sky-500 font-semibold shadow-[2px_2px_8px_4px_rgba(173,216,230,1)]"
                />
                <ErrorMessage
                  name="con_password"
                  className="text-red-600"
                  component="div"
                />
                <div className="flex justify-center mt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white py-1 w-full md:w-1/2  text-center bg-gradient-to-l from-blue-400 via-cyan-400 to-cyan-200  rounded-full font-semibold text-lg flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <div className=" bg-gradient-to-t from-blue-400 via-cyan-400 to-cyan-200  border-solid rounded-full w-6 h-6 animate-spin"></div>
                    ) : (
                      "CREATE ACCOUNT"
                    )}
                  </button>
                </div>

                <span className="text-sky-600 py-2 text-center  font-semibold ">
                  Already have an account?{" "}
                  <Link to="/" className="text-cyan-400">
                    Sign in
                  </Link>{" "}
                </span>
              </Form>
            )}
          </Formik>
        </div>
        <div className=" md:w-3/6  h-full bg-gradient-to-t from-blue-400 via-cyan-400 to-cyan-200 flex items-center justify-center space-y-2 md:space-y-5 text-white rounded-t-xl md:rounded-r-xl md:rounded-l-none  flex-col">
        <p className="text-2xl font-bold pt-2">Glad To See You!</p>
        <span className="font-semibold text-lg pb-2">Create Your Account </span>
          
        </div>
      </div>
    </div>
  );
};

export default Signup;
