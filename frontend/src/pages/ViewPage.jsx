import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo2.jpeg";
import { IoIosSearch } from "react-icons/io";
import { useContext } from "react";
import UserContext, { userDataContext } from "../Context/UserContext";
import { CgProfile } from "react-icons/cg";
import {
  GiHamburgerMenu,
  GiVillage,
  GiFamilyHouse,
  GiWoodCabin,
} from "react-icons/gi";
import { useState } from "react";
import { listingDataContext } from "../Context/ListingContex";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { ServerURL } from "../App";
import axios from "axios";
import { bookingDataContect } from "../Context/BookingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SyncLoader } from "react-spinners";


const ViewPage = () => {
  const { id } = useParams();
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {
    cardDetails,
    setCardDetails,
    updating,
    setUpdating,
    deleteing,
    setDeleteing,
  } = useContext(listingDataContext);
  const [updatePopUP, setUpdatePopUP] = useState(false);
  const [bookingPopUP, setBookingPopUP] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backendEndImage1, setBackendEndImage1] = useState(null);
  const [backendEndImage2, setBackendEndImage2] = useState(null);
  const [backendEndImage3, setBackendEndImage3] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minDate, setMinDate] = useState(new Date());
  const [reservedDates, setReservedDates] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const{  checkIn, setCheckIn, checkOut, setCheckOut,totalCharges, setTotalCharges, totalRent,setTotalRent,night, setNight,tax,setTax,charges,setCharges,bookingData,setBookingData,handleBooking}= useContext(bookingDataContect);

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

  const handleUpdateListing = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      if (backendEndImage1) {
        formData.append("image1", backendEndImage1);
      }
      if (backendEndImage2) {
        formData.append("image2", backendEndImage2);
      }
      if (backendEndImage3) {
        formData.append("image3", backendEndImage3);
      }
      if (rent) {
        formData.append("rent", rent);
      }
      if (city) {
        formData.append("city", city);
      }
      if (landmark) {
        formData.append("landmark", landmark);
      }

      const result = await axios.patch(
        `${ServerURL}/api/listings/update/${listing._id}`,
        formData,
        { withCredentials: true },
      );
      console.log(result);
      toast.success("Listing Update Successfully");
      setUpdating(false);
      navigate("/");

      setTitle("");
      setDescription("");
      setBackendEndImage1(null);
      setBackendEndImage2(null);
      setBackendEndImage3(null);
      setRent("");
      setCity("");
      setLandmark("");
    } catch (error) {
      setUpdating(false);
      console.log(error);
      toast.error("Something went Wronge.");
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    }
  };

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackendEndImage1(file);
  };

  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackendEndImage2(file);
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackendEndImage3(file);
  };

  const handleDeleteListing = async (req, res) => {
    setDeleteing(true);
    try {
      const result = await axios.delete(
        `${ServerURL}/api/listings/delete/${listing._id}`,
        { withCredentials: true },
      );

      console.log(result.data);
      setDeleteing(false);
      toast.success("Listing Deleted Successfully");
      navigate("/");
    } catch (error) {
      setDeleteing(false);
      console.log(error);
      toast.error("Something went Wronge.");
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    }
  };

  const getListingById = async (listingId) => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${ServerURL}/api/listings/listing/${listingId}`,
        { withCredentials: true },
      );

      const listingData = result.data;
      setCardDetails(listingData);
      setTitle(listingData.title || "");
      setDescription(listingData.description || "");
      setRent(listingData.rent || "");
      setCity(listingData.city || "");
      setLandmark(listingData.landmark || "");
    } catch (error) {
      console.log(error);
      toast.error("Unable to load listing details.");
    } finally {
      setLoading(false);
    }
  };

  const getReservedDates = async (listingId) => {
    try {
      const result = await axios.get(`${ServerURL}/api/booking/listing/${listingId}`, { withCredentials: true });
      const bookedRanges = (result.data || []).map((booking) => ({
        start: new Date(booking.checkIn),
        end: new Date(booking.checkOut),
      }));
      setReservedDates(bookedRanges);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getListingById(id);
      getReservedDates(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
  const today = new Date().toISOString().split("T")[0];
  setMinDate(today);
}, []);

 useEffect(() => {
  if (!checkOut || !checkIn || !cardDetails?.rent) {
    setNight(0);
    setCharges(0);
    setTax(0);
    setTotalRent(0);
    setTotalCharges(0);
    return;
  }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  const totalNight = (outDate - inDate) / (1000 * 60 * 60 * 24);
  const rentValue = Number(cardDetails.rent || 0);
  const airbnbCharge = rentValue * 0.03;
  const taxValue = rentValue * 0.07;
  const rent = rentValue * totalNight;

  setNight(totalNight);
  setCharges(airbnbCharge);
  setTax(taxValue);
  setTotalRent(rent);
  setTotalCharges(rent + airbnbCharge + taxValue);

}, [checkIn, checkOut, cardDetails?.rent]);

 

  const listing = cardDetails || {};

  const normalizeDate = (date) => {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value;
  };

  const formatDateOnly = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDateReserved = (date) => {
    if (!date) return false;
    const normalized = normalizeDate(date);
    return reservedDates.some((range) => {
      const start = normalizeDate(range.start);
      const end = normalizeDate(range.end);
      return normalized >= start && normalized <= end;
    });
  };

  const handleCheckInChange = (date) => {
    if (!date) {
      setCheckIn("");
      setCheckInDate(null);
      return;
    }
    if (isDateReserved(date)) {
      toast.error("Already reserved, please choose another date");
      return;
    }
    const formatted = formatDateOnly(date);
    setCheckIn(formatted);
    setCheckInDate(date);
    if (checkOut && checkOut < formatted) {
      setCheckOut("");
      setCheckOutDate(null);
    }
  };

  const handleCheckOutChange = (date) => {
    if (!date) {
      setCheckOut("");
      setCheckOutDate(null);
      return;
    }
    if (isDateReserved(date)) {
      toast.error("Already reserved, please choose another date");
      return;
    }
    if (checkIn && date < new Date(checkIn)) {
      toast.error("Checkout must be after check-in");
      return;
    }
    const formatted = formatDateOnly(date);
    setCheckOut(formatted);
    setCheckOutDate(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        <SyncLoader color="#0b110a" size={10} />
      </div>
    );
  }

  if (!cardDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Listing not found.
      </div>
    );
  }

  const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto h-14 px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-24 md:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Search */}
          <div className="hidden md:flex items-center w-[40%] bg-zinc-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Anywhere | Any Location | Any City"
              className="w-full bg-transparent outline-none text-sm"
            />
            <IoIosSearch size={20} />
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/listingpage1")}
              className="hidden md:block px-5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition"
            >
              List Your Home
            </button>

            <div className="relative flex items-center gap-3 bg-zinc-100 rounded-full px-3 py-2">
              {userData ? (
                <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {userData?.fullName?.charAt(0) || userData?.name?.charAt(0)}
                </span>
              ) : (
                <CgProfile size={25} />
              )}

              <GiHamburgerMenu
                size={22}
                className="cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />

              {showMenu && (
                <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-lg overflow-hidden">
                  {!userData ? (
                    <div
                      onClick={() => {navigate("/signin")
                         setShowMenu(false)
                      }}
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
                    onClick={() => {navigate("/listingpage1")
                       setShowMenu(false)
                    }}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    List Your Home
                  </div>

                   <button
                      onClick={() => {navigate("/Reservations-Dashboard")
                        setShowMenu(false)
                      }}
                      className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                   >
                      Reservations
                   </button>

                  <div
                    onClick={() => {navigate("/mylisting")
                       setShowMenu(false)
                    }}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    My Listing
                  </div>

                  <div
                    onClick={() => {navigate("/Booking")
                       setShowMenu(false)
                    }}
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

      {/* Main */}
      <div className="max-w-6xl mx-auto mt-20 px-4 pb-10 ">
        {/* Heading */}
        <h1 className="text-xl md:text-xl font-semibold mb-5">
          In {(listing.description || "").toUpperCase()},{" "}
          {(listing.title || "").toUpperCase()}
        </h1>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-[250px] md:h-[350px] rounded-2xl overflow-hidden">
            <img
              src={listing.image1}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            <div className="h-[200px] md:h-[170px] md:w-[80%] rounded-2xl overflow-hidden">
              <img
                src={listing.image2}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-[200px] md:h-[170px] md:w-[80%] rounded-2xl overflow-hidden">
              <img
                src={listing.image3}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-2">
          <h2 className="text-lg md:text-2xl font-medium">
            {(listing.category || "").toUpperCase()} in{" "}
            {(listing.city || "").toUpperCase()},{" "}
            {(listing.landmark || "").toUpperCase()}
          </h2>

          <p className="text-xl md:text-3xl font-bold">
            ₹ {listing.rent || 0} / day
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-start mt-8">
          {listing.host == userData?._id ? (
            <div className="flex gap-7">
              <button
                onClick={() => setUpdatePopUP(true)}
                className="bg-red-500 hover:bg-red-600 transition text-white px-8 md:px-12 py-3 rounded-full text-base md:text-lg shadow-lg active:scale-95"
              >
                Edit Listing
              </button>

              <button
                onClick={handleDeleteListing}
                className="bg-red-500 hover:bg-red-600 transition text-white px-8 md:px-12 py-3 rounded-full text-base md:text-lg shadow-lg active:scale-95"
              >
                {deleteing ? "Deleteing...." : "Delete Listing"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setBookingPopUP(true)}
              className="bg-red-500 hover:bg-red-600 transition text-white px-8 md:px-12 py-3 rounded-full text-base md:text-lg shadow-lg active:scale-95"
            >
              Booking
            </button>
          )}
        </div>
      </div>

      {/* Update Listing Popup */}

      {updatePopUP && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative w-[90%] max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto p-6"
          >
            {/* Close */}
            <span
              onClick={() => setUpdatePopUP(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-200 hover:bg-zinc-300 flex justify-center items-center cursor-pointer active:scale-95"
            >
              <ImCross />
            </span>

            {/* Heading */}
            <h2 className="text-center text-2xl font-semibold text-red-600 mb-8">
              Update Your Home
            </h2>

            {/* Title */}
            <div className="mb-5">
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
                className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block font-medium mb-2">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="w-full border rounded-lg p-3 outline-none resize-none focus:border-red-500"
              ></textarea>
            </div>

            {/* Images */}
            <div className="grid md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block font-medium mb-2">Image 1</label>
                <input
                  type="file"
                  onChange={handleImage1}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Image 2</label>
                <input
                  type="file"
                  onChange={handleImage2}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Image 3</label>
                <input
                  type="file"
                  onChange={handleImage3}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>

            {/* Price & City */}
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block font-medium mb-2">Price</label>
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  placeholder="Enter Price"
                  className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter City"
                  className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Landmark */}
            <div className="mb-8">
              <label className="block font-medium mb-2">Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Enter Landmark"
                className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
              />
            </div>

            {/* Button */}
            <div className="flex justify-center gap-5">
              <button
                type="button"
                onClick={handleUpdateListing}
                disabled={updating}
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full text-lg shadow-lg active:scale-95 disabled:opacity-60"
              >
                {updating ? "Updating..." : "Update Listing"}
              </button>

              <button
                type="button"
                onClick={handleDeleteListing}
                disabled={deleteing}
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full text-lg shadow-lg active:scale-95 disabled:opacity-60"
              >
                {deleteing ? "Deleteing..." : "Delete Listing"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Booking page */}
      {bookingPopUP && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

          {/* Popup */}
          <div className="relative w-[95%] max-w-6xl h-[90vh] rounded-2xl overflow-y-auto">

            {/* Close */}
            <span
              onClick={() => setBookingPopUP(false)}
              className="absolute top-2 right-4 w-10 h-10 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center cursor-pointer"
            >
              <ImCross />
            </span>

            {/* Center Form */}
            <div className="w-full min-h-full flex justify-center md:flex-row flex-col gap-10 items-start py-5">

              <form onSubmit={(e)=>e.preventDefault()} className="w-full max-w-lg bg-white border rounded-xl shadow-md px-6 py-4">

                <h2 className="text-2xl font-semibold text-center border-b pb-4">
                  Confirm & Book
                </h2>

                <div className="flex gap-4 mt-5">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Check In
              </label>
              <DatePicker
                selected={checkInDate}
                onChange={handleCheckInChange}
                minDate={new Date(minDate)}
                filterDate={(date) => !isDateReserved(date)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
                placeholderText="Select check-in"
                dateFormat="dd MMM yyyy"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Check Out
              </label>
              <DatePicker
                selected={checkOutDate}
                onChange={handleCheckOutChange}
                minDate={checkInDate || new Date(minDate)}
                filterDate={(date) => !isDateReserved(date)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
                placeholderText="Select check-out"
                dateFormat="dd MMM yyyy"
              />
            </div>
      </div>

                {/* Price Details */}
                <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-3">
                    Price Details
                  </h3>

                  <div className="flex justify-between">
                    <span>₹{cardDetails.rent} × {night} nights</span>
                    <span>₹{totalRent}</span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span>Cleaning Fee</span>
                    <span>₹{charges}</span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span>Taxs</span>
                    <span>₹{tax}</span>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalCharges}</span>
                  </div>
                </div>

                <button
                  onClick={() => cardDetails?._id && handleBooking(cardDetails._id)}
                  disabled={!cardDetails?._id}
                  className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Confirm Booking
                </button>

              </form>


                      {/* Booking view item */}

          <div className="max-w-md w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Property */}
            <div className="flex gap-4">
              <img
                src={cardDetails.image1}
                alt="Hotel"
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold leading-7">
                {cardDetails.description}, {cardDetails.landmark} | Pool + Wifi
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span>⭐</span>
                  <span className="font-medium">4.97 (36)</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-gray-700">
                    Guest favourite
                  </span>
                </div>
              </div>
            </div>

            {/* Cancellation */}
            <div className="mt-5 text-sm text-gray-700">
              Cancel before check-in on{" "}
              <span className="font-medium">3 July</span> for a partial refund.
              <button className="ml-1 font-semibold underline">
                Full policy
              </button>
            </div>

            <hr className="my-6" />

            {/* Dates */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Dates</h3>
                <div className="mt-1 text-gray-600">
                
                {/* <p> {checkIn ? formatDate(checkIn) : "DD/MM/YYYY"} - {" "} {checkOut ? formatDate(checkOut) : "DD/MM/YYYY"}</p> */}
                <p> {checkIn ? (checkIn) : "DD/MM/YYYY"} - {" "} {checkOut ? (checkOut) : "DD/MM/YYYY"}</p>
                </div>
              </div>

              <button className="font-semibold underline">
                Change
              </button>
            </div>

            <hr className="my-6" />

            {/* Guests */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Guests</h3>
                <p className="mt-1 text-gray-600">
                  1 adult
                </p>
              </div>

              <button className="font-semibold underline">
                Change
              </button>
            </div>

            <hr className="my-6" />

            {/* Price */}
            {/* <div>
              <h3 className="mb-4 text-lg font-semibold">
                Price details
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>2 nights × ₹4,499.00</span>
                  <span>₹8,998.00</span>
                </div>

                <div className="flex justify-between">
                  <span>Last-minute discount</span>
                  <span className="text-green-600">
                    -₹449.90
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹427.40</span>
                </div>
              </div>
            </div> */}

            {/* <hr className="my-6" /> */}

            {/* Total */}
            {/* <div className="flex justify-between text-lg font-bold">
              <span>Total INR</span>
              <span>₹8,975.50</span>
            </div> */}
          </div>

            </div>

          </div>

        </div>
      )}
          </>
        );
      };

export default ViewPage;
