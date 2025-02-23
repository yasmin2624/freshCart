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
    onSubmit: callLogin
  });

  async function callLogin(values) {
    try {
      setisCallingAPI(true);
      setapiError(null);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
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
    <div className="flex justify-center items-center min-h-96 py-16 bg-gray-100 dark:bg-gray-900">
      <form onSubmit={LoginForm.handleSubmit} className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center text-main mb-6">Login Now</h1>

        {apiError && (
          <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
            {apiError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={LoginForm.values.email}
            onChange={LoginForm.handleChange}
            name="email"
            onBlur={LoginForm.handleBlur}
            id="email"
            className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-main focus:border-main"
            placeholder="Enter your email"
            required
          />
          {LoginForm.errors.email && LoginForm.touched.email && (
            <p className="mt-1 text-sm text-red-600">{LoginForm.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={LoginForm.values.password}
            onChange={LoginForm.handleChange}
            name="password"
            onBlur={LoginForm.handleBlur}
            id="password"
            className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-main focus:border-main"
            placeholder="Enter your password"
            required
          />
          {LoginForm.errors.password && LoginForm.touched.password && (
            <p className="mt-1 text-sm text-red-600">{LoginForm.errors.password}</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <Link to="/forgetpassword" className="text-sm text-main hover:underline">Forgot password?</Link>
        </div>

        <div className="flex justify-center">
          {isCallingAPI ? (
            <div className="bg-main p-2 rounded-md">
              <ClipLoader color='#ffffff' size={20} />
            </div>
          ) : (
            <button type="submit" className="w-full bg-main text-white py-2 rounded-lg hover:opacity-90 transition">Login</button>
          )}
        </div>
      </form>
    </div>
  );
}
