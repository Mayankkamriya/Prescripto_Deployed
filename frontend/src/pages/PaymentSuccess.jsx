import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";
import { useEffect, useContext,useState } from "react";
import { AppContext } from '../context/AppContext'

const PaymentStatus = () => {
  const navigate = useNavigate();
  const { token, getUserAppointments  } = useContext(AppContext)
const [paymentDetails, setPaymentDetails] = useState(null); 

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    const details = searchParams.get('paymentDetails');
  //  console.log('details....',details)
    if (details) {
      setPaymentDetails(JSON.parse(decodeURIComponent(details))); // Parse and storing payment details
    
    }
    if (token) {
      getUserAppointments()
    }
  },[token, location.search])



  return (
    <div className="payment-status-container">
      <div className="order-success">
        <FaCheckCircle className="success-icon" />
        <h1 className="order-success-text">Order Placed Successfully!</h1>
      </div>
      <div className="button-group">
      
        <button className="view-order-button" onClick={() => navigate(`/my-appointment?paymentDetails=${encodeURIComponent(JSON.stringify(paymentDetails))}`)}>
          View Appointment
        </button>
        <button className="continue-shopping-button" onClick={() => navigate("/")}>
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;