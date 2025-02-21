import React, { useContext } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'

export default function Login() {
  let [isCallingAPI, setisCallingAPI] = useState(false);
  let [apiError, setapiError] = useState(null);


  //   let {setToken} = useContext(tokenContext)

  const context = useContext(tokenContext);
  const setToken = context?.setToken;

  let navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required("Required"),
    password: Yup.string()
      .matches(/^[A-Za-z][A-Za-z0-9]{5,}$/, 'Invalid password, must be at least 6 characters')
      .required("Required"),
  });

  const LoginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit:callLogin

  });

  async function callLogin(values) {
    try {
      setisCallingAPI(true);
      setapiError(null);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      console.log(data);
      localStorage.setItem("userToken", data.token);
      setisCallingAPI(false);
      if (setToken) {
        setToken(data.token);
      }
      navigate("/");
    } catch (error) {
      setapiError(error.response?.data?.message);
      setisCallingAPI(false);
    }
  }

  return (
    <form onSubmit={LoginForm.handleSubmit} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 my-9 mx-auto h-auto p-6 sm:p-8 md:p-10 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl sm:text-3xl mb-4 text-color font-bold text-center">Login Now</h1>
  
    {apiError && (
      <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
      </div>
    )}
  
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="email"
        value={LoginForm.values.email}
        onChange={LoginForm.handleChange}
        name="email"
        onBlur={LoginForm.handleBlur}
        id="floating_email"
        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        placeholder="Email"
        required
      />
      {LoginForm.errors.email && LoginForm.touched.email && (
        <div className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {LoginForm.errors.email}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="password"
        value={LoginForm.values.password}
        onChange={LoginForm.handleChange}
        name="password"
        onBlur={LoginForm.handleBlur}
        id="floating_password"
        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        placeholder="Password"
        required
      />
      {LoginForm.errors.password && LoginForm.touched.password && (
        <div className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {LoginForm.errors.password}
        </div>
      )}
    </div>
  
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <span className="hover:text-main underline text-sm sm:text-base">
        <Link to="/forgetpassword" style={{ color: "#6D7882" }}>
          Forget password?
        </Link>
      </span>
      {isCallingAPI ? (
        <div className="flex justify-end w-auto mt-4 sm:mt-0">
          <div className="bg-main p-2 pb-0 rounded-md">
            <ClipLoader color='#ffffff' size={20} />
          </div>
        </div>
      ) : (
        <button type="submit" className="text-white bg-main hover:bg-main hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 text-center mt-4 sm:mt-0 w-full sm:w-auto">
          Login
        </button>
      )}
    </div>
  </form>
  
  );
}
