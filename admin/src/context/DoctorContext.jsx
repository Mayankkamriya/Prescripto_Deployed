import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()
const DoctorContextProvider =(props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
     
    const [dToken, setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') :'')
    const [appointments, setAppointments] = useState([])
    
const getAppointments = async () => {

 try {
    const data  = await axios.get(`${backendUrl}/api/doctor/appointments`, {headers:{dToken} }); 
    
    setAppointments(data.data)
    console.log('setAppointments   :',data.data)
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
 }
    
const CompleteAppointment = async (appointmentId) =>{
    try {
        const data  = await axios.post(backendUrl+'/api/doctor/complete-appointment', {appointmentId}, {headers:{dToken} }); 

        if (data.success) {
            toast.success(data.message)
            getAppointments()
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

  
const CancelAppointment = async (appointmentId) =>{
    try {
        const data  = await axios.post(backendUrl+'/api/doctor/cancel-appointment', {appointmentId}, {headers:{dToken} }); 

        if (data.success) {
            toast.success(data.message)
            getAppointments()
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}


 useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

    const value={ dToken, backendUrl, getAppointments, 
        appointments, setDToken, setAppointments, CancelAppointment, CompleteAppointment }

    return (

    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>

)}
export default DoctorContextProvider
