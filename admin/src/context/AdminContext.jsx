import {  createContext, useState } from "react";

export const AdminContext = createContext()
export const AdminContextProvider =({children}) =>{

const [atoken,setAtoken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') :'')

const backendUrl = import.meta.env.VITE_BACKEND_URL

const value={ 
    atoken,setAtoken,backendUrl,
 }
return (

<AdminContext.Provider value={value}>
    {children}
</AdminContext.Provider>

    )}

export default AdminContextProvider
