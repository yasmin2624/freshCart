import React, { useContext } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'

export default function Register() {
  let [isCallingAPI, setisCallingAPI] = useState(false);
  let [apiError, setapiError] = useState(null);

  const context = useContext(tokenContext);
  const setToken = context?.setToken;

  let navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Min length is 3").max(15, "Max length is 15").required("Required"),
    email: Yup.string().email('Invalid email').required("Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone').required("Required"),
    password: Yup.string().matches(/^[A-Za-z][A-Za-z0-9]{5,}$/, 'Invalid password, must be at least 6 characters').required("Required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required("Required")
  });

  const registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callRegister
  });

  async function callRegister(values) {
    try {
      setisCallingAPI(true);
      setapiError(null);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      localStorage.setItem("userToken", data.token);
      if (setToken) {
        setToken(data.token);
      }
      setisCallingAPI(false);
      navigate("/login");
    } catch (error) {
      setapiError(error.response?.data?.message);
      setisCallingAPI(false);
    }
  }

  return (
    <div className="flex justify-center items-center py-12 bg-gray-100 dark:bg-gray-900">
      <form onSubmit={registerForm.handleSubmit} className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center text-main mb-6">Register Now</h1>

        {apiError && (
          <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
            {apiError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            name="name"
            onBlur={registerForm.handleBlur}
            id="name"
            className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-main focus:border-main"
            placeholder="Enter your name"
            required
          />
          {registerForm.errors.name && registerForm.touched.name && (
            <p className="mt-1 text-sm text-red-600">{registerForm.errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            name="email"
            onBlur={registerForm.handleBlur}
            id="email"
            className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-main focus:border-main"
            placeholder="Enter your email"
            required
          />
          {registerForm.errors.email && registerForm.touched.email && (
            <p className="mt-1 text-sm text-red-600">{registerForm.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            type="tel"
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            name="phone"
            onBlur={registerForm.handleBlur}
            id="phone"
            className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-main focus:border-main"
            placeholder="Enter your phone"
            required
          />
          {registerForm.errors.phone && registerForm.touched.phone && (
            <p className="mt-1 text-sm text-red-600">{registerForm.errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            name="password"
            onBlur={registerForm.handleBlur}
            id="password"
            className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-main focus:border-main"
            placeholder="Enter your password"
            required
          />
          {registerForm.errors.password && registerForm.touched.password && (
            <p className="mt-1 text-sm text-red-600">{registerForm.errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            type="password"
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            name="rePassword"
            onBlur={registerForm.handleBlur}
            id="rePassword"
            className="mt-1 block w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-main focus:border-main"
            placeholder="Confirm your password"
            required
          />
          {registerForm.errors.rePassword && registerForm.touched.rePassword && (
            <p className="mt-1 text-sm text-red-600">{registerForm.errors.rePassword}</p>
          )}
        </div>

        <div className="flex justify-center">
          {isCallingAPI ? (
            <div className="bg-main p-2 rounded-md">
              <ClipLoader color='#ffffff' size={20} />
            </div>
          ) : (
            <button type="submit" className="w-full bg-main text-white py-2 rounded-lg hover:opacity-90 transition">Register</button>
          )}
        </div>
      </form>
    </div>
  );
}
