import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ServerURL } from "../App";
import { bookingDataContect } from "./BookingContext";
import { listingDataContext } from "./ListingContex";
import { useNavigate } from "react-router-dom";

export const RazorPayDataContext = createContext();

const RazorpayContext = ({ children }) => {
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);

  const {
    handleBooking,
    paymentMethod,
  } = useContext(bookingDataContect);

  const { cardDetails } = useContext(listingDataContext);

  const checkOutHandler = async (amount) => {
    try {
      const { data: keyData } = await axios.get(
        `${ServerURL}/api/payment/razorpay/getKey`
      );

      const { key } = keyData;

      const { data: orderData } = await axios.post(
        `${ServerURL}/api/payment/razorpay/process`,
        {
          amount,
        }
      );

      const { order } = orderData;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verify = await axios.post(
            `${ServerURL}/api/payment/razorpay/paymentVerification`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              withCredentials:true
            }
            );
            const cardInfo = JSON.parse(
                sessionStorage.getItem("cardDetails")
              );

              const listingId = cardInfo?._id

             if(!listingId){
               toast.error("Listing not found");
               return;
             }
            if(verify.data.success){

            await handleBooking(cardInfo?._id,{



              paymentMethod:"online",

              paymentStatus:"paid",

              razorpay_order_id:
              verify.data.razorpay_order_id,

              razorpay_payment_id:
              verify.data.razorpay_payment_id,

              razorpay_signature:
              verify.data.razorpay_signature

            });

            }

                        setPaymentData(verify.data);

                        navigate("/payment-sucess-booking-recipt");
                      } catch (err) {
                        console.log(err);
                      }
                    },
                  };

                  const rzp = new window.Razorpay(options);

                  rzp.open();
                } catch (err) {
                  console.log(err);
                }
              };

  return (
    <RazorPayDataContext.Provider
      value={{
        paymentData,
        checkOutHandler,
      }}
    >
      {children}
    </RazorPayDataContext.Provider>
  );
};

export default RazorpayContext;