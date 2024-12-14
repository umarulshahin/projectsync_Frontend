import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid format").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

const Signin = () => {
  const { Signin_Axios } = useAuth();
  return (
    <div className="min-w-full min-h-screen flex flex-col justify-center items-center ">
     
      <div className=" md:w-2/4 flex flex-col-reverse  md:flex-row md:h-[500px] rounded-3xl shadow-[0_4px_8px_8px_rgba(173,216,230,0.7)]">
        <div className=" w-full md:w-4/6 h-full bg-gray-100 flex items-center justify-center rounded-lg">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SigninSchema}
            onSubmit={(values, { setSubmitting }) => {
                
              // Custom Hook for Signin api call using Axios

              Signin_Axios(values, setSubmitting);

            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full p-10">
                <span className="text-center text-2xl font-bold ">
                  Hello! , 
                </span>
                <span className="text-center text-xl font-semibold">sign Into Your Account</span>
                
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

                
                <div className="flex justify-center mt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white py-1 w-full md:w-1/2   text-center bg-gradient-to-l from-blue-400 via-cyan-400 to-cyan-200  rounded-full font-semibold text-lg flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <div className=" bg-gradient-to-t from-blue-400 via-cyan-400 to-cyan-200  border-solid rounded-full w-6 h-6 animate-spin"></div>
                    ) : (
                      "SIGN IN"
                    )}
                  </button>
                </div>

                <span className="text-sky-600 text-center py-2 font-semibold ">
                  Already have an account?{" "}
                  <Link to="/signup" className="text-cyan-400">
                    Sign up
                  </Link>{" "}
                </span>
              </Form>
            )}
          </Formik>
        </div>
        <div className=" w-full md:w-3/6 py-5 md:py-0 h-full bg-gradient-to-t from-blue-400 via-cyan-400 to-cyan-200 flex items-center justify-center space-y-5 text-white rounded-t-xl md:rounded-t-none  md:rounded-r-xl flex-col">
          <p className="text-2xl font-bold">Welcome Back!</p>
          {/* <span className="font-semibold text-lg">Welcome Back</span> */}
        </div>
      </div>
    </div>
  );
};

export default Signin;

