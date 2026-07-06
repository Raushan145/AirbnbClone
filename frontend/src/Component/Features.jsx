// import { MdBedroomParent, MdOutlineLocalLaundryService } from "react-icons/md";
import React, { useState } from "react";import {
  FaWifi,
  FaTv,
  FaParking,
  FaSnowflake,
  FaSwimmingPool,
  FaHotTub,
  FaFireExtinguisher,
  FaDog,
  FaLock,
  FaTree,
  FaWater,
  FaUtensils,
  FaShower,
  FaFan,
  FaSmokingBan,
  FaFirstAid,
  FaWineGlass,
  FaChild,
} from "react-icons/fa";

import {
  MdBedroomParent,
  MdOutlineLocalLaundryService,
  MdOutlineKitchen,
  MdOutlineIron,
  MdOutlineMicrowave,
  MdOutlineBalcony,
} from "react-icons/md";

import {
  GiBarbecue,
  GiCampfire,
} from "react-icons/gi";

import {
  IoWaterOutline,
  IoCarSportOutline,
} from "react-icons/io5";

import {
  BsHouseDoor,
  BsCupHot,
} from "react-icons/bs";

const features = [
  {
    icon: FaLock,
    title: "Lock on Bedroom Door",
    description: "Private room with secure lock.",
  },
  {
    icon: FaTree,
    title: "Garden View",
    description: "Beautiful garden view.",
  },
  {
    icon: FaWater,
    title: "Lake Access",
    description: "Direct lake access.",
  },
  {
    icon: MdOutlineKitchen,
    title: "Kitchen",
    description: "Fully equipped kitchen.",
  },
  {
    icon: FaWifi,
    title: "Wi-Fi",
    description: "High-speed internet.",
  },
  {
    icon: MdBedroomParent,
    title: "Bedroom",
    description: "Comfortable bedroom.",
  },
  {
    icon: FaParking,
    title: "Free Parking",
    description: "Parking on premises.",
  },
  {
    icon: FaSnowflake,
    title: "Air Conditioning",
    description: "Cooling available.",
  },
  {
    icon: FaTv,
    title: "Smart TV",
    description: "Entertainment available.",
  },
  {
    icon: MdOutlineLocalLaundryService,
    title: "Washing Machine",
    description: "Laundry facilities.",
  },
  {
    icon: FaSwimmingPool,
    title: "Swimming Pool",
    description: "Outdoor pool.",
  },
  {
    icon: FaHotTub,
    title: "Hot Water",
    description: "24×7 hot water.",
  },
  {
    icon: FaDog,
    title: "Pets Allowed",
    description: "Pets are welcome.",
  },
  {
    icon: FaFireExtinguisher,
    title: "Fire Extinguisher",
    description: "Safety equipment available.",
  },
  {
    icon: FaFirstAid,
    title: "First Aid Kit",
    description: "Emergency first aid kit.",
  },
  {
    icon: FaShower,
    title: "Shower",
    description: "Private bathroom shower.",
  },
  {
    icon: FaFan,
    title: "Ceiling Fan",
    description: "Fan available.",
  },
  {
    icon: MdOutlineIron,
    title: "Iron",
    description: "Iron available.",
  },
  {
    icon: MdOutlineMicrowave,
    title: "Microwave",
    description: "Microwave oven.",
  },
  {
    icon: BsCupHot,
    title: "Coffee Maker",
    description: "Tea & coffee maker.",
  },
  {
    icon: FaWineGlass,
    title: "Dining Area",
    description: "Dedicated dining space.",
  },
  {
    icon: GiBarbecue,
    title: "BBQ Grill",
    description: "Outdoor BBQ grill.",
  },
  {
    icon: GiCampfire,
    title: "Fire Pit",
    description: "Outdoor fire pit.",
  },
  {
    icon: MdOutlineBalcony,
    title: "Balcony",
    description: "Private balcony.",
  },
  {
    icon: IoWaterOutline,
    title: "Waterfront",
    description: "Waterfront location.",
  },
  {
    icon: BsHouseDoor,
    title: "Private Entrance",
    description: "Separate entrance.",
  },
  {
    icon: IoCarSportOutline,
    title: "EV Charger",
    description: "Electric vehicle charging.",
  },
  {
    icon: FaSmokingBan,
    title: "No Smoking",
    description: "Smoking not allowed.",
  },
  {
    icon: FaChild,
    title: "Family Friendly",
    description: "Suitable for families.",
  },
];

const Features = () => {
  const [showAll, setShowAll] = useState(false);
  const [showFeaturesPopUp, setShowFeaturesPopUp] = useState(false);

  return (
    <div>
       <h2 className="text-2xl font-bold py-4">What this place offers</h2>
      {features.slice(0, 5).map((item, index) => {
        const Icon = item.icon;

        return (
          <div key={index} className="flex items-center gap-6  py-2">
            <div className="h-12 w-12 rounded-full  flex items-center justify-center">
              <Icon className="text-2xl text-red-400" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => setShowFeaturesPopUp(true)}
        className="mt-5 px-6 py-2  border-black bg-zinc-200  cursor-pointer rounded-lg font-semibold hover:bg-black hover:text-white duration-300"
      >
        Show All {features.length} amenities
      </button>
      {/* {features.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 px-6 py-2  border-black bg-zinc-200  cursor-pointer rounded-lg font-semibold hover:bg-black hover:text-white duration-300"
        >
          {showAll
            ? "Show Less"
            : `Show All ${features.length} amenities`}
        </button>
      )} */}

      {showFeaturesPopUp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-500">
          <div className="bg-white w-[90%] md:w-[60%] h-[80vh] rounded-2xl overflow-hidden">

            {/* Fixed Header */}
            <div className="sticky top-0 bg-white border-b px-6 h-16 flex items-center justify-between z-10">

              <h2 className="text-xl font-semibold">
                All {features.length} amenities
              </h2>
              <button
                onClick={() => setShowFeaturesPopUp(false)}
                className="text-2xl font-bold hover:bg-gray-100 h-10 absolute right-5 w-10 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              {/* Empty div for center alignment */}
              <div className="w-10"></div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-[calc(80vh-64px)] px-6 ">
              <h2 className="text-2xl font-bold py-4">What this place offers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={index} className="flex items-center gap-6 py-2">
                      <div className="h-12 w-12 flex items-center justify-center">
                        <Icon className="text-2xl text-red-400" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-500 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Features;
