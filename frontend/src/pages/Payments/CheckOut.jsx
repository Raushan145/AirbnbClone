import { useContext, useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { userDataContext } from "../../Context/UserContext";
import { bookingDataContect } from "../../Context/BookingContext";
import { listingDataContext } from "../../Context/ListingContex";
import { RazorPayDataContext } from "../../Context/RazorpayContext";

export default function CheckoutPage(req) {
  const { userData, setUserData, getCurrentUser } = useContext(userDataContext);
  const {
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
    bookingData,
    setBookingData,
    handleBooking,
    paymentMethod,
    setPaymentMethod,
    createBookingLoading,
    setCreateBookingLoading,
  } = useContext(bookingDataContect);
  const { checkOutHandler } = useContext(RazorPayDataContext);

  const { cardDetails } = useContext(listingDataContext);
  console.log(cardDetails);
  const listingId = cardDetails._id;
  //    console.log(listingId)
  const [agree, setAgree] = useState(false);

  const getListingById = async (listingId) => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${ServerURL}/api/listings/listing/${listingId}`,
        { withCredentials: true },
      );
      console.log(result);
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

  const booking = {
    image: cardDetails.image1,
    title: cardDetails.title,
    location: `${cardDetails.city}, ${cardDetails.landmark}`,
    checkIn: checkIn,
    checkOut: checkOut,
    guests: 2,
    nights: night,
    price: totalRent,
    cleaning: charges,
    service: 0,
    tax: tax,
  };

  const total =
    booking.price * booking.nights +
    booking.cleaning +
    booking?.service +
    booking.tax;

  const handleCheckout = (amount) => {
    if (paymentMethod === "online") {
    //    Razorpay Integration
    //   console.log("Open Razorpay");
    //   console.log(amount);
      checkOutHandler(amount);
    } else {
      // Cash Booking API
      console.log("Create Cash Booking");
      handleBooking(listingId);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 p-5">
        {/* Left */}
        <div className="lg:col-span-2 ">
          <h1 className="text-3xl font-bold mb-5 ">Confirm and Pay</h1>

          {/* Property */}
          <div className="bg-white rounded-2xl shadow p-4 flex gap-4">
            <img
              src={booking.image}
              alt=""
              className="w-36 h-28 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{booking.title}</h2>

              <p className="flex items-center gap-2 text-gray-500 mt-1">
                <MapPin size={16} />
                {booking.location}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {booking.checkIn}
                </span>

                <span>→</span>

                <span>{booking.checkOut}</span>

                <span className="flex items-center gap-2">
                  <User size={16} />
                  {booking.guests} Guests
                </span>
              </div>
            </div>
          </div>

          {/* Guest Form */}

          {/* <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-semibold text-xl mb-5">
              Guest Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                placeholder="Full Name"
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
              />

              <input
                placeholder="Phone Number"
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
              />

              <input
                placeholder="Email"
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black md:col-span-2"
              />

              <textarea
                rows={4}
                placeholder="Special Request (Optional)"
                className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black md:col-span-2"
              />

            </div>
          </div> */}

          {/* Payment */}

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-xl mb-5 ">
              Choose Payment Method
            </h2>

            <div className="space-y-4">
              <div
                onClick={() => setPaymentMethod("online")}
                className={`border rounded-2xl p-5 cursor-pointer transition ${
                  paymentMethod === "online" ? "border-black bg-gray-100" : ""
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <CreditCard />
                      Pay Online
                    </h3>

                    <p className="text-gray-500 mt-2">
                      UPI • Cards • Net Banking • Wallet
                    </p>
                  </div>

                  <input
                    checked={paymentMethod === "online"}
                    type="radio"
                    readOnly
                  />
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("pay_at_property")}
                className={`border rounded-2xl p-5 cursor-pointer transition ${
                  paymentMethod === "pay_at_property"
                    ? "border-black bg-gray-100"
                    : ""
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Wallet />
                      Pay at Property
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Cash payment during check-in
                    </p>
                  </div>

                  <input
                    checked={paymentMethod === "pay_at_property"}
                    type="radio"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div>
          <div className="bg-white rounded-2xl shadow p-6 sticky top-10">
            <h2 className="font-bold text-xl">Price Details</h2>

            <div className="space-y-4 mt-5">
              <div className="flex justify-between">
                <span>
                  ₹{booking.price} × {booking.nights} nights
                </span>

                <span>₹{booking.price * booking.nights}</span>
              </div>

              <div className="flex justify-between">
                <span>Cleaning Fee</span>
                <span>₹{booking.cleaning}</span>
              </div>

              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₹{booking.service}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{booking.tax}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>

                <span>₹{total}</span>
              </div>
            </div>
            {/* Terms */}

            <div className="bg-white rounded-2xl shadow px-3 py-2 mt-5">
              <label className="flex gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />

                <span className="text-[0.7rem]">
                  I agree to Terms & Conditions and Cancellation Policy.
                </span>
              </label>
            </div>

            <button
              onClick={() => {
                handleCheckout(total);
              }}
              disabled={!agree || createBookingLoading}
              className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
                agree
                  ? "bg-rose-500 hover:bg-rose-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {paymentMethod === "online"
                ? `Pay ₹${total}`
                : createBookingLoading
                  ? "Processing..."
                  : "Confirm Booking"}
            </button>
            {/* "online", "pay_at_property" */}
            <div className="flex items-center justify-center gap-2 text-green-600 mt-4">
              <ShieldCheck size={18} />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <h3 className="font-bold text-lg">₹{total}</h3>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-rose-500 text-white px-6 py-3 rounded-xl font-semibold"
        >
          {paymentMethod === "online" ? "Pay Now" : "Book"}
        </button>
      </div> */}
    </div>
  );
}
