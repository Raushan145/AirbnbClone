import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";
import asyncHandler from "../middlewares/asyncHandler.js";
// import { toast } from "react-toastify";


//  Sign Up controller

export const SignUp = asyncHandler (async (req,res) => {
    //  console.log("Signup API Hit");

        try {
        const {fullName,email,password,mobileNo} = req.body;
        let user = await User.findOne({email}).populate("listing","title image1 image2 image3 description rent category city landmark");
        if(user){
            return res.status(404).json({message:"User Already exists."})
        }

        if(password.length < 6){

            return res.status(400).json({message:"Password must be at least 6 characters."})
        }

        if(mobileNo.length < 10){
            return res.status(400).json({message:"mobile no must be at least 10 digit."})
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        user = await User.create({
            fullName,
            email,
            role: "user",
            mobileNo,
            password: hashedpassword,

        })

        const token = await genToken(user._id);
       
        // Development
        // res.cookie("token", token, {
        // httpOnly: true,
        // secure: false,
        // sameSite: "lax",
        // maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        // Production
         res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         sameSite: "None",
         maxAge: 7 * 24 * 60 * 60 * 1000,
         });

        return res.status(201).json({success: true, message:"SignUp Successfully", user})
            
        } catch (error) {
            console.error("SignUp error:", error);        
            return res.status(500).json({message:"SignUp failed. Please try again."})
        }
 })

 // Sign In 
export const SignIn =asyncHandler (async (req,res) => {
        // console.log("SignIn API Hit");
        try {
        const {email,password} = req.body;

        const user = await User.findOne({email}).populate("listing","title image1 image2 image3 description rent category city landmark");
        if(!user){
            return res.status(404).json({message:"User does not exists."})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
             return res.status(404).json({message:"Incorrect Password"})
        }

        const token = await genToken(user._id);

        // Development
        // res.cookie("token", token, {
        // httpOnly: true,
        // secure: false,
        // sameSite: "lax",
        // maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        // Production
         res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         sameSite: "None",
         maxAge: 7 * 24 * 60 * 60 * 1000,
         });

        return res.status(200).json({message:"LogIn Successfully"})
            
        } catch (error) {
            console.error("SignIn error:", error);
            return res.status(500).json({message:"SignIn failed. Please try again."})
        }
 })

//  LogOut
 export const SignOut =asyncHandler (async (req,res) =>{

    try {
        const token = req.cookies.token
        if(!token){
            //  return res.status(200).json({message: "LogOut Successfully"})
             return res.status(400).json({
             message: "token not Found"
    });
        }
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })
        return res.status(200).json({message: "LogOut Successfully"})
    } catch (error) {
        console.error("SignOut error:", error);
        return res.status(500).json({message:"SignOut failed. Please try again."})
    }
 })


//  Send Otp
export const sendOtp = asyncHandler(async (req,res) =>{

    try {
        const {email} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User does not exists."})
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp;
        user.otpExpires = Date.now()+5*60*1000;
        user.isOtpVerified = false
        
        await user.save();
        sendOtpMail(email, otp);
        return res.status(200).json({message: "OTP sent Successfully"})

    } catch (error) {
        // console.error("Send OTP error:", error);
        return res.status(500).json({message:"Failed to send OTP. Please try again."})
    }

})

// Verify OTP
export const verifyOtp = asyncHandler (async (req,res) =>{

    try {
        
        const {email,otp} = req.body;
        const user = await User.findOne({email});
        if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
          return  res.status(400).json({message:"Invaild OTP"})
        }

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();

       return res.status(200).json({message:"OTP Verified Successfully"})

    } catch (error) {
       return  res.status(500).json({message:"OTP verified Error"})
    }
})

// Reset Password
export const resetPassword = asyncHandler (async (req,res)=>{

    try {
        const {email,newPassword} = req.body;
          const user = await User.findOne({email});
        if(!user || !user.isOtpVerified){
          return  res.status(400).json({message:"otp verification Required"})
        }
        const hashedpassword =await bcrypt.hash(newPassword,10);
        user.password = hashedpassword;

        user.isOtpVerified = false;

        await user.save();

        return res.status(200).json({message:"Password reset Successfully"})

    } catch (error) {
         return  res.status(500).json({message:"Reset OTP Error"})
    }
    
})

// Google Authencation
export const googleAuth = asyncHandler (async (req, res) =>{
    // console.log("Google Auth API Hit");
    try {
        
        const {email,fullName,mobile,profileImg} = req.body;
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                fullName,
                email,
                mobileNo: mobile,
                role: "user",
                profileImg,
            })
        }

        const token = await genToken(user._id);
      
        // Development
        // res.cookie("token", token, {
        // httpOnly: true,
        // secure: false,
        // sameSite: "lax",
        // maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        // Production
         res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         sameSite: "None",
         maxAge: 7 * 24 * 60 * 60 * 1000,
         });
      

        return res.status(202).json({message:"SignUp Successfully", user})

    } catch (error) {
        console.error("Google Auth error:", error);
        return res.status(500).json({message:"Google Auth error. Please try again later."})
    }

})
