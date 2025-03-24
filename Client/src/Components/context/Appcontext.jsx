import axios from 'axios';
import React, { useEffect } from 'react'
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const AppContext = createContext();

axios.defaults.withCredentials = true


export const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserdata] = useState(false);

    const getuserData = async()=>{
        try {
            const {data} = await axios.get(backendurl + '/api/user/data')
            data.success ? setUserdata(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAuthsate = async () =>{
        try {
            const {data} = await axios.get(backendurl + '/api/auth/is-auth')
            if(data.success) {
                setIsLoggedin(true)
                getuserData()
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    
    useEffect(()=>{
        getAuthsate();
    },)
    
    const value = {
        backendurl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserdata,
        getuserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
