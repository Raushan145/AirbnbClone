import React, { useContext } from "react";
import { GiConfirmed } from "react-icons/gi";
import { FaHome, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineEmail, MdPayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReviewCreate from "../Component/ReviewCreate/ReviewCreate";
import { RazorPayDataContext } from "../Context/RazorpayContext";
import { bookingDataContect } from "../Context/BookingContext";
import { listingDataContext } from "../Context/ListingContex";

const PaymentSuccess = () => {

  const navigate = useNavigate();

  const { paymentData } = useContext(RazorPayDataContext);
  const { bookingData } = useContext(bookingDataContect);
    // console.log(bookingData)

    const { cardDetails } = useContext(listingDataContext);
    // console.log(cardDetails);
    const cardInfo = JSON.parse(
  sessionStorage.getItem("cardDetails")
);
      const listingId = cardInfo?._id;

//   const bookingData = paymentData?.booking;
  const payment = paymentData?.payment;

  const listing = bookingData?.Listing;
  const host = bookingData?.host;


  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 px-4 py-10">


      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">


        {/* Header */}

        <div className="bg-green-600 text-white text-center py-8">


          <GiConfirmed className="text-5xl mx-auto mb-3"/>


          <h1 className="text-2xl font-bold">
            Booking Confirmed
          </h1>


          <p className="text-green-100 mt-2">
            Your reservation has been successfully confirmed
          </p>


        </div>



        <div className="p-6 space-y-6">



          {/* Property Details */}

          <div className="border rounded-2xl p-5">


            <h2 className="font-bold text-xl mb-4">
              Stay Details
            </h2>


            <div className="flex gap-4">


              <img
                src={cardDetails?.image1}
                className="w-32 h-24 rounded-xl object-cover"
              />


              <div>


                <h3 className="font-bold text-lg">
                  {cardDetails?.title}
                </h3>


                <p className="text-gray-500">
                  {cardDetails?.city}, {cardDetails?.landmark}
                </p>


                <p className="text-gray-500 mt-2">
                  {bookingData?.night} Night
                </p>


              </div>


            </div>


          </div>

          {/* Booking Details */}

          <div className="border rounded-2xl p-5">


            <h2 className="font-bold text-xl mb-4">
              Booking Summary
            </h2>


            <div className="space-y-3">


              <div className="flex justify-between">
                <span>Booking ID</span>
                <span className="font-semibold">
                  {bookingData?._id}
                </span>
              </div>



              <div className="flex justify-between">

                <span className="flex gap-2 items-center">
                  <FaCalendarAlt/>
                  Check In
                </span>


                <span className="font-semibold">
                  {formatDate(bookingData?.checkIn)}
                </span>

              </div>




              <div className="flex justify-between">

                <span className="flex gap-2 items-center">
                  <FaCalendarAlt/>
                  Check Out
                </span>


                <span className="font-semibold">
                  {formatDate(bookingData?.checkOut)}
                </span>

              </div>




              <div className="flex justify-between">

                <span>Status</span>


                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {bookingData?.bookingStatus}
                </span>


              </div>



              <div className="flex justify-between">

                <span>Payment Method</span>


                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {bookingData?.paymentMethod}
                </span>


              </div>



            </div>


          </div>

          {/* Price Details */}

          <div className="border rounded-2xl p-5">


            <h2 className="font-bold text-xl mb-4 flex gap-2 items-center">
              <FaMoneyBillWave/>
              Price Details
            </h2>



            <div className="space-y-3">


              <div className="flex justify-between">
                <span>Room Charges</span>
                <span>
                  ₹{bookingData?.Listing?.rent}
                </span>
              </div>


              <div className="flex justify-between">
                <span>Cleaning Fee</span>
                <span>
                  ₹{Math.round(bookingData?.cleaningFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>
                  ₹{Math.round(bookingData?.serviceFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>
                  ₹{Math.round(bookingData?.taxes)}
                </span>
              </div>

                      <hr/>
              <div className="flex justify-between font-bold text-xl">

                <span>Total Amount</span>

                <span className="text-green-600">
                  ₹{bookingData?.Payment?.amount}
                </span>

              </div>
            </div>
          </div>


          {/* Payment Details */}
          <div className="border rounded-2xl p-5">


            <h2 className="font-bold text-xl mb-4 flex gap-2 items-center">
              <MdPayment/>
              Payment Details
            </h2>



            <div className="space-y-3">


              <div className="flex justify-between">

                <span>
                  Payment Status
                </span>

                <span className="text-green-600 font-bold">
                  {bookingData?.Payment?.paymentStatus}
                </span>

              </div>




              <div className="flex justify-between">

                <span>
                  Transaction Id
                </span>

                <span className="text-sm">
                  {bookingData?.Payment?.transactionId}
                </span>

              </div>




              <div className="flex justify-between">

                <span>
                  Order ID
                </span>

                <span className="text-sm">
                  {bookingData?.Payment?.razorpayOrderId}
                </span>

              </div>

            </div>


          </div>

          {/* Host Details */}
          <div className="border rounded-2xl p-5">


            <h2 className="font-bold text-xl mb-3">
              Host Information
            </h2>


            <p>
              Name : {cardDetails?.host?.fullName || "Not Available"}
            </p>


            <p className="flex gap-2 items-center mt-2">
              <MdOutlineEmail/>
              {cardDetails?.host?.email || "Not Available"}
            </p>


          </div>





          <ReviewCreate />





          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700">

            🎉 Thank you for choosing us.
            Please carry your ID during check-in.

          </div>





          <div className="flex gap-4">


            <button
              onClick={()=>navigate("/")}
              className="flex-1 bg-black text-white py-3 rounded-xl font-semibold"
            >
              Back Home
            </button>



            <button
              onClick={()=>navigate("/mybooking")}
              className="flex-1 border-2 border-black py-3 rounded-xl font-semibold"
            >
              My Bookings
            </button>


          </div>




        </div>


      </div>


    </div>

  );
};


export default PaymentSuccess;