import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { ServerURL } from '../App';
import { userDataContext } from './UserContext';
import { listingDataContext } from './ListingContex';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { getCurrentUser } from '../../../backend/controllers/userController';

export const bookingDataContect = createContext();
const BookingContext = ({children}) => {

    const navigate = useNavigate();

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [totalRent, setTotalRent] = useState(0)
    const [totalCharges, setTotalCharges] = useState(0)
    const [night, setNight] = useState(0)
    const [tax, setTax] = useState(0)
    const [charges, setCharges] = useState(0);
    const {getCurrentUser} = useContext(userDataContext)
    const {getListing} = useContext(listingDataContext)
    const [bookingData, setBookingData] = useState(() => {
      try {
        const stored = sessionStorage.getItem("bookingData");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    })

    const handleBooking = async (id) =>{

        try {
            
             const result = await axios.post(`${ServerURL}/api/booking/create/${id}`,{checkIn,checkOut,totalRent:totalCharges} ,{ withCredentials: true })
            
            await getCurrentUser()
            await getListing()
            setBookingData(result.data)
            try {
              sessionStorage.setItem("bookingData", JSON.stringify(result.data));
            } catch (e) {
              console.warn("Unable to persist booking data", e);
            }
            console.log(result.data)
            toast.success("Booking Successful")
            navigate("/booked")
        } catch (error) {
            console.log(error)
            setBookingData(null)
            toast.error(error.response?.data?.message || "Booking failed")
         }

    }


    const handleCancelBooking = async (id) =>{

        try {  
             const result = await axios.delete(`${ServerURL}/api/booking/cancle/${id}` ,{ withCredentials: true })
            
            await getCurrentUser()
            await getListing()

         
            console.log(result.data)
            toast.success("cancel Booking")
            navigate("/")

        } catch (error) {
            console.log(error)
           console.error("Cancle BOOking" , error)

         }

    }



    let value = {

        checkIn, setCheckIn,
        checkOut, setCheckOut,
        totalCharges, setTotalCharges,
        totalRent,setTotalRent,
        night, setNight,
        tax,setTax,
        charges,setCharges,
        bookingData,setBookingData,
        handleBooking

    }
  return (
    <div>
        <bookingDataContect.Provider value={value}>
            {children}
        </bookingDataContect.Provider>
    </div>
  )
}

export default BookingContext
