import mongoose, { model } from 'mongoose';

const userScheme = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImg:{
        type:String,
    },
    password:{
        type:String,
    },
    mobileNo:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user"],
        default:"user",
        required:true
    },
    resetOtp:{
        type:String,
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    },
    otpExpires:{
        type:Date
    },
    listing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }],
    Booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }]

},{timestamps:true})

const User = mongoose.model("User",userScheme);

export default User;