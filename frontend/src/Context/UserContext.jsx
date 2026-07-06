import React, { createContext, useEffect, useState } from 'react'
export const userDataContext = createContext();
import { ServerURL } from '../App';
import axios from 'axios';

const UserContext = ({children}) => {

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)

    const getCurrentUser =async ()=>{
        try {
        const result =  await axios.get(`${ServerURL}/api/user/currentUser`, { withCredentials: true })
        setUserData(result.data);

        console.log(result.data);
            
        } catch (error) {
                setUserData(null);
                console.log(error)
        }   
    }

    useEffect(()=>{
        getCurrentUser()
    },[])

    let value = {
        userData, setUserData,getCurrentUser
    }
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext
