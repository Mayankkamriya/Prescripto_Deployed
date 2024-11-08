import React,{useContext, useEffect} from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {atoken,getAllDoctors,doctors} = useContext(AdminContext)

  useEffect(()=>{
    if (atoken) {
      getAllDoctors()
    }
  },[atoken])

  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {   doctors.length > 0 ? (
          doctors.map((item,index)=>(
            <div key={index}>
              <img src={item.image} alt="" />
              <div>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
              </div>
            </div>
          ))
        ):(
          <p>No doctors found</p>
        )}
      </div>
    </div>
  )
}

export default DoctorsList