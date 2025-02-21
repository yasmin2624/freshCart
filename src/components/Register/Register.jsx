import React from 'react'
import  {useState}  from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom'

export default function Register() {
  let [isCallingAPI,setisCallingAPI] = useState (false);
  let [apiError,setapiError] = useState (null);
  
  let navigate = useNavigate()

  const initialValues=  {
    name:'mina',
    email:'',
    phone:'',
    password:'',
    rePassword:''
  }

  const validationSchema = Yup.object().shape({
    name:Yup.string().min(3,"min length is 3").max(15,"max length is 15").required("Required"),
    email:Yup.string().email('Invalid email').required("Required"),
    phone:Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'),'Invalid phone').required("Required"),
    password:Yup.string().matches(new RegExp('^[A-z][a-z0-9]{5,}$'),'Invalid password , must be Minimum 6 characters').required("Required"),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'rePassword should match password').required("Required")
  })


  const registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit : callRegister     
  })

   async function callRegister(values){
    try {
      setisCallingAPI(true)
      setapiError(null)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      console.log(data);
      setisCallingAPI(false)
      navigate("/login")
    } catch (error) {
      setapiError(error.response.data.message)
      setisCallingAPI(false)
    }
  
  
    }


  return (
  
    <form onSubmit={registerForm.handleSubmit} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 my-9 mx-auto h-auto p-6 sm:p-8 md:p-10 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl sm:text-3xl mb-4 text-color font-bold text-center">Register Now</h1>
  
    {apiError && (
      <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
      </div>
    )}
  
    <div className="relative z-0 w-full mb-5 group">
      <input 
        type="text" 
        value={registerForm.values.name} 
        onChange={registerForm.handleChange} 
        name="name" 
        onBlur={registerForm.handleBlur}
        id="floating_name" 
        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main" 
        placeholder="Name"
        required 
      />
      {registerForm.errors.name && registerForm.touched.name && (
        <div className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {registerForm.errors.name}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group">
      <input 
        type="email" 
        value={registerForm.values.email} 
        onChange={registerForm.handleChange} 
        name="email" 
        onBlur={registerForm.handleBlur}
        id="floating_email" 
        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main" 
        placeholder="Email"
        required 
      />
      {registerForm.errors.email && registerForm.touched.email && (
        <div className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {registerForm.errors.email}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group">
      <input 
        type="password" 
        value={registerForm.values.password} 
        onChange={registerForm.handleChange} 
        name="password" 
        onBlur={registerForm.handleBlur}
        id="floating_password" 
        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main" 
        placeholder="Password"
        required 
      />
      {registerForm.errors.password && registerForm.touched.password && (
        <div className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {registerForm.errors.password}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group">
      <input 
        type="password" 
        value={registerForm.values.rePassword} 
        onChange={registerForm.handleChange} 
        name="rePassword" 
        onBlur={registerForm.handleBlur}
        id="floating_repassword" 
        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main" 
        placeholder="Confirm Password"
        required 
      />
      {registerForm.errors.rePassword && registerForm.touched.rePassword && (
        <div className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {registerForm.errors.rePassword}
        </div>
      )}
    </div>
  
    <div className="relative z-0 w-full mb-5 group">
      <input 
        type="tel" 
        value={registerForm.values.phone} 
        onChange={registerForm.handleChange} 
        name="phone" 
        onBlur={registerForm.handleBlur}
        id="floating_phone" 
        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-main" 
        placeholder="Phone"
        required 
      />
      {registerForm.errors.phone && registerForm.touched.phone && (
        <div className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {registerForm.errors.phone}
        </div>
      )}
    </div>
  
    {isCallingAPI ? (
      <div className="flex justify-start w-auto mt-4 sm:mt-0">
        <div className="bg-main p-2 pb-0 rounded-md">
          <ClipLoader color="#ffffff" size={20} />
        </div>
      </div>
    ) : (
      <div className="flex justify-start w-auto mt-4 sm:mt-0">
      <button type="submit" className="text-white bg-main hover:bg-main hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 text-center mt-4 sm:mt-0 w-full sm:w-auto">
        Register
      </button>
      </div>
    )}
  </form>
  
  

  
  )
}
