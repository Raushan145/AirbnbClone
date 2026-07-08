import asyncHandler from "../middlewares/asyncHandler.js";
import Booking from "../models/Bookingmodel.js";
import Listing from "../models/listingmodel.js";
import User from "../models/usermodel.js";


export const getBookingsForHost = asyncHandler (async (req, res) => {
    try {
        const hostId = req.userId;
        console.log("Logged in Host:", hostId);
        
        // Get all listings owned by this host
        const hostListings = await Listing.find({ host: hostId }).select("_id");
        const listingIds = hostListings.map(listing => listing._id);
        
        // Get bookings only for these listings
        const bookings = await Booking.find({ Listing: { $in: listingIds } })
            .populate("guest", "fullName email mobileNo")
            .populate("host", "fullName email mobileNo")
            .populate("Listing", "title image1 image2 image3 description rent category city landmark")
            .sort({ createdAt: -1 });

        console.log(bookings);

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


export const createBooking =  asyncHandler  (async (req,res) => {

    try {

        let {id} = req.params;
        let {checkIn, checkOut, totalRent} = req.body;

        let listing = await Listing.findById(id).populate("host", "fullName email");
        if (!listing) {
            return res.status(404).json({ message: "Listing Not Found" });
        }

        const bookingHostId = listing.host?._id || listing.host || req.userId;
        const bookingHostUser = listing.host && listing.host._id ? listing.host : await User.findById(bookingHostId).select("fullName email");

        const parseDateOnly = (value) => {
            if (!value) return null;
            if (typeof value === "string") {
                const [year, month, day] = value.split("-").map(Number);
                if (!year || !month || !day) return null;
                return new Date(year, month - 1, day);
            }
            return new Date(value);
        };

        const checkInDate = parseDateOnly(checkIn);
        const checkOutDate = parseDateOnly(checkOut);

        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({ message: "Invalid date selected" });
        }

        if (checkInDate >= checkOutDate) {
            return res.status(400).json({ message: "Check-out must be after check-in" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkInDate < today) {
            return res.status(400).json({ message: "Check-in date cannot be in the past" });
        }
        
       
        const overlapping = await Booking.find({
            Listing: listing._id,
            status: "booked",
            $or: [
                {
                    checkIn: { $lt: checkOutDate },
                    checkOut: { $gt: checkInDate }
                }
            ]
        });

        if (overlapping.length > 0) {
            return res.status(400).json({ message: "Selected dates are already reserved" });
        }
       
        let booking = await Booking.create({
             checkIn,
             checkOut,
             totalRent,
             host: bookingHostId,
             guest: req.userId,
             Listing: listing._id
        })

        booking = await Booking.findById(booking._id)
          .populate("host", "fullName email")
          .populate("guest", "fullName email")
          .populate({
            path: "Listing",
            select: "title image1 image2 image3 rent description host",
            populate: { path: "host", select: "fullName email" }
          });

        let user = await User.findByIdAndUpdate(req.userId,{
            $push:{Booking:booking._id}
        },{new:true})

         if(!user){
            return res.status(404).json({message:"user Not Found"})
        }

        listing.guest = req.userId;
        listing.isBooked = true
        await listing.save();
        console.log(booking)
        return res.status(201).json(booking)
        
    } catch (error) {   
      console.error("Booking Error:", error);  
      return res.status(501).json({message:`Booking Error ${error}`})
        
    }

})

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

export const cancelBooking =asyncHandler (async (req, res) => {
    try {

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

        if (booking.guest.toString() === req.userId) {
            booking.status = "cancelled_by_guest";
        }
        else if (booking.host.toString() === req.userId) {
            booking.status = "cancelled_by_host";
        }
        else {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        booking.cancelReason = cancelReason;
        booking.cancelledAt = new Date();

        // console.log(cancelReason)
        // console.log(req.userId)
        // console.log(booking.status)

        await booking.save();

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
            message: "Booking Cancelled Successfully"
        });

    } catch (error) {
           console.error(error);
    //     console.log(error);
    //     console.log(error.message);
    //     console.log(error.stack);

        return res.status(500).json({
            message: "Cancel Booking Error"
        });
    }
})


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