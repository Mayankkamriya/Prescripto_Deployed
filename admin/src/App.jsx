import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import  {AdminContext}  from './context/AdminContext.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard.jsx'
import DoctorsList from './pages/Admin/DoctorsList.jsx'
import AddDoctor from './pages/Admin/AddDoctor.jsx'
import AllApointment from './pages/Admin/AllApointments.jsx'
import { DoctorContext } from './context/DoctorContext.jsx'
import DoctorsAppointment from './pages/Doctor/DoctorsAppointment.jsx'
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx'
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx'

const App = () => {
  const {atoken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return atoken || dToken ?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
        {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashbord' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllApointment/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

          {/* Doctor Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
          <Route path='/doctor-appointments' element={<DoctorsAppointment/>} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) :(
    <>

{/* Login Route */}
{/* <Route path="/login" element={<Login />} /> */}

      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App