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
        enum:["booked", "cancelled_by_guest","cancelled_by_host"],
        default:"booked"
    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    totalRent:{
        type:Number,
        required:true
    },
    cancelReason: {
    type: String,
    default: ""
    },
    cancelledAt: {
    type: Date
    },

},{timestamps:true})

const Booking = mongoose.model("Booking",BookingSchema)
export default Booking;