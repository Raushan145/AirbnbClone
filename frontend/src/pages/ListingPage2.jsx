import React, { useContext } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { GiVillage } from "react-icons/gi";
import { GiFamilyHouse } from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { FaHouseFlag } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";

import { listingDataContext } from "../Context/ListingContex";

const ListingPage2 = () => {
  const navigate = useNavigate();

  const { category, setCategory } = useContext(listingDataContext);

  const categories = [
    {
      name: "Villa",
      icon: <GiVillage size={30} />,
    },
    {
      name: "Farm House",
      icon: <GiFamilyHouse size={30} />,
    },
    {
      name: "Pool House",
      icon: <MdPool size={30} />,
    },
    {
      name: "Rooms",
      icon: <MdBedroomParent size={30} />,
    },
    {
      name: "Flat",
      icon: <FaHouseFlag size={30} />,
    },
    {
      name: "PG",
      icon: <IoBedOutline size={30} />,
    },
    {
      name: "Cabin",
      icon: <GiWoodCabin size={30} />,
    },
    {
      name: "Shop",
      icon: <FaShop size={30} />,
    },
  ];

  return (
    <div className="w-full h-screen bg-amber-50 flex justify-center items-center relative overflow-hidden">

      {/* Back Button */}
      <div
        className="w-12 h-12 bg-white rounded-full shadow cursor-pointer flex justify-center items-center absolute top-5 left-5 active:scale-95"
        onClick={() => navigate("/listingpage1")}
      >
        <FaChevronLeft size={22} />
      </div>

      {/* Heading */}
      <div className="absolute top-5 right-5 bg-red-600 text-white px-8 py-2 rounded-full shadow-lg text-lg">
        Setup Your Category
      </div>

      {/* Main Box */}
      <div className="max-w-5xl w-[95%] md:w-[80%] h-[85vh] bg-white rounded-xl shadow-lg mt-10 flex flex-col">

        <h2 className="text-3xl font-semibold text-center mt-8">
          Which of these best describe your place?
        </h2>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-4 gap-5">

          {categories.map((item) => (
            <div
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`cursor-pointer rounded-xl border p-5 flex flex-col justify-center items-center transition-all duration-200 hover:border-red-500 hover:shadow-md
              
              ${
                category === item.name
                  ? "border-red-500 border-2 bg-red-50"
                  : "border-gray-300"
              }`}
            >
              <div className="text-3xl">{item.icon}</div>

              <h3 className="mt-3 font-medium text-lg">
                {item.name}
              </h3>
            </div>
          ))}

        </div>

        <div className="flex justify-end p-6">

          <button type="button" onClick={() => navigate("/listingpage3")}  disabled={!category} className={`px-9 py-1 text-[20px] rounded-3xl mt-2 shadow-lg ${category ? "bg-red-600 text-white cursor-pointer": "bg-red-400 text-white cursor-not-allowed"}`}>
            Next
           </button>

        </div>

      </div>
    </div>
  );
};

export default ListingPage2;