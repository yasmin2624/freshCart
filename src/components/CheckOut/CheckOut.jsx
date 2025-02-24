import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function CheckOut() {
  let [isCallingAPI, setisCallingAPI] = useState(false);
  let [apiError, setapiError] = useState(null);
  let [isOnLine, setIsOnLine] = useState(false);
  let { cashOnDelievry, onLinePayment } = useContext(cartContext);
  const navigate = useNavigate();

  const shippingForm = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
    }),
    onSubmit: callPayment
  });

  async function callPayment(values) {
    try {
      setisCallingAPI(true);
      if (isOnLine) {
        let x = await onLinePayment(values);
        window.location.href = x.session.url;
      } else {
        let x = await cashOnDelievry(values);
        toast.success(" Your order has been placed successfully!✅");
        setTimeout(() => navigate("/allorders"), 2000);
      }
    } catch (error) {
      console.error(error);
      setisCallingAPI(false);
    }
  }

  return (
    <form
    onSubmit={shippingForm.handleSubmit}
    className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 my-9 mx-auto p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
  >
    <h1 className="text-2xl sm:text-3xl mb-4 text-color dark:text-white font-bold text-center">
      Shipping Info
    </h1>
  
    {apiError && (
      <div
        className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
        role="alert"
      >
        {apiError}
      </div>
    )}
  
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        value={shippingForm.values.details}
        onChange={shippingForm.handleChange}
        name="details"
        onBlur={shippingForm.handleBlur}
        id="floating_details"
        className="block py-2.5 px-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        placeholder="Details"
        required
      />
      {shippingForm.errors.details && shippingForm.touched.details && (
        <div
          className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
          role="alert"
        >
          {shippingForm.errors.details}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="tel"
        value={shippingForm.values.phone}
        onChange={shippingForm.handleChange}
        name="phone"
        onBlur={shippingForm.handleBlur}
        id="floating_phone"
        className="block py-2.5 px-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        placeholder="Phone"
        required
      />
      {shippingForm.errors.phone && shippingForm.touched.phone && (
        <div
          className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
          role="alert"
        >
          {shippingForm.errors.phone}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        value={shippingForm.values.city}
        onChange={shippingForm.handleChange}
        name="city"
        onBlur={shippingForm.handleBlur}
        id="floating_city"
        className="block py-2.5 px-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        placeholder="City"
        required
      />
      {shippingForm.errors.city && shippingForm.touched.city && (
        <div
          className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
          role="alert"
        >
          {shippingForm.errors.city}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group flex items-center">
      <input
        type="checkbox"
        className="accent-main"
        checked={isOnLine}
        onChange={() => setIsOnLine(!isOnLine)}
      />
      <label className="mx-3 text-sm sm:text-base text-gray-900 dark:text-white">
        Online Payment
      </label>
    </div>
  
    {isCallingAPI ? (
      <div className="flex w-auto mt-4 sm:mt-0">
        <div className="bg-main p-2 pb-0 rounded-md">
          <ClipLoader color="#ffffff" size={20} />
        </div>
      </div>
    ) : (
      <button
        type="submit"
        className="text-white bg-main hover:bg-main hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-green-100 dark:focus:ring-green-700 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 text-center mt-4 sm:mt-0 w-full sm:w-auto"
      >
        Pay Now
      </button>
    )}
  </form>
  
  
    
  
  );
}

