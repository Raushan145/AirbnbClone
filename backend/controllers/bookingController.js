import asyncHandler from "../middlewares/asyncHandler.js";
import Booking from "../models/Bookingmodel.js";
import Payment from "../models/PaymentModel.js";
import Listing from "../models/listingmodel.js";
import User from "../models/usermodel.js";


export const getBookingsForHost = asyncHandler (async (req, res) => {
    try {
        const hostId = req.userId;
        // console.log("Logged in Host:", hostId);
        
        // Get all listings owned by this host
        const hostListings = await Listing.find({ host: hostId }).select("_id");
        const listingIds = hostListings.map(listing => listing._id);
        // console.log("Host Listings:", hostListings);
        // console.log("Listing IDs:", listingIds);
        
        const allBookings = await Booking.find();

        // console.log(allBookings);

        const booking = await Booking.findOne({
          Listing: "6a480945fe064a82c0a891b9"
        });

        // console.log(booking);

        // Get bookings only for these listings
        const bookings = await Booking.find({ Listing: { $in: listingIds } })
            // .populate("guest", "fullName email mobileNo")
            // .populate("host", "fullName email mobileNo")
            // .populate("Listing", "title image1 image2 image3 description rent category city landmark")
            .populate("guest")
            .populate("host")
            .populate("Listing")
            .populate("Payment")
            .sort({ createdAt: -1 });

        // console.log(bookings);

        return res.status(200).json(bookings);
    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log(error);
        return res.status(500).json({ message: `Get Host Bookings Error: ${error.message}` });
    }
})

export const getBookingsForListing = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Booking.find({ Listing: id, status: "booked" }).sort({ checkIn: 1 });
        return res.status(200).json(bookings);
    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log(error);
        return res.status(500).json({ message: `Get Listing Bookings Error: ${error.message}` });

    }
})

export const createBooking = asyncHandler(async (req, res) => {
  try {
    console.log("Create Booking API Hit");

    const { id } = req.params;

    const {
      checkIn,
      checkOut,
      totalRent,
      cleaningFee,
      serviceFee,
      taxes,
      night,
      rent,
      paymentMethod,
      paymentStatus,
      method,
      totalCharges,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;


    const listing = await Listing.findById(id)
      .populate("host", "fullName email");


    if (!listing) {
      return res.status(404).json({
        message: "Listing Not Found",
      });
    }


   const parseDateOnly = (value) => {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  return new Date(Date.UTC(
    year,
    month - 1,
    day
  ));
};


    const checkInDate = parseDateOnly(checkIn);
    const checkOutDate = parseDateOnly(checkOut);

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({
        message:"Invalid Date"
      });
    }

    if(checkInDate >= checkOutDate){

      return res.status(400).json({
        message:"Check out must be after check in"
      });

    }


//     console.log("New Booking Dates");
    // console.log("Check In:", checkInDate);
    // console.log("Check Out:", checkOutDate);



// date availability check

    const alreadyBooked = await Booking.find({

      Listing: listing._id,

      bookingStatus:{
        $in:[
          "confirmed",
          "checked_in"
        ]
      },

      checkIn:{
        $lt:checkOutDate
      },
      
      checkOut:{
        $gt:checkInDate
      }
      
    });
    
    // console.log("Already Booked Result:", alreadyBooked);

    if(alreadyBooked.length){

      return res.status(400).json({

        message:"Dates already booked"

      });

    }

    // Payment validation

    if(paymentMethod==="online"){

      if(
        paymentStatus !== "paid" ||
        !razorpay_payment_id
      ){

        return res.status(400).json({

          message:"Payment not completed"

        });

      }

    }

    
      const booking = await Booking.create({
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalRent,
        basePrice:rent,
        cleaningFee,
        serviceFee,
        taxes,
        night,
        host:
        listing.host._id,
        guest:
        req.userId,
        Listing:
        listing._id,
        paymentMethod,
        grandTotal: totalCharges,
        paymentStatus:paymentStatus || "pending",
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        bookingStatus:"confirmed"
  
  
      });

    // const totalAmount = Number(totalRent) + Number(cleaningFee) +  Number(serviceFee) +  Number(taxes);
     // Create Payment

      const payment = await Payment.create({

        booking: booking._id,
        user: req.userId,
        amount: totalRent,
        currency: "INR",
        method: paymentMethod === "online" ? "razorpay" : "pay_at_property",

        paymentStatus: paymentMethod === "online" ? "paid" : "pending",
          
        transactionId: paymentMethod === "online" ? razorpay_payment_id: null,

        razorpayOrderId:paymentMethod === "online" ? razorpay_order_id : null,

        razorpayPaymentId:paymentMethod === "online" ? razorpay_payment_id : null,

        razorpaySignature: paymentMethod === "online" ? razorpay_signature : null,

        paidAt:  paymentMethod === "online" ? new Date()  : null,
      });


     booking.Payment = payment._id;
     await booking.save();
      
    // Add booking to user

    await User.findByIdAndUpdate(

      req.userId,

      {
        $push:{
          Booking:booking._id
        }
      }

    );

    // listing booked

    // listing.isBooked=true;

    await listing.save();



    const populatedBooking =
    await Booking.findById(booking._id)

    .populate(
      "host",
      "fullName email"
    )

    .populate(
      "guest",
      "fullName email"
    )

    .populate(
      "Payment"
    )

    .populate({

      path:"Listing",

      select:
      "title image1 image2 image3 rent description host",

      populate:{
        path:"host",
        select:"fullName email"
      }

    });



    return res.status(201).json(

      populatedBooking

    );


  } catch(error){

    console.log(
      "Create Booking Error",
      error
    );
  console.log("Create Booking Error");
  console.log(error);
  console.log(error.message);

    return res.status(500).json({

      message:error.message

    });

  }

});

// export const cancleBooking = async(req,res) => {

//     try {

//         let {id} = req.params;
//         const { cancelReason } = req.body;
//         const booking = await Booking.findById(id);

//         if(!booking){
//             return res.status(404).json({message:"Booking Not Found"})
//         }

//         const listing = await Listing.findById(booking.Listing);

//         if(!listing){
//             return res.status(404).json({message:"Listing Not Found"})
//         }

//         if (booking.guest.toString() === req.userId) {
//             booking.status = "cancelled_by_guest";
//         }
//         else if (booking.host.toString() === req.userId) {
//             booking.status = "cancelled_by_host";
//         }
//         else {
//             return res.status(403).json({
//                 message: "Unauthorized"
//             });
//         }
//         booking.cancelReason = cancelReason;
//         booking.cancelledAt = new Date();

//         await booking.save();

//         await Listing.findByIdAndUpdate(listing._id,{isBooked:false, guest:null});

//         await User.findByIdAndUpdate(booking.guest,{$pull:{Booking:booking._id}},{new:true});

//         return res.status(200).json({message:"Booking Cancelled"})

//     } catch (error) {
//         console.error("Cancle Booking Error " + error);
//         console.log(error)
//          return res.status(500).json({message:"Cancle Booking Error"})
//     }
// }

export const checkoutBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "complete",
        paymentStatus:"paid",
        completedAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Booking Completed",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const cancelBooking = asyncHandler(async (req, res) => {
  try {
    console.log("CancelBooking API Hit");

    const { id } = req.params;
    const { cancelReason } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found"
      });
    }

    const listing = await Listing.findById(booking.Listing);

    if (!listing) {
      return res.status(404).json({
        message: "Listing Not Found"
      });
    }


    let status;

    if (booking.guest.toString() === req.userId) {
      status = "cancelled_by_guest";
    }
    else if (booking.host.toString() === req.userId) {
      status = "cancelled_by_host";
    }
    else {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }


    await Booking.findByIdAndUpdate(
      id,
      {
        status,
        cancelReason,
        cancelledAt: new Date()
      }
    );


    await Listing.findByIdAndUpdate(
      listing._id,
      {
        isBooked: false,
        guest: null
      }
    );


    await User.findByIdAndUpdate(
      booking.guest,
      {
        $pull: {
          Booking: booking._id
        }
      }
    );


    return res.status(200).json({
      success:true,
      message:"Booking Cancelled Successfully"
    });


  } catch (error) {
    console.error("Cancel Booking Error:", error);

    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
});

export const deleteBooking =asyncHandler (async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking Not Found" });
        }

        // Only allow deleting if booking is cancelled and belongs to the user
        if (booking.status !== "cancelled_by_guest" && booking.status !== "cancelled_by_host") {
            return res.status(403).json({ message: "Can only delete cancelled bookings" });
        }

        if (booking.guest.toString() !== req.userId && booking.host.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Delete from user's booking array
        await User.findByIdAndUpdate(
            booking.guest,
            { $pull: { Booking: booking._id } }
        );

        // Delete the booking
        await Booking.findByIdAndDelete(id);

        return res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Delete Booking Error:", error);
        return res.status(500).json({ message: "Delete Booking Error" });
    }
})