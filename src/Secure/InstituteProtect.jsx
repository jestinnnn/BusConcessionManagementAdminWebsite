import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const InstituteProtect = () => {
    const token = localStorage.getItem('type');
  return (
    token==="Institute" ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default InstituteProtect