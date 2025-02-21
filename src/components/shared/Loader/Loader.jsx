import React from 'react'
import { useState , useEffect } from 'react'
import loader from '../../../assets/images/loader.gif'

export default function Loader() {

  const [count,setCount] = useState(0)

  useEffect(() =>{

  },[])

  return (
    <div className='flex justify-center m-12'>
      <img src={loader} alt="" width={200}/>
    </div>
  )
}
