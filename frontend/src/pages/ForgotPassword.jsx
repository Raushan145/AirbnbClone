import React from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { ServerURL } from "../App";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";



const ForgotPassword = () => {

const primaryColor = '#ff4d2d'
const hoverColor = '#e64323'
const bgColor = '#fff9f6'
const borderColor = '#ddd'

  const [step, setStep] = useState(1);
  const [showenterPassword, setShowEnterPassword] = useState(false);
  const [showconfirmPassword, setConfirmShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOPT] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const SetPassword =()=>{
    setEnterPassword("")
    setReEnterPassword("")
  }

  // Send OTP
  const handleSendOtp = async ()=>{
    setLoading(true)
    try {
      const result = await axios.post(`${ServerURL}/api/auth/send-otp` ,{email} ,{withCredentials:true})

      // console.log(result);
      toast.success(result.data.message);
      setStep(2);
      setLoading(false)
    } catch (error) {
      // console.log(error)
      setLoading(false)
       toast.error(error.response?.data?.message || "Something went wrong"); 
    }
  }

  // Verify OTP
  const handleVerifyOtp = async ()=>{
    setLoading(true)
    try {
      const result = await axios.post(`${ServerURL}/api/auth/verify-otp` ,{email,otp}, {withCredentials:true})

      // console.log(result);
       toast.success(result.data.message);
       setLoading(false)
      setStep(3);
    } catch (error) {
      // console.log(error) 
      setLoading(false)
       toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  // Reset Password
  const handleResetPassword = async ()=>{

    setLoading(true)
    if(newPassword != confirmPassword){
      setLoading(false)
      toast.error("Confirm password must match the new password");
      return 
    }

    try {
      const result = await axios.post(`${ServerURL}/api/auth/reset-password` ,{email, newPassword}, {withCredentials:true})

      console.log(result);
      toast.success(result.data.message);
      navigate('/signin')
      setLoading(false)
    } catch (error) {
      // console.log(error) 
      setLoading(false)
       toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 w-full bg-[#fff9f6]">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-5">

        {/* Heading and pre btn */}
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowBack size={30} className="text-[#fffff] cursor-pointer" onClick={()=>navigate(-1)}/>
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* Step 1 => Enter email id */}
        {step == 1 && 
        <div>
             {/* Email */}
        <div className='mb-7'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input type="email" placeholder='Enter your Email' onChange={(e)=> setEmail(e.target.value)} value={email}
            className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none ' />
        </div>

          <button className={`w-full mt-4 flex justify-center items-center gap-2 font-semibold border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer active:scale-95`}
              onClick={handleSendOtp} disabled={loading} > {loading? <BeatLoader size={15} color='white'/> : "Send OTP"}</button>

        </div>}

        {/* Enter OTP */}
        {step == 2 && 
        <div>
             {/* Enter OTP */}
        <div className='mb-7'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'> OTP</label>
            <input type="email" placeholder='Enter OTP' onChange={(e)=> setOPT(e.target.value)} value={otp}
            className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none ' />
        </div>

          <button className={`w-full mt-4 flex justify-center items-center gap-2 font-semibold border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer active:scale-95`}
               onClick={handleVerifyOtp} disabled={loading} >{loading? <BeatLoader size={15} color='white'/> : "Verify"}</button>

        </div>}

        {/* Enter New Password */}
        {step == 3 && 
        <div>

        {/* Password */} 
        <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Enter New Password</label>
            <div className='relative'>
            <input type={`${showenterPassword ? "text" : "password"}`} placeholder='New Password' onChange={(e)=> setNewPassword(e.target.value)} value={newPassword}
            className='w-full border rounded-lg px-3 py-2 focus:outline-none' style={{border: `1px solid ${borderColor}`}}/>
            <button className='absolute right-5 top-[12px] text-xl cursor-pointer' onClick={()=>{setShowEnterPassword(prev => !prev)}}>{!showenterPassword ? <IoMdEye /> : <IoMdEyeOff />}</button>
            </div>
        </div>

        {/* Re-enter Password */} 
        <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
            <div className='relative'>
            <input type={`${showconfirmPassword ? "text" : "password"}`} placeholder='Confirm Password' onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}
            className='w-full border rounded-lg px-3 py-2 focus:outline-none' style={{border: `1px solid ${borderColor}`}}/>
            <button className='absolute right-5 top-[12px] text-xl cursor-pointer' onClick={()=>{setConfirmShowPassword(prev => !prev)}}>{!showconfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}</button>
            </div>
        </div>

          <button className={`w-full mt-5 flex justify-center items-center gap-2 font-semibold border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer active:scale-95`}
           onClick={handleResetPassword} disabled={loading} >{loading? <BeatLoader size={15} color='white'/> : "Reset Password"}</button>

        </div>}

      </div>
    </div>
  );
};

export default ForgotPassword;



