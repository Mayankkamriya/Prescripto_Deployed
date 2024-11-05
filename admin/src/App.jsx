import React, { useContext } from 'react'
import Login from './pages/Doctor/Login.jsx'
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

const App = () => {
  const {atoken} = useContext(AdminContext)

  return atoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashbord' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllApointment/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />
        </Routes>
      </div>
    </div>
  ) :(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App