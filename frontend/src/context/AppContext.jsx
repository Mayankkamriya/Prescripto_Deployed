import { createContext, useEffect, useState, useCallback, useMemo  } from "react";
import axios from "axios"
import {toast} from 'react-toastify'

export const AppContext = createContext()
const AppContextProvider =(props) =>{

    const currencySymbol ='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors] = useState([])
    const [token, setToken] = useState( localStorage.getItem('token')?localStorage.getItem('token'): false)

    const [userData, setUserData] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [limit, setlimit] = useState(17) 

const getDoctorsData = async(customLimit) =>{
    try {
// console.log('customlimit just enter in getDoctorsData function...', customLimit)
        const effectiveLimit = customLimit || limit; // Use customLimit if provided, else default to the state value
        // console.log("Effective limit just before URL:", effectiveLimit);
        
        const {data} = await axios.get(backendUrl + `/api/doctor/list?limit=${effectiveLimit}`)
        if (data.success) {
            const decodedData = JSON.parse(atob(data.data));
            setDoctors(decodedData);
            // setDoctors(data.doctors)
        } else {
            toast.error(data.message)
        }
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

const loadUserProfileData = async() =>{
    try {

        const {data} = await axios.get(backendUrl+ '/api/user/getProfile', {headers:{token}})
        if (data.success) {

            const userData = JSON.parse(atob(data.data));
            setUserData(userData);
            // setUserData(data.userData)

        } else {
            toast.error(error.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

const getUserAppointments = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})
      
      if (data.success) {
        const decodedData = JSON.parse(atob(data.data));
        setAppointments(decodedData.reverse());

        // if we are not encodeing and decodeing it
        // setAppointments(data.appointments.reverse())
    } 
    
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
 
  const cancelAppointment = async (appointmentId) =>{
    
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})
      
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
  
      } else {
        toast.error(data.message)
      }
  
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


const value={ doctors, currencySymbol,
    backendUrl, token ,setToken,
    userData, setUserData, loadUserProfileData,
    getDoctorsData, getUserAppointments, appointments,
    setAppointments, cancelAppointment,setlimit }

useEffect(()=>{
    getDoctorsData()
},[])

useEffect(()=>{
    if (token) {
        loadUserProfileData()
    } else {
        setUserData(false)
    }
},[token])

return (

<AppContext.Provider value={value}>
    {props.children}
</AppContext.Provider>

    )}

export default AppContextProvider
