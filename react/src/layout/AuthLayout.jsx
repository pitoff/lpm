import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const AuthLayout = () => {
  const { userToken } = useStateContext()

  if(userToken){
    return <Navigate to="/dashboard" />
  }

  return (
    <div className='container mx-auto flex min-h-full items-center justify-center'>

        <Outlet/>

    </div>
  )
}

export default AuthLayout