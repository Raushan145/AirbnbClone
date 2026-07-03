import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContex";
import { toast } from "react-toastify";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegCircleCheck } from "react-icons/fa6";

const Card = ({
  _id,
  image1,
  image2,
  image3,
  title,
  city,
  landmark,
  rent,
  rating,
  isBooked,
  host
}) => {

  const navigate = useNavigate();
  const {userData} = useContext(userDataContext);
  const {handleViewCard} = (useContext(listingDataContext));

  const handleClick = ()=>{
    if(!userData){
      toast.error("Invalid credentials")
      navigate("/signin")
    }else{
      handleViewCard(_id);
    }
}

  return (
    <div
      onClick={() => handleClick()}
      className="w-[280px] max-w-[90%] rounded-xl overflow-hidden bg-white shadow hover:shadow-xl duration-300 cursor-pointer relative"
    >
     {/* { isBooked &&  <div className="text-green-600 bg-white rounded-full mt-1 px-4 py-1 absolute flex items-center gap-2 justify-center right-1 top-1 z-[10]">
         <FaRegCircleCheck className="w-[17px] h-[17px] text-green-600 " /> Booked
      </div>} */}


      {/* Images */}
      <div className="w-full h-[220px] overflow-x-auto flex cardImg scroll-smooth relative">
        <img
          src={image1}
          alt={title}
          className="w-full h-full object-cover flex-shrink-0"
        />

        <img
          src={image2}
          alt={title}
          className="w-full h-full object-cover flex-shrink-0"
        />

        <img
          src={image3}
          alt={title}
          className="w-full h-full object-cover flex-shrink-0"
        />

        {/* Three line bar for edit and delete */}
        {/* {userData.host <span className="w-7 h-7 rounded-full flex justify-center items-center absolute right-2 top-1 text-xl bg-gray-200 cursor-pointer"><HiOutlineDotsVertical /></span>
        <div className="flex flex-col items-start justify-around  bg-zinc-200 text-black absolute top-9 right-4 rounded-2xl overflow-hidden">
          <span className="text-black font-semibold hover:bg-zinc-300 active:scale-95 w-full px-4 py-1 mb-1">Edit</span>
          <span className="text-black font-semibold hover:bg-zinc-300 active:scale-95 w-full px-4 py-1 ">Delete</span>
        </div>} */}
      </div>

      {/* Details */}
      <div className="p-3">

        <h2 className="font-semibold text-lg truncate">
          {title}
        </h2>

        <p className="text-gray-600 truncate">
          {landmark}, {city},{rating}
        </p>

        <h3 className="font-bold mt-2">
          ₹ {rent}
          <span className="font-normal text-gray-500">
            {" "}
            / day
          </span>
        </h3>

      </div>
    </div>
  );
};

export default Card;