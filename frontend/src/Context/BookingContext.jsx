import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { ServerURL } from "../App";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const bookingDataContect = createContext();

const BookingContext = ({ children }) => {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalRent, setTotalRent] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);
  const [night, setNight] = useState(0);
  const [tax, setTax] = useState(0);
  const [charges, setCharges] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [createBookingLoading, setCreateBookingLoading] = useState(false);
  const [payingLoading, setPayingLoading] = useState(false);

  const { getCurrentUser } = useContext(userDataContext);
  const { getListing } = useContext(listingDataContext);
  const [checkOutLoading, setCheckOutLoading] = useState(false)

  const [bookingData, setBookingData] = useState(() => {
    try {
      const stored = sessionStorage.getItem("bookingData");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const { cardDetails } = useContext(listingDataContext);
  
 const savedBooking = JSON.parse(
  sessionStorage.getItem("bookingInfo") || "{}"
);

console.log("Saved Bookin",  JSON.parse(
  sessionStorage.getItem("bookingInfo") || "{}"
))

  const handleBooking = async (
    listingId,
    paymentInfo = {}
  ) => {
    try {
      setCreateBookingLoading(true);
        // console.log("Frontend CheckIn:", checkIn);
        console.log("Frontend Payment:", paymentMethod);

      
      const payload = {
        checkIn:savedBooking?.checkIn,
        checkOut:savedBooking?.checkOut,
        totalRent: savedBooking?.totalRent,
        totalCharges: savedBooking?.totalCharge,
        night:savedBooking?.night,
        cleaningFee: savedBooking?.charges,
        serviceFee: serviceCharge,
        taxes: savedBooking?.tax,
        paymentMethod,

        ...paymentInfo,
      };

      const result = await axios.post(
        `${ServerURL}/api/booking/create/${listingId}`,
        payload,
        {
          withCredentials: true,
        }
      );

      await getCurrentUser();
      await getListing();

      setBookingData(result.data);

      sessionStorage.setItem(
        "bookingData",
        JSON.stringify(result.data)
      );

      toast.success("Booking Successful");
      navigate("/booked")
      
  sessionStorage.removeItem("bookingInfo");
      return result.data;
    } catch (error) {
      setBookingData(null);
      
  sessionStorage.removeItem("bookingInfo");
      toast.error(
        error.response?.data?.message || "Booking Failed"
      );

      throw error;
    } finally {
      setCreateBookingLoading(false);
      setPayingLoading(false)
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await axios.delete(
        `${ServerURL}/api/booking/cancle/${id}`,
        {
          withCredentials: true,
        }
      );

      await getCurrentUser();
      await getListing();

      toast.success("Booking Cancelled");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  const checkoutBooking = async (bookingId) => {
  try {
    setCheckOutLoading(true);

    const res = await axios.patch(
      `${ServerURL}/api/booking/checkout/${bookingId}`,
      {},
      { withCredentials: true }
    );

    
     console.log("Checkout Success");

  await fetchReservations();
  console.log("Reservations fetched");

  await getCurrentUser();
  console.log("Current user fetched"); // ya fetchReservations()
    toast.success(res.data.message || "Guest Checked Out Successfully");
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Checkout Failed");
  } finally {
    setCheckOut(false);
  }
};

const saveBookingInfo = () => {

   sessionStorage.removeItem("bookingInfo");

  const bookingInfo = {
    checkIn,
    checkOut,
    totalRent,
    totalCharges,
    night,
    tax,
    charges,
    serviceCharge
  };


    sessionStorage.setItem(
      "cardDetails",
      JSON.stringify(cardDetails)
    );


  sessionStorage.setItem(
    "bookingInfo",
    JSON.stringify(bookingInfo)
  );
};

  return (
    <bookingDataContect.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        totalCharges,
        setTotalCharges,
        totalRent,
        setTotalRent,
        night,
        setNight,
        tax,
        setTax,
        charges,
        setCharges,
        serviceCharge,
        setServiceCharge,
        paymentMethod,
        setPaymentMethod,
        bookingData,
        setBookingData,
        createBookingLoading,
        setCreateBookingLoading,
        handleBooking,
        handleCancelBooking,
        checkoutBooking,
        checkOutLoading,
        setCheckOutLoading,
        payingLoading, 
        saveBookingInfo,
        setPayingLoading,
      }}
    >
      {children}
    </bookingDataContect.Provider>
  );
};

export default BookingContext;