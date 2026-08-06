import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        required:true
    },
    status:{
        type:String,
        enum:["booked", "cancelled_by_guest","cancelled_by_host","current","complete","active"],
        default:"booked"
    },
    bookingStatus:{
       type:String,
       enum:["upComming","checked_in","completed","cancelled"],
       default:"upComming"
    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    },
    cleaningFee: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
     taxes: {
      type: Number,
      default: 0,
    },
    night:{
        type:Number,
        required:true
    },
    paymentMethod: {
      type: String,
      enum: ["online", "pay_at_property"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "checked_in",
        "completed",
        "cancelled",
      ],
    },
    Payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment"
    },
    cancelReason: {
    type: String,
    default: ""
    },
    cancelledAt: {
    type: Date
    },
    completedAt:{
      type: Date
    },
    createdAt:{
      type: Date
    },
    checkInAt:{
      type: Date
    }

},{timestamps:true})

const Booking = mongoose.model("Booking",BookingSchema)
export default Booking;


  

   

   

    

   
