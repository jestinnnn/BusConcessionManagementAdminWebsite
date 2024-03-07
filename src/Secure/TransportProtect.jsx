import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const TransportProtect = () => {
    const token = localStorage.getItem('type');
    return (
      token==="Transport" ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default TransportProtect