import {  createContext, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export const AdminContext = createContext()
export const AdminContextProvider =({children}) =>{

const [atoken,setAtoken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') :'')
const [doctors, setDoctors] = useState([])
const [appointments, setAppointments] = useState([])
const [dashData, setdashData] = useState(false)

const backendUrl = import.meta.env.VITE_BACKEND_URL

 const getAllDoctors = async()=>{
    try {
        const {data} =await axios.post(backendUrl +'/api/admin/all-doctors',{},{
            // headers: { Authorization: `Bearer ${atoken}`} 
            headers:{atoken} 
        })
        
        if (data.success) {
            setDoctors(data.doctors)
            console.log('doctors data',data.doctors)
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

const getAllAppointments = async () =>{
    try {
        const {data} = await axios.get(backendUrl +'/api/admin/appointments', {headers:{atoken}})

        if (data.success) {
            console.log('data success in admin appointment',data.appointments)
            setAppointments(data.appointments)

        } else {
            toast.error(data.message)
            console.log('not receiving  admin appointment')
        }

    } catch (error) {
        toast.error(error.message)
    }
}

const cancelAppointment = async (appointmentId)=>{
    try {
        const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId},{headers:{atoken}} )
        if (data.success) {
            toast.success(data.message)
            getAllAppointments()
        } else {
            toast.error(error.message)
        }
    } catch (error) {
        toast.error(error.message)   
    }
}

const getDashData =async ()=>{
    try {
        const {data} = await axios.get( backendUrl + '/api/admin/dashboard', {headers: {atoken}})
        
        if (data.success) {
            setdashData(data.dashData)
            console.log(data.dashData)
        } else {
            toast.error(error.message)
        }

    } catch (error) {
        toast.error(error.message)
    }
}

    const value={ 
        atoken,setAtoken,backendUrl,getAllDoctors,
        doctors, changedAvailability, appointments, 
        setAppointments, getAllAppointments, cancelAppointment,
        dashData, getDashData
    }
return (

<AdminContext.Provider value={value}>
    {children}
</AdminContext.Provider>

    )}

// export default {AdminContextProvider,AdminContext}
export default AdminContextProvider