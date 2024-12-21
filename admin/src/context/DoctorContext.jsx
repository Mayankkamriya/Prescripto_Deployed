import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'

export const DoctorContext = createContext()
const DoctorContextProvider =(props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
     
    const [dToken, setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') :'')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [ProfileData, setProfileData] = useState(false)

const getAppointments = async () => {

 try {
    const data  = await axios.get(`${backendUrl}/api/doctor/appointments`, {headers:{dToken} }); 
    
    setAppointments(data.data)
    console.log('setAppointments   :',data.data)
    // getAppointments()
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

const getDashData = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers: {dToken}})
    //   console.log('getDashData data :',data)
      if (data.success) {
        setDashData(data.dashData)
        // console.log('data.dashData  : ',data.dashData)
      } else {
        toast.error(data.message)
      }
    
    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    }
  }

const getProfileData = async () =>{
  try {
     const {data} = await axios.get(backendUrl + '/api/doctor/profile', {headers: {dToken}})
     console.log('getProfileData  :',data)
    if (data.success) {
      setProfileData(data.ProfileData)
      console.log(data.ProfileData)
    }

    } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}


const updateProfile = async (updateData) => {
  try {
    const url = `${backendUrl}/api/doctor/update-profile`;
    // console.log("Update Profile API URL:", url);

    const { data } = await axios.post(url, updateData, {headers: {dToken}},);

    console.log("API Response of updateProfile:", data);
    if (data.success) {
      getProfileData(); // Refresh profile data after update
      return { success: true, message: data.message };
    } else {
      toast.error(data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error Response:", error.response);
    toast.error(error.response?.data?.message || error.message);
    return { success: false, message: error.message };
  }
};

    const value={ dToken, backendUrl, getAppointments, 
        appointments, setDToken, setAppointments, 
        CancelAppointment, CompleteAppointment,
        dashData, setDashData, getDashData,
       setProfileData, ProfileData, getProfileData,
       updateProfile }

    return (

    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>

)}
export default DoctorContextProvider
