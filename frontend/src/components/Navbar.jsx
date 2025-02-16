
// logout not naviagating to login in mobile.
import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };


   // Close menu when clicking outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      const hamburger = event.target.closest('button');
      const menu = document.getElementById("mobileMenu");
      if (menu && !menu.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);



  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-green relative">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* Hamburger Icon for Mobile View */}
     
      {window.innerWidth <= 768 && (
         <button
        className="md:hidden flex items-center focus:outline-none"
        // onClick={() => setShowMenu(!showMenu)}
        onClick={(event) => {
          event.stopPropagation(); // Prevent the click from propagating
          setShowMenu(!showMenu);
        }}
      
      >
        <img src={assets.Hamburger} alt="Menu" className="w-6 h-6" />
      </button>
      )}

        <ul
        id="mobileMenu"
  className={`${
    showMenu ? 'flex' : 'hidden'
  } flex-col absolute top-16 left-0 w-full bg-white md:static md:flex md:flex-row md:items-start md:gap-5 md:w-auto`}
>
       <NavLink to='/'>
         <li  onClick={() => setShowMenu(false)}  className='py-2' >HOME</li>
         {window.innerWidth >= 768 && (
         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
         )}
       </NavLink>
       <NavLink to="/doctor" 
  onClick={(e) => {
    e.preventDefault(); // Prevent React Router's default behavior
    setShowMenu(false); // Close the menu
    window.location.href = '/doctor'; // Perform navigation and refresh
  }} >
       <li className='py-2' >All DOCTOR</li>
       {window.innerWidth >= 768 && (
         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
       )}
       </NavLink>
       <NavLink to='/about'>
         <li  onClick={() => setShowMenu(false)}  className='py-2' >ABOUT</li>
         {window.innerWidth >= 768 && (
         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
         )}
       </NavLink>
       <NavLink to='/contact'>
         <li  onClick={() => setShowMenu(false)}  className='py-2' >CONTACT</li>
         {window.innerWidth >= 768 && (
         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
         )}
       </NavLink>

{!token && (
  <NavLink to="/login" onClick={() => setShowMenu(false)} className="md:hidden">
    <li className="py-2 cursor-pointer">SIGN UP / LOGIN</li>
  </NavLink>
)}

{window.innerWidth <= 768 && (
token && userData ? (<div>
<NavLink to="/my-profile" onClick={() => setShowMenu(false)} className="md:hidden">
    <li className="py-2 cursor-pointer">MY PROFILE</li>
  </NavLink>
  <NavLink to="/my-appointment" onClick={() => setShowMenu(false)} className="md:hidden">
    <li className="py-2 cursor-pointer">MY APPOINTMENT</li>
  </NavLink>
  {/* <NavLink  onClick={() => { setShowMenu(false); logout()}} className="md:hidden">
    <li className="py-1 cursor-pointer">LOG OUT</li>
  </NavLink> */}
    <li onClick={() => { setShowMenu(false); logout(); }} className="py-2 cursor-pointer md:hidden">LOG OUT</li>

</div>):null

)}
      </ul>

      {/* Profile or Login/Signup Button */}
      {window.innerWidth >= 768 && (
      <div className="hidden md:flex items-center gap-4">
        {token && userData ? (
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="Profile"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />

            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity hidden group-hover:block z-10">
              <p
                onClick={() => navigate('/my-profile')}
                className="hover:text-black cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate('/my-appointment')}
                className="hover:text-black cursor-pointer"
              >
                My Appointment
              </p>
              <p onClick={logout} className="hover:text-black cursor-pointer">
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light"
          >
            Create Account / Login
          </button>
        )}
      </div>
      )}
    </div>
  );
};

export default Navbar;


// logout not naviagating to login in mobile. any out side click is not closing showmenu
// import React, { useContext, useState } from 'react';
// import { assets } from '../assets/assets';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { token, setToken, userData } = useContext(AppContext);

//   const [showMenu, setShowMenu] = useState(false);

//   const logout = () => {
//     setToken(false);
//     localStorage.removeItem('token');
//     navigate('/login', { replace: true });
//   };

//   return (
//     <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-green relative">
//       {/* Logo */}
//       <img
//         onClick={() => navigate('/')}
//         className="w-44 cursor-pointer"
//         src={assets.logo}
//         alt="logo"
//       />

//       {/* Hamburger Icon for Mobile View */}
//       <button
//         className="md:hidden flex items-center focus:outline-none"
//         onClick={() => setShowMenu(!showMenu)}
//       >
//         <img src={assets.Hamburger} alt="Menu" className="w-6 h-6" />
//       </button>

//         <ul
//   className={`${
//     showMenu ? 'flex' : 'hidden'
//   } flex-col absolute top-16 left-0 w-full bg-white md:static md:flex md:flex-row md:items-start md:gap-5 md:w-auto`}
// >
//        <NavLink to='/'>
//          <li  onClick={() => setShowMenu(false)}  className='py-1' >HOME</li>
//          {window.innerWidth >= 768 && (
//          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//          )}
//        </NavLink>
//        <NavLink to='/doctor' >
//        <li  onClick={() => setShowMenu(false)}  className='py-1' >All DOCTOR</li>
//        {window.innerWidth >= 768 && (
//          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//        )}
//        </NavLink>
//        <NavLink to='/about'>
//          <li  onClick={() => setShowMenu(false)}  className='py-1' >ABOUT</li>
//          {window.innerWidth >= 768 && (
//          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//          )}
//        </NavLink>
//        <NavLink to='/contact'>
//          <li  onClick={() => setShowMenu(false)}  className='py-1' >CONTACT</li>
//          {window.innerWidth >= 768 && (
//          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//          )}
//        </NavLink>

// {!token && (
//   <NavLink to="/login" onClick={() => setShowMenu(false)} className="md:hidden">
//     <li className="py-1 cursor-pointer">SIGN UP / LOGIN</li>
//   </NavLink>
// )}

// {window.innerWidth <= 768 && (
// token && userData ? (<div>
// <NavLink to="/my-profile" onClick={() => setShowMenu(false)} className="md:hidden">
//     <li className="py-1 cursor-pointer">MY PROFILE</li>
//   </NavLink>
//   <NavLink to="/my-appointment" onClick={() => setShowMenu(false)} className="md:hidden">
//     <li className="py-1 cursor-pointer">MY APPOINTMENT</li>
//   </NavLink>
//   <NavLink  onClick={() => { setShowMenu(false); logout()}} className="md:hidden">
//     <li className="py-1 cursor-pointer">LOG OUT</li>
//   </NavLink>

// </div>):null

// )}
//       </ul>

//       {/* Profile or Login/Signup Button */}
//       <div className="hidden md:flex items-center gap-4">
//         {token && userData ? (
//           <div className="relative flex items-center gap-2 cursor-pointer group">
//             <img
//               className="w-8 rounded-full"
//               src={userData.image}
//               alt="Profile"
//             />
//             <img
//               className="w-2.5"
//               src={assets.dropdown_icon}
//               alt="Dropdown Icon"
//             />

//             {/* Dropdown Menu */}
//             <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity hidden group-hover:block z-10">
//               <p
//                 onClick={() => navigate('/my-profile')}
//                 className="hover:text-black cursor-pointer"
//               >
//                 My Profile
//               </p>
//               <p
//                 onClick={() => navigate('/my-appointment')}
//                 className="hover:text-black cursor-pointer"
//               >
//                 My Appointment
//               </p>
//               <p onClick={logout} className="hover:text-black cursor-pointer">
//                 Logout
//               </p>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate('/login')}
//             className="bg-primary text-white px-8 py-3 rounded-full font-light"
//           >
//             Create Account / Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;




// orginal 
// import React, { useContext, useState } from 'react'
// import {assets} from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Navbar = () => {

//   const navigate = useNavigate()
//   const {token,setToken, userData} = useContext(AppContext)

// const [showMenu, setShowMenu]= useState(false)

//   const logout = ()=>{
//     setToken( false )
//     localStorage.removeItem('token')
//     navigate('/login', { replace: true })
//   }

//   return (
//     <div className='flex item-center justify-between text-sm py-4 mb-5 border-b border-b-green'>
//       <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo" />

//     <ul className='hidden md:flex items-start gap-5 front-medium'>  {/* 'md:flex hidden' for display hidden and none in medium size screen*/}
//       <NavLink to='/'>
//         <li className='py-1' >HOME</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//       </NavLink>
//       <NavLink to='/doctor' >
//         <li className='py-1' >All DOCTOR</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//       </NavLink>
//       <NavLink to='/about'>
//         <li className='py-1' >ABOUT</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//       </NavLink>
//       <NavLink to='/contact'>
//         <li className='py-1' >CONTACT</li>
//         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//       </NavLink>
//     </ul>
//     <div className='flex items-center gap-4'>{
//       token && userData
//       ? 

//       <div className="relative flex items-center gap-2 cursor-pointer group">
//   {/* Profile Picture and Dropdown Icon */}
//   <div className="flex items-center gap-2 cursor-pointer">
//     <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
//     <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
//   </div>

//   {/* Dropdown Menu */}
//   <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4         opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity         hidden group-hover:block z-10">
//     <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
//     <p onClick={() => navigate('/my-appointment')} className="hover:text-black cursor-pointer">My Appointment</p>
//     <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
//   </div>
// </div>

//       :<button onClick={() =>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Accout / Login</button>
//   }
//     </div>


//     </div>
//   )
// }

// export default Navbar