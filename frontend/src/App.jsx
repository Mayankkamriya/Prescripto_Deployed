
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Components
import AdminLogin from './Admin/pages/Login';
import { AdminContext } from './Admin/context/AdminContext';
import { DoctorContext } from './Admin/context/DoctorContext';
import Navbar from './Admin/components/Navbar';
import Sidebar from './Admin/components/Sidebar';
import AdminDashboard from './Admin/pages/Admin/Dashboard';
import DoctorsList from './Admin/pages/Admin/DoctorsList';
import AddDoctor from './Admin/pages/Admin/AddDoctor';
import AllAppointments from './Admin/pages/Admin/AllApointments';
import DoctorsAppointment from './Admin/pages/Doctor/DoctorsAppointment'
import DoctorDashboard from './Admin/pages/Doctor/DoctorDashboard';
import DoctorProfile from './Admin/pages/Doctor/DoctorProfile';

// Frontend Components
import Home from './pages/Home';
import Doctor from './pages/Doctor';
import About from './pages/About';
import MyProfile from './pages/MyProfile';
import Login from './pages/Login';
import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import NavbarFrontend from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import PaymentSuccess from './pages/PaymentSuccess'

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      <ToastContainer />
      {atoken || dToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              {/* Admin Routes */}
              {/* <Route path="/" element={<AdminDashboard />} /> */}
              <Route path="/admin-dashbord" element={<AdminDashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />

              {/* Doctor Routes */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorsAppointment />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="mx-4 sm:mx-[10%]">
          <NavbarFrontend />
          <PageTransition>
            <Routes>
              {/* Frontend Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/doctors/:speciality" element={<Doctor />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/my-appointment" element={<MyAppointment />} />
              <Route path="/my-appointment/:docId" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            </Routes>
          </PageTransition>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
