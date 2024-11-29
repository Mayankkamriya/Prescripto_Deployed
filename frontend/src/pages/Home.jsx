import React from 'react'
import Header from '../components/Header' 
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {

  const isLoggedIn = localStorage.getItem('token');
  return (
    <div>
    <Header/>
    <SpecialityMenu/>
    <TopDoctors/>
    { !isLoggedIn && <Banner/> }
  </div>
  )
}

export default Home