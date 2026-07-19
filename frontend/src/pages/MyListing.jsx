import React, { useContext, useEffect, useMemo, useState } from "react";
import Nav from "../Component/Nav";
import Card from "../Component/Card";
import { listingDataContext } from "../Context/ListingContex";
import { userDataContext } from "../Context/UserContext";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SyncLoader } from "react-spinners";
import Footer from "../Component/Footer";

const MyListing = () => {
  const { allListing,loading } = useContext(listingDataContext);
  const { userData } = useContext(userDataContext);

  const [cate, setCate] = useState("All");
  const myListings = useMemo(() => {
    return allListing.filter(
      (item) => item.host === userData?._id
    );
  }, [allListing, userData]);

  const filteredListings =
    cate === "All"
      ? myListings
      : myListings.filter(
          (item) =>
            item.category.toLowerCase() === cate.toLowerCase()
        );

  return (
    <>
      <Nav
        page="mylisting"
        cate={cate}
        setCate={setCate}
      />

      <div className="pt-[150px] px-10 relative">

        <h1 className="md:text-3xl text-lg font-bold mb-8 md:fixed left-5 top-20 bg-white z-50">
          My Listings
        </h1>

        {/* <div className="flex flex-wrap items-center"> */}

             {/* Three line bar for edit and delete */}
       {/* <span className="w-7 h-7 rounded-full flex justify-center items-center absolute right-2 top-1 text-xl bg-gray-200 cursor-pointer"> <HiOutlineDotsVertical /> </span>
        <div className="flex flex-col items-start justify-around  bg-zinc-200 text-black absolute top-9 right-4 rounded-2xl overflow-hidden">
          <span className="text-black font-semibold hover:bg-zinc-300 active:scale-95 w-full px-4 py-1 mb-1">Edit</span>
          <span className="text-black font-semibold hover:bg-zinc-300 active:scale-95 w-full px-4 py-1 ">Delete</span>
        </div> */}


         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">

              {
              loading ? (
                  <div className="w-[90vw] h-[60vh] flex justify-center items-center">
                    <SyncLoader color="#0b110a" size={13}/>
                  </div>
              )
              :
              filteredListings.length > 0 ? (
                  filteredListings.map((item)=>(
                    <Card key={item._id} {...item}/>
                  ))
              )
              :
              (
               <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">

                <div className="text-6xl mb-5">
                  🏠
                </div>

                <h2 className="text-3xl font-bold text-gray-800">
                  No Listings Found
                </h2>

                <p className="text-gray-500 mt-3 max-w-md">
                  You haven't created any listings yet. Become a host and start earning by welcoming guests.
                </p>

                <button
                  onClick={() => navigate("/listingpage1")} // apna route yaha de
                  className="mt-8 px-7 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Become a Host
                </button>

              </div>
              )

              }

              </div>

      </div>

      <Footer />
    </>
  );
};

export default MyListing;