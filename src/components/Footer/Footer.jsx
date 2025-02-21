import React from 'react'

export default function Footer() {

  return (


<footer className='bg-[rgb(242,242,242)] p-6'>
  <div className="container w-5/6 mx-auto">
    <h2 className='text-2xl md:text-3xl text-color'>Get the freshCart App</h2>
    <p className='text-[#6d767e] font-light text-sm md:text-base'>
      We will send you a link, open it on your to download the app
    </p>

    <div className="flex flex-col md:flex-row mt-6 mb-5 gap-3 md:gap-0">  
      <input 
        type="email"  
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-main focus:border-main block p-2.5 grow me-0 md:me-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main" 
        placeholder="Email.." 
        required 
      />
      <button type="submit" className="p-2 px-3 text-white bg-main rounded-md w-full md:w-auto">
        Share App Link
      </button>
    </div>

    <div className="partner flex flex-col md:flex-row justify-between py-6 border-y-2 text-center md:text-left gap-3 md:gap-0">
      <div className="payment">
        <p>Payment Partners</p>
      </div>
      <div className="app">
        <p>Get deliveries with FreshCart</p>
      </div>
    </div>
  </div>
</footer>

  )
}
