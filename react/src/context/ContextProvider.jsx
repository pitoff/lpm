import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
})

export const ContextProvider = ({ children }) => {

    const [currentUser, _setCurrentUser] = useState(localStorage.getItem('User') || '')
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '')

    const setCurrentUser = (user) => {
      if(user){
        localStorage.setItem('User', JSON.stringify(user))
      }else{
        localStorage.removeItem('User')
      }
      _setCurrentUser(JSON.stringify(user))
    }

    const setUserToken = (token) => {
        if(token){
          localStorage.setItem('TOKEN', token)
        }else{
          localStorage.removeItem('TOKEN')
        }
        _setUserToken(token)
      }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)