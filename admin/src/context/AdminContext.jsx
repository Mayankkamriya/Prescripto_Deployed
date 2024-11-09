import {  createContext, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export const AdminContext = createContext()
 const AdminContextProvider =({children}) =>{

// const AdminContext = createContext()
// const AdminContextProvider =({children}) =>{

const [atoken,setAtoken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') :'')
const [doctors, setDoctors] = useState([])

const backendUrl = import.meta.env.VITE_BACKEND_URL

const getAllDoctors = async()=>{
    try {
        const {data} =await axios.post(backendUrl +'/api/admin/all-doctors',{},{
            // headers: { Authorization: `Bearer ${atoken}`} 
            headers:{atoken} 
        })
        console.log('API Response:', data); 
        
        if (data.success) {
            setDoctors(data.doctors)
            console.log(data.doctors)
        } else {
            toast.error(data.message)
        }    
    } catch (error) {
        toast.error(error.message)
    }
  }

const changedAvailability = async (docId)=>{
    try {
        const { data } = await axios.post(backendUrl + '/api/admin/change-availability' ,{docId},{headers:{atoken}} )
        if (data.success) {
            toast.success(data.message)
            getAllDoctors()
        } else{
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)
    }
}

    const value={ 
        atoken,setAtoken,backendUrl,getAllDoctors,
        doctors, changedAvailability
     }
return (

<AdminContext.Provider value={value}>
    {children}
</AdminContext.Provider>

    )}

// export default {AdminContextProvider,AdminContext}
export default AdminContextProvider