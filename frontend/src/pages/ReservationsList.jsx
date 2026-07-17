import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo2.jpeg";
import { IoIosSearch } from "react-icons/io";
import { userDataContext } from "../Context/UserContext";
import { BiSolidUserDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { ServerURL } from "../App";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DotLoader } from "react-spinners";
import Footer from "../Component/Footer";
import { bookingDataContect } from "../Context/BookingContext";

const ReservationsList = () => {
  const { userData, setUserData, getCurrentUser } = useContext(userDataContext);
  const [showMenu, setShowMenu] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestModal, setGuestModal] = useState(null);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [checkOutBookingId, setCheckOutBookingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [checkOutDetail, setCheckOutDetail] = useState("");
  const [filterStatus, setFilterStatus] = useState("current");
  const [viewDetails, setViewDetails] = useState(null);
  const [noOfCompleteReservation, setNoOfCompleteReservation] = useState(null);
  const [noOfCurrentReservation, setNoOfCurrentReservation] = useState(null);
  const [noOfUpcomingReservation, setNoOfupComingReservation] = useState(null);
  const [noOfCancelledReservation, setNoOfCancelledReservation] =
    useState(null);
  const navigate = useNavigate();
  const { checkoutBooking } = useContext(bookingDataContect);
  const filter = ["current", "upComing", "complete", "cancelled"];
  const handleLogout = async () => {
    try {
      await axios.post(
        `${ServerURL}/api/auth/logout`,
        {},
        { withCredentials: true },
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

  const handleCancelBooking = async (bookingId) => {
    if (cancelReason.trim() === "") {
      return toast.error("Please provide a reason for cancellation");
    }
    console.log("Booking Cancel hIt ");
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

  const handleDeleteHistory = async (id) => {
    try {
      console.log("handleDeleteHistory Hit");
      console.log(booking.status);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // useEffect(() => {
  //   const handleClick = () => {
  //     setShowMenu(false);
  //   };

  //   window.addEventListener("click", handleClick);

  //   return () => {
  //     window.removeEventListener("click", handleClick);
  //   };
  // }, []);

  const activeReservations = (reservations || []).filter(
    (booking) => booking?.status === "booked",
  );
  const cancelledReservations = (reservations || []).filter(
    (booking) => booking?.status !== "booked",
  );
  const completeReservations = (reservations || []).filter(
    (booking) => booking?.status === "complete",
  );
  const CurrentReservations = (reservations || []).filter(
    (booking) => booking?.status === "current",
  );

  const today = new Date();

  const filteredReservations = reservations.filter((booking) => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);

    switch (filterStatus) {
      case "current":
        return (
          booking.status === "booked" && checkIn <= today && checkOut >= today
        );

      case "upComing":
        return booking.status === "booked" && checkIn > today;

      case "complete":
        return (
          booking.status === "complete" ||
          (booking.status === "booked" && checkOut < today)
        );

      case "cancelled":
        return (
          booking.status === "cancelled_by_guest" ||
          booking.status === "cancelled_by_host"
        );

      default:
        return true;
    }
  });

  const getReservationsByStatus = (status) => {
    const today = new Date();

    return reservations.filter((booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      switch (status) {
        case "current":
          return (
            booking.status === "booked" && checkIn <= today && checkOut >= today
          );

        case "upComing":
          return booking.status === "booked" && checkIn > today;

        case "complete":
          return (
            booking.status === "complete" ||
            (booking.status === "booked" && checkOut < today)
          );

        case "cancelled":
          return (
            booking.status === "cancelled_by_guest" ||
            booking.status === "cancelled_by_host"
          );

        default:
          return false;
      }
    });
  };

  const handleCheckout = async (bookingId) => {
    try {
      await axios.patch(
        `${ServerURL}/api/booking/checkout/${bookingId}`,
        {},
        { withCredentials: true },
      );

      toast.success("Guest Checked Out Successfully");
      await getCurrentUser();
      fetchReservations();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Checkout Failed");
    }
  };

  // const filteredReservation = getReservationsByStatus(filterStatus);

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
            <IoIosSearch size={20} />
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
                onClick={() => {
                  setShowMenu((prev) => !prev);
                }}
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
                      <h3 className="text-lg font-bold text-cyan-600">
                        {" "}
                        {userData?.fullName || "Hello"}
                      </h3>
                      <h4 className="text-[0.7rem] font-semibold text-cyan-950">
                        {userData?.email || "Welcome back to Airbnb!"}
                      </h4>
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
                    onClick={() => {
                      navigate("/Reservations-Dashboard");
                      setShowMenu(false);
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

      <div className="w-[100%] lg:w-[80%] mx-auto flex md:flex-row flex-col gap-2 justify-around items-center text-center font-bold mb-8 absolute  top-20 z-50 ">
        <h1 className="md:text-3xl text-xl ">Reservations-Dashboard</h1>

        <div className="flex border overflow-x-auto whitespace-nowrap mt-2 rounded-xl scrollbar-hide">
          {filter.map((item) => (
            <button
              key={item}
              onClick={() => setFilterStatus(item)}
              className={`flex-shrink-0 md:px-4 md:py-2 px-3 py-2 md:text-lg text-xs rounded-xl font-semibold transition ${
                filterStatus === item
                  ? "bg-black text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {item} ({getReservationsByStatus(item).length})
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-center pt-[140px] ">
        <div className="w-full max-w-6xl">
          {/* <h2 className="text-xl font-bold mb-4">Active Reservations (Last 10)</h2> */}
        </div>

        {filterStatus === "current" &&
          (filteredReservations.length === 0 ? (
            <div className="w-full h-[45vh] flex justify-center mt-20">
              <h1 className="text-3xl font-semibold text-gray-500">
                No Current Booking Found
              </h1>
            </div>
          ) : (
            filteredReservations.map((booking) => {
              const listing = booking.Listing || {};
              const guest = booking.guest || {};

              return (
                <div
                  key={booking._id}
                  className="w-[95%] max-w-6xl bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex md:flex-row flex-col"
                >
                  {/* Image */}
                  <div className="md:w-[320px] w-full md:h-[280px] h-[220px] p-3">
                    <img
                      loading="lazy"
                      src={listing.image1 || ""}
                      alt={listing.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6">
                    {/* Header */}
                    <div className="flex justify-between gap-3 flex-col md:flex-row">
                      <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                          {listing.title || "Untitled Listing"}
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                          {listing.category || "Listing"} •{" "}
                          {listing.city || "-"} • {listing.landmark || "-"}
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-3 md:justify-end items-start h-fit">
                        <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-green-100 text-green-700">
                          {booking?.status}
                        </span>

                        <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-cyan-100 text-cyan-700">
                          {booking?.Payment?.paymentStatus}
                        </span>

                        <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-orange-100 text-orange-700">
                          {booking?.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Details */}
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">Guest Name</p>
                        <p className="font-semibold text-gray-700">
                          {guest.fullName || "Guest"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Guest Email</p>

                        <p className="font-semibold text-gray-700 truncate">
                          {guest.email || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Total Rent</p>

                        <p className="font-bold text-xl text-green-600">
                          ₹{Math.round(booking?.Payment?.amount || 0)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Check In</p>

                        <p className="font-medium">
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Check Out</p>

                        <p className="font-medium">
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Booking Status</p>

                        <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Confirmed
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}

                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={() => setGuestModal(guest)}
                        className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs  py-2.5 whitespace-nowrap  rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                      >
                        View Guest
                      </button>

                    {booking?.Payment?.paymentStatus !== "paid" && (
                      <button
                        onClick={() => setCancelBookingId(booking._id)}
                        className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs  py-2.5 whitespace-nowrap  rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
                      >
                         Confirm Check-In
                      </button>)}

                      {filterStatus === "current" && (
                        <button
                          onClick={() => setCheckOutBookingId(booking._id)}
                          className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs  py-2.5 whitespace-nowrap  rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition"
                        >
                          Check-Out
                        </button>
                      )}

                      {booking?.Payment?.paymentStatus !== "paid" && (
                        <button className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs md:py-2 py-2.5 whitespace-nowrap  rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition">
                          Pay Online
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ))}


        {filterStatus === "upComing" &&
          (filteredReservations.length === 0 ? (
            <div className="w-full h-[45vh] flex justify-center mt-20">
              <h1 className="text-3xl font-semibold text-gray-500">
                No upComing Booking Found
              </h1>
            </div>
          ) : (
            filteredReservations.map((booking) => {
              const listing = booking.Listing || {};
              const guest = booking.guest || {};

               return (
              <div
                key={booking._id}
                className="w-[95%] max-w-6xl bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex md:flex-row flex-col"
              >
                {/* Image */}
                <div className="md:w-[320px] w-full md:h-[280px] h-[220px] p-3">
                  <img
                    loading="lazy"
                    src={listing.image1 || ""}
                    alt={listing.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 px-5 md:p-6">
                  {/* Header */}
                  <div className="flex justify-between gap-3 flex-col md:flex-row">
                    <div>
                      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        {listing.title || "Untitled Listing"}
                      </h1>

                      <p className="text-sm text-gray-500 mt-1">
                        {listing.category || "Listing"} • {listing.city || "-"}{" "}
                        • {listing.landmark || "-"}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3 md:justify-end items-start h-fit">
                      <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-green-100 text-green-700">
                        {booking?.status}
                      </span>

                      <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-cyan-100 text-cyan-700">
                        {booking?.Payment?.paymentStatus}
                      </span>

                      <span className="px-3 py-2 rounded-full flex justify-center items-center text-sm font-semibold bg-orange-100 text-orange-700">
                        {booking?.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Details */}
                  <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">Guest Name</p>
                      <p className="font-semibold text-gray-700">
                        {guest.fullName || "Guest"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Guest Email</p>

                      <p className="font-semibold text-gray-700 truncate">
                        {guest.email || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Total Rent</p>

                      <p className="font-bold text-xl text-green-600">
                        ₹{Math.round(booking?.Payment?.amount || 0)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Check In</p>

                      <p className="font-medium">
                        {new Date(booking.checkIn).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Check Out</p>

                      <p className="font-medium">
                        {new Date(booking.checkOut).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Booking Status</p>

                      <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        Confirmed
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => setGuestModal(guest)}
                      className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs md:py-2 py-2.5 whitespace-nowrap  rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                      View Guest
                    </button>

                    <button
                      onClick={() => setCancelBookingId(booking._id)}
                      className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs md:py-2 py-2.5 whitespace-nowrap  rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>

                    {filterStatus === "current" && (
                      <button
                        onClick={() => setCheckOutBookingId(booking._id)}
                        className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs md:py-2 py-2.5 whitespace-nowrap  rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition"
                      >
                        Check-Out
                      </button>
                    )}

                    {booking?.Payment?.paymentStatus !== "paid" && (
                      <button className="flex-1 md:flex-none md:px-5 md:py-2 px-2 md:text-lg text-xs md:py-2 py-2.5 whitespace-nowrap  rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition">
                        Pay Online
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
            })
          ))}


        {filterStatus === "cancelled" &&
          (filteredReservations.length === 0 ? (
            <div className="w-full h-[45vh] flex justify-center mt-20">
              <h1 className="text-3xl font-semibold text-gray-500">
                No Cancelled Booking Found
              </h1>
            </div>
          ) : (
            filteredReservations.map((booking) => {
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

                          <p className="text-gray-500 text-sm">{guest.email}</p>
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
            })
          ))}


        {filterStatus === "complete" &&
          (filteredReservations.length === 0 ? (
            <div className="w-full h-[45vh] flex justify-center items-center mt-20">
              <h1 className="text-3xl font-semibold text-gray-500">
                No Complete Booking Found
              </h1>
            </div>
          ) : (
            filteredReservations.map((booking) => {
              const listing = booking.Listing || {};
              const guest = booking.guest || {};

           return (
              <div
                key={booking._id}
                className="w-[95%] max-w-6xl bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex md:flex-row flex-col"
              >
                <div className="md:w-[320px] w-full md:h-[280px] h-[220px] p-3 ">
                  <img
                    loading="lazy"
                    src={listing.image1 || ""}
                    alt={listing.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                <div className="flex-1 md:px-10 px-4 pb-5">

              {/* Header */}

              <div className="flex justify-between gap-3 flex-col md:flex-row">
                      <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                          {listing.title || "Untitled Listing"}
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                          {listing.category || "Listing"} •{" "}
                          {listing.city || "-"} • {listing.landmark || "-"}
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex  md:gap-4 gap-4 md:justify-end items-start h-fit">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {booking?.status}
                        </span>
                        <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                          {booking?.paymentStatus}
                        </span>
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          {booking?.paymentMethod}{" "}
                        </span>
                        <span
                          className="bg-zinc-100 text-black  px-2 py-1 cursor-pointer rounded-full"
                          onClick={() => setViewDetails(booking)}
                        >
                          <BiSolidUserDetail size={28} />
                        </span>
                      </div>
                    </div>


{/* Hearder copy */}
                  {/* <div className="flex justify-between items-start gap-4 relative">

                    <div className="px-3 py-1 rounded-full absolute right-3 top-1 text-sm font-semibold">
                      <div className="flex gap-5 items-center">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {booking?.status}
                        </span>
                        <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                          {booking?.paymentStatus}
                        </span>
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          {booking?.paymentMethod}{" "}
                        </span>
                        <span
                          className="bg-zinc-100 text-black  px-2 py-1 cursor-pointer rounded-full"
                          onClick={() => setViewDetails(booking)}
                        >
                          <BiSolidUserDetail size={28} />
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mt-2">
                        {listing.title || ""}
                      </h1>
                      <p className="text-gray-500">
                        • {listing.category || "Listing"} •{" "}
                        {listing.city || "-"} • {listing.landmark || "-"}
                      </p>
                    </div>
                  </div> */}

                  <hr className="my-2" />

                  <div className="grid md:grid-cols-2 grid-cols-2 gap-y-2 ">
                    <div>
                      <p className="text-gray-400">Guest Name</p>
                      <h3 className="font-semibold">
                        {guest.fullName || "Guest"}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-400">Guest Email</p>
                      <h3 className="font-semibold">{guest.email || "-"}</h3>
                    </div>

                    <div>
                      <p className="text-gray-400">Check In</p>
                      <h3>
                        {new Date(booking.checkIn).toLocaleDateString("en-IN")}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-400">Check Out</p>
                      <h3>
                        {new Date(booking.checkOut).toLocaleDateString("en-IN")}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-400">Total Rent</p>
                      <h3 className="text-xl font-bold text-green-600">
                        ₹{Math.round(booking?.Payment?.amount || 0)}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-400">Booking Id</p>
                      <span className=" py-1 rounded-lg ">{booking._id}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setGuestModal(guest)}
                      className="md:px-5 md:py-2 px-2 md:text-lg text-xs md:py-2 py-2.5 whitespace-nowrap  bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      View Guest
                    </button>
                   
                    

                    {/* {!booking?.Payment?.paymentStatus == "paid" && (  <button
                        onClick={() => setCancelBookingId(booking._id)}
                        className="px-5 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
                      >
                       Pay Online
                      </button>)} */}
                  </div>
                </div>
              </div>
            );
            })
          ))}


       
      </div>



      {cancelBookingId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Cancel booking?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Do you want to cancel this booking?
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
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

      {checkOutBookingId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Check-Out?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to mark this booking as checked out?
            </p>
            <textarea
              value={checkOutDetail}
              onChange={(e) => setCheckOutDetail(e.target.value)}
              // disabled={!cancelReason.trim()}
              placeholder="Why are you cancelling this booking?"
              className="w-full h-20 border rounded-lg p-3 mt-3 resize-none outline-none required"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setCheckOutBookingId(null);
                  setCheckOutDetail("");
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => checkoutBooking(checkOutBookingId)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Confirm Check-Out
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
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {guestModal.fullName || "Guest"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {guestModal.email || "-"}
              </p>
              <p>
                <span className="font-semibold">Mobile No. :</span>{" "}
                {guestModal.mobileNo || "-"}
              </p>
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

      {viewDetails && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4 mt-2">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 pb-3 mt-5 overflow-scroll removeScroll">
            <h3 className="text-lg font-semibold">Booking Details</h3>

            <div className="mt-4 space-y-2 text-sm text-gray-700 flex gap-2 flex-col">
              <p>
                <span className="font-semibold">Booking ID:</span>{" "}
                {viewDetails._id}
              </p>

              <p>
                <span className="font-semibold">Reservation Date:</span>{" "}
                {new Date(viewDetails.createdAt).toLocaleDateString("en-IN")}
              </p>

              <p>
                <span className="font-semibold">Check In:</span>{" "}
                {new Date(viewDetails.checkIn).toLocaleDateString("en-IN")}
              </p>

              <p>
                <span className="font-semibold">Check Out:</span>{" "}
                {new Date(viewDetails.checkOut).toLocaleDateString("en-IN")}
              </p>

              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {viewDetails.paymentMethod}
              </p>

              <p>
                <span className="font-semibold">Completed On:</span>{" "}
                {viewDetails.completedAt
                  ? new Date(viewDetails.completedAt).toLocaleDateString(
                      "en-IN",
                    )
                  : "-"}
              </p>

              <p>
                <span className="font-semibold">Total Rent:</span> ₹
                {viewDetails?.Listing?.rent}
              </p>

              <p>
                <span className="font-semibold">Cleaning Fee:</span> ₹
                {viewDetails.cleaningFee}
              </p>

              <p>
                <span className="font-semibold">Service Fee:</span> ₹
                {viewDetails.serviceFee}
              </p>

              <p>
                <span className="font-semibold">Taxes:</span> ₹
                {viewDetails.taxes}
              </p>

              <p>
                <span className="font-semibold">Grand Total:</span> ₹
                {viewDetails.totalRent}
              </p>

              {viewDetails?.paymentMethod !== "pay_at_property" && (
                <>
                  {" "}
                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {viewDetails.paymentStatus}
                  </p>
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {viewDetails?.Payment?.razorpayOrderId}
                  </p>
                  <p>
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {viewDetails?.Payment?.transactionId}
                  </p>
                  <p>
                    <span className="font-semibold">Transaction Date:</span>{" "}
                    {viewDetails?.Payment?.createdAt
                      ? new Date(
                          viewDetails?.Payment?.createdAt,
                        ).toLocaleString("en-IN")
                      : "-"}
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewDetails(null)}
                className="px-4 py-2 rounded-lg bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ReservationsList;
