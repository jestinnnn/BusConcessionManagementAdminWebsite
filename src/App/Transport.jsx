import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Transport/Navbar'

const Transport = () => {
  return (
   <div>
    <Navbar/>
    <Outlet/>
   </div>
   
  )
}

export default Transport