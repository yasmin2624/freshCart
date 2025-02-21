import React from 'react'
import error from '../../assets/images/error.svg';

export default function NotFound() {

  return (
    <div className="flex justify-center items-center">
    <img src={error} alt="Error 404" className="w-4/6 sm:w-3/5 md:w-2/5 lg:w-1/3 h-auto mb-32" />
  </div>
  
  )
}
