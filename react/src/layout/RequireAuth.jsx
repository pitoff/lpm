import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

const RequireAuth = ({allowedRoles}) => {
    const { currentUser } = useStateContext()
    let user = ''
    if(currentUser){
        user = JSON.parse(currentUser)
    }
    const location = useLocation()
    
    return (
        user?.role?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : user
            ? <Navigate to="/unauthorized" state={{from: location}} replace/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth