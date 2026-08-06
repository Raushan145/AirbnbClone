import React, { createContext, useState } from 'react'
import { ServerURL } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ReservationDataContext = createContext();

const ReservationContext = ({children}) => {

      const [reservations, setReservations] = useState([]);
      const [loading, setLoading] = useState(false)
    

 const fetchReservations = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${ServerURL}/api/booking/host`, {
        withCredentials: true,
      });
      const bookings = Array.isArray(result.data) ? result.data : [];
      setReservations(bookings);
      // console.log(bookings)
    } catch (error) {
      console.log(error);
      setReservations([]);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log(error);
      toast.error("Unable to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    fetchReservations,
    reservations,
    setReservations
  }

  return (
    <ReservationDataContext.Provider value={value}>
                {children}
    </ReservationDataContext.Provider>
  )
}

export default ReservationContext
