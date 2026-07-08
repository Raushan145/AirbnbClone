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
import { userDataContext } from '../Context/UserContext';
import { FaChevronLeft } from "react-icons/fa";



const SignIn = () => {
    
const navigate = useNavigate()
const primaryColor = '#ff4d2d'
const hoverColor = '#e64323'
const bgColor = '#fff9f6'
const borderColor = '#ddd'

 const [showPassword, setShowPassword] = useState(false);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false)
 const {userData, setUserData} = useContext(userDataContext)
 const { getCurrentUser } = useContext(userDataContext);


 const handleSignIn = async ()=>{
    setLoading(true);
    if(email == ''){
         toast.error("Email is required");
         setLoading(false);
         return
    }
    if(password == ''){
         toast.error("Password is requiered");
        setLoading(false);
         return
    }
    try {
       const result =  await axios.post(`${ServerURL}/api/auth/signin`,{
            email,password
        },{withCredentials:true})
        setUserData(result.data);
        toast.success("Signed in successfully");
        getCurrentUser();
        navigate("/home");
        setLoading(false);
    } catch (error) {
        // console.log(error)
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
 }
 
 const handleGoogleAuth = async () => {

    const provider = new GoogleAuthProvider();
    
    try {
        const result = await signInWithPopup(auth, provider);
        // console.log(result)
        
       const result2 =  await axios.post(`${ServerURL}/api/auth/google-auth`,{
            email:result.user.email,
        }, {withCredentials:true})
         setUserData(result2.data);
         getCurrentUser();
        toast.success("LogIn successfully");
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
             <div
                    className="px-4 py-2 bg-white rounded-full shadow cursor-pointer flex justify-center items-center hover:bg-zinc-50 absolute top-5 left-5 active:scale-95"
                    onClick={() => navigate("/")}
                  >
                   <span className='flex justify-center items-center gap-2'> <FaChevronLeft size={15}/> Back</span>
                  </div>
                <h1 className={`text-3xl font-bold mb-2 text-`} style={{color:primaryColor}}>Airbnb</h1>

                <p className='text-gray-500 mb-8'>Sign In to your account to get started with delicious food deliveries</p>

               
                {/* Email */}    
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" required placeholder='Enter your Email' onChange={(e)=> setEmail(e.target.value)} value={email}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none ' style={{border: `1px solid ${borderColor}`}}/>
                </div>
              
                {/* Password */}
                
                <div className='mb-8'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                    <input type={`${showPassword ? "text" : "password"}`} required placeholder='Enter your Password' onChange={(e)=> setPassword(e.target.value)} value={password}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none' style={{border: `1px solid ${borderColor}`}}/>
                    <button className='absolute right-5 top-[12px] text-xl cursor-pointer' onClick={()=>{setShowPassword(prev => !prev)}}>{!showPassword ? <IoMdEye /> : <IoMdEyeOff />}</button>
                    <span className='absolute right-5 -bottom-5 text-sm cursor-pointer underline' onClick={()=>navigate("/forgot-password")}>forgot Password</span>
                    </div>
                </div>

                 <button className={`w-full mt-4 flex justify-center items-center gap-2 font-semibold border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer active:scale-95`}
                 onClick={handleSignIn} disabled={loading}>{loading? <BeatLoader size={15} color='white'/> : "Sign In"}</button>

              
                 <button className='w-full flex justify-center items-center mt-4 gap-2 border border-gray-400 hover:bg-gray-50 rounded-xl px-4 py-2 transition duration-200'
                                onClick={handleGoogleAuth} ><FcGoogle size={20}/> <span>continue with Google</span></button>
                

                <p className='text-center mt-3 '>want a create a new account ? <span onClick={()=>{navigate("/signup")}} className="cursor-pointer text-[#fffff] font-semibold">Sign Up</span></p>

        </div>
       
    </div>
  )
}

export default SignIn
