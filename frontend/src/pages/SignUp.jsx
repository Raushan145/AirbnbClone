import React, { useContext } from 'react'
import { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerURL } from '../App';
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { BeatLoader } from "react-spinners";
import { userDataContext } from '../Context/UserContext.jsx';


const SignUp = () => {
    
const navigate = useNavigate()
const primaryColor = '#ff4d2d'
const hoverColor = '#e64323'
const bgColor = '#fff9f6'
const borderColor = '#ddd'

 const [showPassword, setShowPassword] = useState(false);
 const [fullName, setFullName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [mobile, setMobile] = useState("");
 const [loading, setLoading] = useState(false)
 const {userData, setUserData} = useContext(userDataContext)
 const { getCurrentUser } = useContext(userDataContext);

 

 const handleSignUp = async ()=>{
    setLoading(true);
    try {
        const result =  await axios.post(`${ServerURL}/api/auth/signup`,{
            fullName,email,password,mobile
        },{withCredentials:true})
        setUserData(result.data)
        toast.success("Account created successfully");
        getCurrentUser();
        navigate("/");
        setLoading(false);
    } catch (error) {
        // console.log(error)
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong");
    }
 }

 const handleGoogleAuth = async () => {
    if(!mobile){
    toast.error("Mobile Number is required");
       return  
    }
    const provider = new GoogleAuthProvider();
    
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result)
        
        const result2 =  await axios.post(`${ServerURL}/api/auth/google-auth`,{
            fullName:result.user.displayName,
            email:result.user.email,
            mobile, profileImg:result.user.photoURL
        }, {withCredentials:true})
        setUserData(result2.data)
        getCurrentUser();
        toast.success("Account created successfully");
        navigate("/");

    } catch (error) {
        console.log(error);
        if(error.code === 'auth/popup-closed-by-user') {
            toast.error("Popup closed. Please try again.");
        } else {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

 }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4' style={{backgroundColor: bgColor}}>
        <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-4 border-[1px] `} style={{border: `1px solid ${borderColor}`}} >

                <h1 className={`text-3xl font-bold mb-2 text-`} style={{color:primaryColor}}>Airbnb</h1>
                <p className='text-gray-500 mb-8'>Create your account to get started with delicious food deliveries</p>

                {/* Full Name */}       
                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1 '>Full Name</label>
                    <input type="text" placeholder='Enter your Full Name' onChange={(e)=> setFullName(e.target.value)} value={fullName}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none ' required style={{border: `1px solid ${borderColor}`}}/>
                </div>

                {/* Email */}
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1 '>Email</label>
                    <input type="email" placeholder='Enter your Email' onChange={(e)=> setEmail(e.target.value)} value={email}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none ' required style={{border: `1px solid ${borderColor}`}}/>
                </div>

                {/* Mobile No */}             
                <div className='mb-4'>
                    <label htmlFor="Mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
                    <input type="text" required placeholder='Enter your Mobile Number' onChange={(e)=> setMobile(e.target.value)} value={mobile}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none ' style={{border: `1px solid ${borderColor}`}}/>
                </div>

                {/* Password */} 
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                    <input type={`${showPassword ? "text" : "password"}`} required placeholder='Enter your Password' onChange={(e)=> setPassword(e.target.value)} value={password}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none' style={{border: `1px solid ${borderColor}`}}/>
                    <button className='absolute right-5 top-[12px] text-xl cursor-pointer' onClick={()=>{setShowPassword(prev => !prev)}}>{!showPassword ? <IoMdEye /> : <IoMdEyeOff />}</button>
                    {/* <a href="#" className='absolute right-5 -bottom-6 text-sm cursor-pointer underline'>forgget Password</a> */}
                    </div>
                </div>

                {/* Sign up btn */}
                 <button className={`w-full mt-4 flex justify-center items-center gap-2 font-semibold border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer active:scale-95`}
                 onClick={handleSignUp} disabled={loading} >{loading ? <BeatLoader size={15} color="white"/> : "Sign up"}</button>

                {/* Sing up wu=ith Google */}
                <button className='w-full flex justify-center items-center mt-4 gap-2 border border-gray-400 hover:bg-gray-50 rounded-xl px-4 py-2 transition duration-200'
                onClick={handleGoogleAuth} ><FcGoogle size={20}/> <span>Sign up with Google</span></button>

                {/* Already Account */}
                <p className='text-center mt-3 '>Alredy have an account ? <span onClick={()=>{navigate("/signin")}} className="cursor-pointer text-[#fffff] font-semibold">Sign In</span></p>

        </div>
       
    </div>
  )
}

export default SignUp
