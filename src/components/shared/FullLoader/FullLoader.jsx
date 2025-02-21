import React from 'react'
import { ClockLoader } from 'react-spinners'

export default function FullLoader() {


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-400 bg-opacity-50 flex justify-center items-center z-50">
      <ClockLoader color="#0AAD0A" />
  </div>
  )
}
