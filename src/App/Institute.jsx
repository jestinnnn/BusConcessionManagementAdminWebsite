import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Component/Institution/NavBar'

function Institute() {
    return (
        <div>
            <NavBar />

            <Outlet />
        </div>

    )
}

export default Institute