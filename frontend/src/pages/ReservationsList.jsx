import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import logo from "../assets/logo2.jpeg";
import { IoIosSearch } from "react-icons/io";
import { userDataContext } from '../Context/UserContext';
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { ServerURL } from '../App';
   import { RiDeleteBin6Line } from "react-icons/ri";


const ReservationsList = () => {
   const { userData, setUserData, getCurrentUser } = useContext(userDataContext);
   const [showMenu, setShowMenu] = useState(false);
   const [reservations, setReservations] = useState([]);
   const [loading, setLoading] = useState(true);
   const [guestModal, setGuestModal] = useState(null);
   const [cancelBookingId, setCancelBookingId] = useState(null);
   const [cancelReason, setCancelReason] = useState("");
  const navigate = useNavigate()

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

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${ServerURL}/api/booking/host`, { withCredentials: true });
      const bookings = Array.isArray(result.data) ? result.data : [];
      setReservations(bookings);

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

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (cancelReason.trim() === "") {
      return toast.error("Please provide a reason for cancellation");
    }
    console.log("Booking Cancel hIt ")
    try {
      await axios.delete(`${ServerURL}/api/booking/cancle/${bookingId}`, {
        data: {
          cancelReason,
        },
        withCredentials: true,
      });
      toast.success("Booking Cancelled Successfully");
      setCancelBookingId(null);
      setCancelReason("");
      await getCurrentUser();
      fetchReservations();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const handleDeleteHistory = async (id) =>{
   try {
     console.log("handleDeleteHistory Hit")
    console.log(booking.status)
    console.log(id)
   } catch (error) {
    console.log(error)
   }
  }

  const activeReservations = (reservations || []).filter((booking) => booking?.status === 'booked');
  const cancelledReservations = (reservations || []).filter((booking) => booking?.status !== 'booked');

  return (
    <>

         {/* Nav */}
         <nav className="fixed top-0 bg-white z-500 w-full">
      
            {/* Navbar */}
      
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
                    onClick={() => setShowMenu(!showMenu)}
                  />
      
                  {showMenu && (
                    <div className="absolute right-0 top-12 bg-white rounded-lg shadow w-56">
      
                      <div className="flex  items-center gap-3 ">
                       <span className="w-9 h-9 rounded-full ml-2 mt-5 mb-3 bg-blue-500 text-white flex justify-center items-center overflow-hidden">
                        {userData?.profileImg ? (
                          <img
                            src={userData.profileImg}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : userData?.fullName ? (
                          userData.fullName.charAt(0).toUpperCase()
                        ) : (
                          <CgProfile size={24} />
                        )}
                      </span>
      
                        <div>
                          <h3 className="text-lg font-bold text-cyan-600"> {userData?.fullName || "Hello"}</h3>
                          <h4 className="text-[0.7rem] font-semibold text-cyan-950">{userData?.email || "Welcome back to Airbnb!"}</h4>
                        </div>
                      </div>
      
                      {!userData ? (
                        <div
                          onClick={() => navigate("/signin")}
                          className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                        >
                          Login
                        </div>
                      ) : (
                        <div
                          onClick={handleLogout}
                          className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                        >
                          Logout
                        </div>
                      )}
      
                      <div
                        onClick={() => navigate("/listingpage1")}
                        className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        List Your Home
                      </div>

                       <div
                          onClick={() =>{ navigate("/Reservations-Dashboard")
                            setShowMenu(false)
                          }}
                          className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                        >
                          Reservations
                        </div>
      
                      <div
                        onClick={() => navigate("/mylisting")}
                        className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        My Listing
                      </div>
      
                      <div
                        onClick={() => navigate("/mybooking")}
                        className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        My Booking
                      </div>
      
                    </div>
                  )}
      
                </div>
      
              </div>
      
            </div>
      
      
          </nav>

           <h1 className="text-3xl w-[100%] text-center font-bold mb-8 absolute left-3 top-20 z-50 ">
         Reservations-Dashboard
        </h1>

        <div className="flex flex-wrap gap-6 justify-center pt-[140px] ">
          {loading ? (
            <div className="text-2xl text-gray-500 mt-10">Loading reservations...</div>
          ) : reservations.length === 0 ? (
            <div className="text-3xl text-gray-500 mt-20">No Reservations Found</div>
          ) : (
            <>
              <div className="w-full max-w-6xl">
                <h2 className="text-xl font-bold mb-4">Active Reservations (Last 10)</h2>
              </div>
              {activeReservations.map((booking) => {
              const listing = booking.Listing || {};
              const guest = booking.guest || {};
              return (
                <div key={booking._id} className="w-[95%] max-w-6xl bg-white rounded-2xl shadow-md hover:shadow-xl transition flex md:flex-row flex-col overflow-hidden">
                  <div className="md:w-[380px] w-full px-10 md:pb-0 pb-2 h-[300px] flex items-center justify-center">
                    <img src={listing.image1 || ''} alt={listing.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 px-10 pb-5">
                    <div className="flex justify-between items-start gap-4 relative">
                      <span className="px-3 py-1 rounded-full absolute right-3 top-1 text-sm font-semibold bg-green-100 text-green-700">
                        Booked
                      </span>
                      <div className='flex-1'>
                        <h1 className="text-2xl font-bold mt-2">{listing.title || 'Untitled Listing'}</h1>
                        <p className="text-gray-500">• {listing.category || 'Listing'} • {listing.city || '-'} • {listing.landmark || '-'}</p>
                      </div>
                    </div>

                    <hr className="my-2"/>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-y-2">
                      <div>
                        <p className="text-gray-400">Guest Name</p>
                        <h3 className="font-semibold">{guest.fullName || 'Guest'}</h3>
                      </div>
                      <div>
                        <p className="text-gray-400">Guest Email</p>
                        <h3 className="font-semibold">{guest.email || '-'}</h3>
                      </div>
                      <div>
                        <p className="text-gray-400">Check In</p>
                        <h3>{new Date(booking.checkIn).toLocaleDateString('en-IN')}</h3>
                      </div>
                      <div>
                        <p className="text-gray-400">Check Out</p>
                        <h3>{new Date(booking.checkOut).toLocaleDateString('en-IN')}</h3>
                      </div>
                      <div>
                        <p className="text-gray-400">Total Rent</p>
                        <h3 className="text-xl font-bold text-green-600">₹{booking.totalRent || 0}</h3>
                      </div>
                      <div>
                        <p className="text-gray-400">Status</p>
                        <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700">
                          Confirmed
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setGuestModal(guest)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        View Guest
                      </button>
                      <button
                        onClick={() => setCancelBookingId(booking._id)}
                        className="px-5 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  </div>
                </div>
              );
              })}

           {cancelledReservations.length > 0 && (
              <div className="w-full max-w-6xl mt-8 mb-5">
                <h2 className="text-2xl font-bold mb-5">
                  Cancelled History
                </h2>

                <div className="flex flex-col gap-5">
                  {cancelledReservations.map((booking) => {
                    const listing = booking.Listing || {};
                    const guest = booking.guest || {};

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

                              <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Guest :</span>{" "}
                                {guest.fullName}
                              </p>

                              <p className="text-gray-500 text-sm">
                                {guest.email}
                              </p>
                            </div>

                          </div>

                          {/* Right */}
                          <div className="flex flex-col items-start md:items-end gap-2 pr-10  relative">
                            <span className='absolute right-0 -top-4 h-7 w-7 rounded-full bg-zinc-200 flex justify-center items-center cursor-pointer text-black font-bold active:scale-95'
                            onClick={()=> {handleDeleteHistory(booking._id)} }><RiDeleteBin6Line /></span>

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
                              {new Date(booking.checkIn).toLocaleDateString("en-IN")}
                            </p>

                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Check Out:</span>{" "}
                              {new Date(booking.checkOut).toLocaleDateString("en-IN")}
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
                                {new Date(booking.cancelledAt).toLocaleString("en-IN")}
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




            </>
          )}
        </div>

        {cancelBookingId && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800">Cancel booking?</h3>
              <p className="text-sm text-gray-600 mt-2">Do you want to cancel this booking?</p>
                <textarea
                  value={cancelReason}
                  onChange={(e)=>setCancelReason(e.target.value)}
                  // disabled={!cancelReason.trim()}
                  placeholder="Why are you cancelling this booking?"
                  className="w-full h-20 border rounded-lg p-3 mt-3 resize-none outline-none required"
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
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {guestModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
              <h3 className="text-lg font-semibold">Guest Details</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">Name:</span> {guestModal.fullName || 'Guest'}</p>
                <p><span className="font-semibold">Email:</span> {guestModal.email || '-'}</p>
                <p><span className="font-semibold">Mobile No. :</span> {guestModal.mobileNo|| '-'}</p>
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
        )}


      
      
    </>
  )
}

export default ReservationsList
