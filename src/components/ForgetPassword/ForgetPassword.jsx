import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState(null);
  const [isCallingAPI, setIsCallingAPI] = useState(false);
  const [email, setEmail] = useState('');

  let API = `https://ecommerce.routemisr.com/api/v1/auth`;
  const navigate = useNavigate();

  const emailFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({ email: Yup.string().email('Invalid email').required('Required') }),
    onSubmit: forgetPassword,
  });

  async function forgetPassword(values) {
    try {
      setIsCallingAPI(true);
      setApiError(null);
      await axios.post(`${API}/forgotPasswords`, values);
      setEmail(values.email);
      setStep(2);
      toast.success('Reset code sent to your email!');
    } catch (error) {
      setApiError(error.response?.data?.message);
      toast.error(error.response?.data?.message || 'Failed to send reset code');
    } finally {
      setIsCallingAPI(false);
    }
  }

  const codeFormik = useFormik({
    initialValues: { email: emailFormik.values.email, resetCode: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      resetCode: Yup.string().required('Required'),
    }),
    onSubmit: resetCode,
  });

  async function resetCode(values) {
    try {
      setIsCallingAPI(true);
      setApiError(null);
      await axios.post(`${API}/verifyResetCode`, values);
      setStep(3);
      toast.success('Code verified successfully!');
    } catch (error) {
      setApiError(error.response?.data?.message);
      toast.error(error.response?.data?.message || 'Failed to verify code');
    } finally {
      setIsCallingAPI(false);
    }
  }

  async function NewPassword(values) {
    try {
      setIsCallingAPI(true);
      setApiError(null);

      if (!email) {
        setApiError('Email is missing');
        toast.error('Email is missing');
        return;
      }

      await axios.put(`${API}/resetPassword`, { email, newPassword: values.newPassword });
      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Something went wrong');
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsCallingAPI(false);
    }
  }

  const passwordFormik = useFormik({
    initialValues: { email: '', newPassword: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      newPassword: Yup.string().min(6, 'At least 6 characters').required('Required'),
    }),
    onSubmit: NewPassword,
  });

  useEffect(() => {
    codeFormik.setFieldValue('email', email);
  }, [email]);

  return (
    <div className="w-full min-h-96 flex flex-col items-center justify-center px-4 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl sm:text-3xl mb-4 font-bold">Forget Password</h1>

      {step === 1 && (
        <form onSubmit={emailFormik.handleSubmit} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          {apiError && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-700" role="alert">
              {apiError}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-3">Email:</label>
            <input
              type="email"
              value={emailFormik.values.email}
              onChange={emailFormik.handleChange}
              name="email"
              onBlur={emailFormik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main dark:bg-gray-700"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            {isCallingAPI ? (
              <div className="bg-main p-2 pb-0 rounded-md">
                <ClipLoader color='#ffffff' size={20} />
              </div>
            ) : (
              <button type="submit" className="bg-main text-white px-4 py-2 rounded-lg hover:opacity-80">Send Code</button>
            )}
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={codeFormik.handleSubmit} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <div className="mb-4">
            <label className="block mb-3">Enter Code:</label>
            <input
              type="text"
              value={codeFormik.values.resetCode}
              onChange={codeFormik.handleChange}
              name="resetCode"
              onBlur={codeFormik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main dark:bg-gray-700"
              placeholder="Enter reset code"
              required
            />
          </div>
          <button type="submit" className="bg-main text-white px-4 py-2 rounded-lg hover:opacity-80">Verify Code</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={passwordFormik.handleSubmit} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <div className="mb-4">
            <label className="block mb-3">Email:</label>
            <input
              type="email"
              value={passwordFormik.values.email}
              onChange={passwordFormik.handleChange}
              name="email"
              onBlur={passwordFormik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main dark:bg-gray-700"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">New Password:</label>
            <input
              type="password"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              name="newPassword"
              onBlur={passwordFormik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main dark:bg-gray-700"
              placeholder="Enter new password"
              required
            />
          </div>
          <button type="submit" className="bg-main text-white px-4 py-2 rounded-lg hover:opacity-80">Reset Password</button>
        </form>
      )}
    </div>
  );
}
