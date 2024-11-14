import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import MyAppointment from './pages/MyAppointment'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        < Route path='/' element={<Home />} />
        < Route path='/doctor' element={<Doctor />} />
        < Route path='/doctors/:speciality' element={<Doctor />} />
        < Route path='/login' element={<Login />} />
        < Route path='/my-profile' element={<MyProfile />} />
        < Route path='/about' element={<About />} />
        < Route path='/my-appointment' element={<MyAppointment />} />
        < Route path='/my-appointment/:docId' element={<MyAppointment />} />
        < Route path='/contact' element={<Contact />} />
      
      </Routes>
      <Footer/>
      </div>
  )
}

export default App