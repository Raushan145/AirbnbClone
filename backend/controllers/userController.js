import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/usermodel.js";

export const getCurrentUser =asyncHandler (async (req,res) => {

    try {

        const token = req.cookies.token;

        if (!token) {
          return res.status(401).json({ message: "Unauthorized"});
        }   

        const userId = req.userId;
        if(!userId){
          return  res.status(400).json({message:"UserId Not Found"})
        }

        const user = await User.findById(userId).select("-password")
        // .populate("listing","title image1 image2 image3 description rent category city landmark")
        .populate({
          path: "Booking",
          select: "checkIn checkOut status totalRent cancelReason cancelledAt host guest Listing",
          populate: [
            {
              path: "Listing",
              select: "title image1 image2 image3 description rent category city landmark "
            },
            {
              path: "host",
              select: "fullName email profileImg mobileNo"
            },
            {
              path: "guest",
              select: "fullName email profileImg mobileNo"
            },
             {
              path: "Payment",
              select:
                "amount currency paymentStatus paymentMethod razorpayOrderId razorpayPaymentId transactionId paidAt method"
            }
          ]
         })
        if(!user){
          return  res.status(400).json({message:"Current User not found"})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.error("Get Current User Error:", error);
        return res.status(400).json({message:`Get Current User Error ${error}`})
    }

})