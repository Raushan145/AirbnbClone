import React, { createContext } from 'react'
import { ServerURL } from '../App';

export const AuthDataContext = createContext();

const AuthContext = ({children}) => {
  const  ServerURL = "http://localhost:8080"
  let value= {ServerURL}
  return (
    <div>
            <AuthDataContext.Provider value={value} >
                {children}
            </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
