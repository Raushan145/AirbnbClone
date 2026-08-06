import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Nav from '../Component/Nav'
import { RiDeleteBin6Line } from "react-icons/ri";
import logo from "../assets/logo2.jpeg";
import { IoIosSearch } from "react-icons/io";
import { userDataContext } from '../Context/UserContext';
import { CgProfile } from "react-icons/cg";
import {GiHamburgerMenu} from "react-icons/gi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { ServerURL } from '../App';
import Footer from '../Component/Footer'
import { bookingDataContect } from '../Context/BookingContext'
import { RazorPayDataContext } from '../Context/RazorpayContext'

const MyBooking = () => {

    const { userData, setUserData, getCurrentUser } = useContext(userDataContext);
    const { updateBookingPayment } = useContext(bookingDataContect);
      const { checkOutHandler } = useContext(RazorPayDataContext);
      const [showMenu, setShowMenu] = useState(false);
      const [cancelBookingId, setCancelBookingId] = useState(null);
      const [cancelReason, setCancelReason] = useState("");
      const navigate = useNavigate();
      const [hostModal, setHostModal] = useState(null);
      const [loading, setLoading] = useState(true);


        // const {fetchReservations,reservations,setReservations} = useContext(ReservationDataContext)
      
      
      // Get last 10 bookings
      const allBookings = userData?.Booking || [];
      const lastTenBookings = allBookings.slice(-10).reverse();
      const activeBookings = allBookings.filter((item) => (item?.status === "booked" || item?.status === "active"));
      const cancelledBookings = allBookings.filter((item) => item?.status === "cancelled_by_host" || item?.status === "cancelled_by_guest");

      console.log(userData?.Booking)
      // console.log(userData?.Booking?.Payment.paymentStatus);
      

  const handleLogout = async () => {
    try {
      await axios.post(
        `${ServerURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUserData(null);
      toast.success("Logout Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if(cancelReason.trim() === ""){
      return toast.error("Please provide a reason for cancellation");
    }
    try {
     await axios.delete(`${ServerURL}/api/booking/cancle/${bookingId}`, {
        data: {
          cancelReason,
        },
        withCredentials: true,
      });

      toast.success("Booking Cancelled Successfully");
      await getCurrentUser();
      setCancelBookingId(null);
      setCancelReason("");
    } catch (err) {
      console.error("Cancel Booking Error:", err); 
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`${ServerURL}/api/booking/delete/${bookingId}`, {
        withCredentials: true,
      });
      toast.success("Booking deleted from history");
      await getCurrentUser();
    } catch (err) {
      console.error("Delete Booking Error:", err);
      toast.error(err.response?.data?.message || "Failed to delete booking");
    }
  };

  const handlePay = (booking) => {
    // console.log('Handle PAy Api Hit')
    //   console.log(booking)
    //   console.log(booking?.Payment?.amount)
    //   console.log(booking._id)
      const BookingId = booking._id;
      const amount = booking?.Payment?.amount
      checkOutHandler(amount ,BookingId)
      getCurrentUser()
  }

  // useEffect(() => {
  //   const handleClick = () => {
  //     setShowMenu(false);
  //   };
  
  //   window.addEventListener("click", handleClick);
  
  //   return () => {
  //     window.removeEventListener("click", handleClick);
  //   };
  // }, []);

    
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 bg-white z-50 w-full">
        <div className="w-full h-17 shadow flex justify-between items-center md:px-10 px-2">
          <img
            src={logo}
            className="md:w-[130px] w-[80px] cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="hidden md:flex md:justify-center md:items-center px-4 py-2 w-[40%] rounded-2xl bg-zinc-100">
            <input
              placeholder="Any Where | Any Location | Any City"
              className="w-full bg-transparent outline-none"
            />
            <IoIosSearch size={20}/>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/Reservations-Dashboard")}
              className="hidden md:block bg-zinc-100 px-4 py-2 rounded-full hover:bg-zinc-200 cursor-pointer"
            >
              Reservations
            </button>
            <button
              onClick={() => navigate("/listingpage1")}
              className="hidden md:block bg-zinc-100 px-4 py-2 rounded-full hover:bg-zinc-200 cursor-pointer"
            >
              List Your Home
            </button>
            <div className="relative flex items-center gap-3 bg-zinc-100 px-4 py-2 rounded-full">
              {userData ? (
                <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex justify-center items-center">
                 {userData?.fullName?.charAt(0)}
                </span>
              ) : (
                <CgProfile size={24} />
              )}
              <GiHamburgerMenu
                size={22}
                className="cursor-pointer"
                onClick={() => {
               
                setShowMenu(prev => !prev)}}
              />
              {showMenu && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow w-56">
                  <div className="flex items-center gap-3">
                   <span className="w-9 h-9 rounded-full ml-2 mt-5 mb-3 bg-blue-500 text-white flex justify-center items-center overflow-hidden">
                    {userData?.profileImg ? (
                      <img src={userData.profileImg} alt="Profile" className="w-full h-full object-cover" />
                    ) : userData?.fullName ? (
                      userData.fullName.charAt(0).toUpperCase()
                    ) : (
                      <CgProfile size={24} />
                    )}
                  </span>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-600">{userData?.fullName || "Hello"}</h3>
                      <h4 className="text-[0.7rem] font-semibold text-cyan-950">{userData?.email || "Welcome back!"}</h4>
                    </div>
                  </div>
                  {!userData ? (
                    <div onClick={() => navigate("/signin")} className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                      Login
                    </div>
                  ) : (
                    <div onClick={handleLogout} className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                      Logout
                    </div>
                  )}
                  <div onClick={() => navigate("/listingpage1")} className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                    List Your Home
                  </div>
                   <div
                      onClick={() => navigate("/Reservations-Dashboard")}
                      className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Reservations
                    </div>
                  <div onClick={() => navigate("/mylisting")} className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                    My Listing
                  </div>
                  <div onClick={() => navigate("/mybooking")} className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                    My Booking
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <h1 className="text-3xl w-[100%] text-center font-bold mb-8 absolute left-3 top-20 z-40">
        My Booking
      </h1>

      <div className="pt-[140px] max-w-6xl mx-auto px-4 pb-10">
        {/* Active Bookings */}
       
       {activeBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">

            <div className="text-6xl mb-4">
              🏡
            </div>

            <h2 className="text-3xl font-bold text-gray-700">
              No Current Bookings
            </h2>

            <p className="text-gray-500 mt-2 text-lg">
              You don't have any active bookings right now.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Continue Booking
            </button>

          </div>
        ) : (
          activeBookings.map((booking) => {
            const listing = booking.Listing || {};
            const host = booking.host || {};

          return (
                <div
                  key={booking._id}
                  className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition flex md:flex-row flex-col overflow-hidden"
                >
                  <div className="md:w-[350px] w-full h-[250px] flex-shrink-0">
                    <img
                      src={listing.image1 || ""}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 px-6 py-4">

                    <div className='flex justify-between gap-3 flex-col md:flex-row'>

                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                          {listing.title || "Untitled Listing"}
                        </h1>

                        <p className="text-gray-500">
                          • {listing.category || "Listing"} • {listing.city || "-"} •{" "}
                          {listing.landmark || "-"}
                        </p>
                      </div>


                    
                    </div>

                    {/* Badges */}
                            <div className="flex flex-wrap gap-3 md:justify-end items-start h-fit">
                              <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-green-100 text-green-700">
                              {booking.status}
                              </span>

                              <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-cyan-100 text-cyan-700">
                                {booking.Payment?.paymentStatus}
                              </span>

                              <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-orange-100 text-orange-700">
                                {booking.Payment?.method === "razorpay" ? "Online" : booking.Payment?.method}
                              </span>
                            </div>
                    </div>

                    <hr className="my-3" />

                    <div className="grid md:grid-cols-3 grid-cols-2 gap-3 text-sm">

                      {/* Host Details */}
                      <div>
                        <p className="text-gray-400">Host Name</p>
                        <h3 className="font-semibold">
                          {host?.fullName}
                        </h3>
                      </div>
                      <div>
                        <p className="text-gray-400">Host Email</p>
                        <h3 className="font-semibold">
                        {host?.email}
                        </h3>
                      </div>

                      {/* CheckIn - checkOut Details */}
                      <div>
                        <p className="text-gray-400">Check In</p>
                        <h3 className="font-semibold">
                          {new Date(booking.checkIn).toLocaleDateString("en-IN")}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-400">Check Out</p>
                        <h3 className="font-semibold">
                          {new Date(booking.checkOut).toLocaleDateString("en-IN")}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-400">Total Rent</p>
                        <h3 className="text-lg font-bold text-green-600">
                          ₹{booking?.Payment?.amount}
                        </h3>
                      </div>

                      {/* <div>
                        <p className="text-gray-400">Status</p>
                        <h3 className="text-lg font-bold text-green-600">
                            Confirm
                        </h3>
                      </div> */}
                    </div>

                    {/* Button for navigate other case */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      <button
                        onClick={() => setHostModal(host)}
                        className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs py-2.5 whitespace-nowrap  rounded-xl bg-blue-600 text-white  hover:bg-blue-700"
                      >
                        View Owner
                      </button>

                      <button
                        onClick={() => setCancelBookingId(booking._id)}
                        className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs  py-2.5 whitespace-nowrap  rounded-xl bg-red-500 text-white hover:bg-red-600"
                      >
                        Cancel
                      </button>


                {booking.Payment?.method !== "razorpay" && (
                      <button
                        onClick={()=> {handlePay(booking)}}
                        className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs  py-2.5 whitespace-nowrap  rounded-xl bg-yellow-400 text-white font-medium hover:bg-yellow-500 transition"
                      >
                        pay
                      </button>
                )}

                    
                    </div>


                  </div>

                </div>
              );
  })
)}


        {/* Cancelled History */}
        {cancelledBookings.length > 0 && (
          <div className="mb-10">
             <h2 className="text-2xl font-bold mb-5">Cancelled History</h2>
            <div className="flex flex-col gap-5">
              {cancelledBookings.map((booking) => {
                const listing = booking.Listing || {};
                const isCancelledByGuest = booking.status === 'cancelled_by_guest';
                return (
                  <div
                    key={booking._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg duration-300 p-5 border"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      {/* Left */}
                      <div className="flex gap-4">
                        <img
                          src={listing.image1}
                          alt={listing.title}
                          className="w-42 h-40 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="text-xl font-bold">
                            {listing.title || "Untitled Listing"}
                          </h3>

                          <p className="text-gray-500">
                            {listing.category} • {listing.city}
                          </p>

                       </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col items-start md:items-end gap-2 pr-10  relative">
                        <span
                          className="absolute right-0 -top-4 h-7 w-7 rounded-full bg-zinc-200 flex justify-center items-center cursor-pointer text-black font-bold active:scale-95"
                          onClick={() => {
                            handleDeleteHistory(booking._id);
                          }}
                        >
                          <RiDeleteBin6Line />
                        </span>

                        {booking.status === "cancelled_by_guest" && (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Cancelled by Guest
                          </span>
                        )}

                        {booking.status === "cancelled_by_host" && (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Cancelled by Host
                          </span>
                        )}

                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Check In:</span>{" "}
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>

                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Check Out:</span>{" "}
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>

                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Total Rent:</span> ₹
                          {booking.totalRent}
                        </p>

                        {booking.cancelReason && (
                          <p className="text-sm text-red-500 max-w-xs text-right">
                            <span className="font-semibold">Reason:</span>{" "}
                            {booking.cancelReason}
                          </p>
                        )}

                        {booking.cancelledAt && (
                          <p className="text-xs text-gray-400">
                            Cancelled on{" "}
                            {new Date(booking.cancelledAt).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {lastTenBookings.length === 0 && (
          <div className="text-3xl text-gray-500 mt-20 text-center">
            No Bookings Found
          </div>
        )}
      </div>

      {/* Cancel Booking Modal */}
      {cancelBookingId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800">Cancel booking?</h3>
            <p className="text-sm text-gray-600 mt-2">Please provide a reason for cancellation</p>
            <textarea
              value={cancelReason}
              onChange={(e)=>setCancelReason(e.target.value)}
              placeholder="Why are you cancelling this booking?"
              className="w-full h-20 border rounded-lg p-3 mt-3 resize-none outline-none"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setCancelBookingId(null);
                  setCancelReason("");
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                No
              </button>
              <button
                onClick={() => handleCancelBooking(cancelBookingId)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
{/* 
       {hostModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
              <h3 className="text-lg font-semibold">Owner Details</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">Name:</span> {hostModal.fullName || 'Guest'}</p>
                <p><span className="font-semibold">Email:</span> {hostModal.email || '-'}</p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setGuestModal(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )} */}

        {hostModal && (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">

      <div className="flex flex-col items-center">

        {hostModal.profileImg ? (
          <img
            src={hostModal.profileImg}
            alt="Owner"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
            {hostModal.fullName?.charAt(0)}
          </div>
        )}

        <h2 className="text-xl font-bold mt-4">
          {hostModal.fullName}
        </h2>

        <p className="text-gray-600">
          {hostModal.email}
        </p>

        {hostModal.mobileNo && (
          <p className="text-gray-600 mt-2">
            📞 {hostModal.mobileNo}
          </p>
        )}

      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setHostModal(null)}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

    <Footer />
    </>
  )
}

export default MyBooking
