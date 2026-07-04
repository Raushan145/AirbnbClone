import React, { useContext, useState } from "react";
import logo from "../assets/logo2.jpeg";
import { IoIosSearch } from "react-icons/io";
import {
  GiHamburgerMenu,
  GiVillage,
  GiFamilyHouse,
  GiWoodCabin,
} from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import {
  MdOutlineWhatshot,
  MdPool,
  MdBedroomParent,
} from "react-icons/md";
import { FaHouseFlag, FaShop } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ServerURL } from "../App";
import { userDataContext } from "../Context/UserContext";
import { useEffect } from "react";
import { listingDataContext } from "../Context/ListingContex";

const categories = [
  { name: "All", icon: <MdOutlineWhatshot /> },
  { name: "Villa", icon: <GiVillage /> },
  { name: "Farm House", icon: <GiFamilyHouse /> },
  { name: "Pool House", icon: <MdPool /> },
  { name: "Rooms", icon: <MdBedroomParent /> },
  { name: "Flat", icon: <FaHouseFlag /> },
  { name: "PG", icon: <IoBedOutline /> },
  { name: "Cabin", icon: <GiWoodCabin /> },
  { name: "Shops", icon: <FaShop /> },
];

const Nav = ({
  page = "home",
  cate,
  setCate,
}) => {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(userDataContext);
  const[input,setInput] = useState("")
  const{listingData,setListingData,searchData, handleSearch ,data, setData} = useContext(listingDataContext)

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${ServerURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUserData(null);
      toast.success("Logout Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  // const timer = setTimeout(() => {
    handleSearch(input);
  // }, 100); // 400ms debounce

  // return () => clearTimeout(timer);
}, [input]);

// useEffect(() => {
//   const handleClick = () => {
//     setShowMenu(false);
//   };

//   window.addEventListener("click", handleClick);

//   return () => {
//     window.removeEventListener("click", handleClick);
//   };
// }, []);

  return (
    <nav className="fixed top-0 bg-white z-50 w-full">

      {/* Navbar */}

      <div className="w-full h-17 shadow flex justify-between items-center md:px-10 px-2">

        <img
          src={logo}
          className="md:w-[130px] w-[80px] cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex justify-center items-center md:px-4 px-2 py-1 ml-2 mr-2 md:w-[40%] w-[70%] rounded-2xl bg-zinc-100">
          <input
            placeholder="Any Where | Any Location | Any City"
            onChange={(e)=>setInput(e.target.value)} value={input}
            className="w-full bg-transparent outline-none"
          />
          <IoIosSearch size={20} className="md:ml-0 ml-2"/>
        </div>

        <div className="flex items-center gap-4">

           <button
            onClick={() => navigate("/Reservations-Dashboard")}
            className="hidden md:block bg-zinc-100 px-4 py-2 rounded-full hover:bg-zinc-200 cursor-pointer"
          >
            Reservations
          </button>

          <button
            onClick={() => navigate("/listingpage1")}
            className="hidden md:block bg-zinc-100 px-4 py-2 rounded-full hover:bg-zinc-200 cursor-pointer"
          >
            List Your Home
          </button>

          <div className="relative flex items-center gap-3 bg-zinc-100 md:px-4 md:py-2 px-2 py-1 rounded-full">

            {userData ? (
              <span className="w-7 h-7 rounded-full hidden bg-blue-500 text-white md:flex justify-center items-center">
               {userData?.fullName?.charAt(0)}
              </span>
            ) : (
              <CgProfile size={24} />
            )}

            <GiHamburgerMenu
              size={22}
              className="cursor-pointer"
              onClick={() => {
               
                setShowMenu(prev => !prev)}}
            />

            {showMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-lg shadow w-56">

                <div className="flex  items-center gap-3 ">
                 <span className="w-9 h-9 rounded-full ml-2 mt-5 mb-3 bg-blue-500 text-white flex justify-center items-center overflow-hidden">
                  {userData?.profileImg ? (
                    <img
                      src={userData.profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : userData?.fullName ? (
                    userData.fullName.charAt(0).toUpperCase()
                  ) : (
                    <CgProfile size={24} />
                  )}
                </span>

                  <div>
                    <h3 className="text-lg font-bold text-cyan-600"> {userData?.fullName || "Hello"}</h3>
                    <h4 className="text-[0.7rem] font-semibold text-cyan-950">{userData?.email || "Welcome back to Airbnb!"}</h4>
                  </div>
                </div>

                {!userData ? (
                  <div
                    onClick={() => {navigate("/signin")
                       setShowMenu(false)
                    }}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Login
                  </div>
                ) : (
                  <div
                    onClick={handleLogout}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </div>
                )}

                <div
                  onClick={() => {navigate("/listingpage1")
                    setShowMenu(false)
                  }}
                  className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  List Your Home
                </div>

                <div
                  onClick={() => {navigate("/Reservations-Dashboard")
                    setShowMenu(false)
                  }}
                  className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  Reservations
                </div>

                <div
                  onClick={() => {navigate("/mylisting") 
                    setShowMenu(false)
                  }}
                  className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  My Listing
                </div>

                <div
                  onClick={() => {navigate("/mybooking") 
                    setShowMenu(false)
                  }}
                  className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  My Booking
                </div>

              </div>
            )}

          </div>

        </div>

           {searchData.length>0 &&  <div className="absolute left-60 top-14 w-[45%] bg-white rounded-2xl shadow-xl p-6 text-center text-gray-500 z-50">
             {
              searchData.map((search) =>{
                <div className="border-b border-black p-[10px] "> {search.title} in {search.landmark},{search.city} </div>
              })
             }
            </div>}
         </div>

      {/* Categories */}

      <div className="flex gap-8 mt-2 catScroll overflow-x-auto px-5 md:justify-center h-16 items-center">

        {categories.map((item) => (
          <div
            key={item.name}
            onClick={() => setCate(item.name)}
            className={`flex flex-col items-center cursor-pointer  pb-1 ${
              cate === item.name
                ? "border-b-2 border-black"
                : "hover:border-b hover:border-gray-400"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </div>
        ))}

      </div>

    </nav>
  );
};

export default Nav;