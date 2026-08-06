import React from "react";
import {
  GiVillage,
  GiFamilyHouse,
  GiWoodCabin,
} from "react-icons/gi";
import {
  MdOutlineWhatshot,
  MdPool,
  MdBedroomParent,
} from "react-icons/md";
import { FaHouseFlag, FaShop } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";

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

const Categories = ({ cate, setCate }) => {
  return (
      <div className="flex gap-8 overflow-x-auto px-5 md:justify-center h-16 items-center">

        {categories.map((item) => (
          <div
            key={item.name}
            onClick={() => setCate(item.name)}
            className={`flex flex-col items-center cursor-pointer pb-1 ${
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
  );
};

export default Categories;