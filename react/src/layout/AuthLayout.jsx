import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const AuthLayout = () => {
  const { userToken, currentUser } = useStateContext()
  let user = ''
  if (currentUser) {
    user = JSON.parse(currentUser)
  }

  if(userToken){
    if(user.role == 2){
      return <Navigate to="/occupant-dashboard" />
    }else{
      return <Navigate to="/" />
    }
  }

  return (
    <div className='container mx-auto flex h-screen items-center justify-center'>

        <Outlet/>

    </div>
  )
}

export default AuthLayout