import React, { useContext } from "react";
import { GiConfirmed } from "react-icons/gi";
import { FaHome, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { bookingDataContect } from "../Context/BookingContext";
import { MdOutlineStar } from "react-icons/md"; // Fill Star  <MdOutlineStar />
import { MdOutlineStarBorder } from "react-icons/md"; // Blank star   <MdOutlineStarBorder />
import ReviewCreate from "../Component/ReviewCreate/ReviewCreate";

const Booked = () => {
  const { bookingData } = useContext(bookingDataContect);
  console.log(bookingData)
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-green-600 text-white flex flex-col items-center py-3">

          <GiConfirmed className="text-3xl mb-4" />

          <h1 className="text-xl font-bold">
            Booking Confirmed
          </h1>

          <p className="mt-2 text-green-100">
            Your reservation has been successfully confirmed.
          </p>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <div className="border rounded-xl p-5">

            <h2 className="text-xl font-bold mb-4">
              Booking Summary
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Booking ID
                </span>

                <span className="font-semibold text-right">
                  {bookingData?._id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-500">
                  <FaCalendarAlt />
                  Check In
                </span>

                <span className="font-semibold">
                  {formatDate(bookingData?.checkIn)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-500">
                  <FaCalendarAlt />
                  Check Out
                </span>

                <span className="font-semibold">
                  {formatDate(bookingData?.checkOut)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-500">
                  <MdOutlineEmail />
                  Owner Email
                </span>

                <span className="font-semibold">
                  {bookingData?.host?.email || bookingData?.hostEmail || bookingData?.Listing?.host?.email || bookingData?.Listing?.host?.fullName || "Not Available"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-500">
                  <FaHome />
                  Status
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  Confirmed
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-500">
                  <FaHome />
                 Payment Menthod
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                   {bookingData?.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-500">
                  <FaHome />
                  Payment Status
                </span>

                <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      bookingData?.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : bookingData?.paymentStatus === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : bookingData?.paymentStatus === "checked_in"
                        ? "bg-blue-100 text-blue-700"
                        : bookingData?.paymentStatus === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : bookingData?.paymentStatus === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {bookingData?.paymentStatus}
                </span>
              </div>

               <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-500">
                  <FaMoneyBillWave />
                  Total Amount
                </span>

                <span className="font-bold text-2xl text-green-600">
                  ₹{bookingData?.grandTotal}
                </span>
              </div>

            </div>

          </div>


         {/* Reviews & Rating*/}
            <ReviewCreate />


          {/* Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-sm text-blue-700">
            🎉 Thank you for choosing us. The host will be able to see your reservation immediately. Please carry a valid ID during check-in.
          </div>

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800"
            >
              Back To Home
            </button>

            <button
              onClick={() => navigate("/mybooking")}
              className="flex-1 py-3 rounded-xl border-2 border-black font-semibold hover:bg-black hover:text-white"
            >
              My Bookings
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Booked;