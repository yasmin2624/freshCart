import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function LayOut() {

  return (
   <>
   <NavBar/>

  <Outlet />


   <Footer />

   </>
  )
}
