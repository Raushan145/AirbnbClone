import React, { useContext, useMemo, useState } from "react";
import Nav from "../Component/Nav";
import Card from "../Component/Card";
import { listingDataContext } from "../Context/ListingContex";
import { userDataContext } from "../Context/UserContext";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MyListing = () => {
  const { allListing } = useContext(listingDataContext);
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

        <h1 className="text-3xl font-bold mb-8 absolute left-10 top-20 z-50">
          My Listings
        </h1>

        <div className="flex flex-wrap gap-6 justify-center">

             {/* Three line bar for edit and delete */}
       {/* <span className="w-7 h-7 rounded-full flex justify-center items-center absolute right-2 top-1 text-xl bg-gray-200 cursor-pointer"> <HiOutlineDotsVertical /> </span>
        <div className="flex flex-col items-start justify-around  bg-zinc-200 text-black absolute top-9 right-4 rounded-2xl overflow-hidden">
          <span className="text-black font-semibold hover:bg-zinc-300 active:scale-95 w-full px-4 py-1 mb-1">Edit</span>
          <span className="text-black font-semibold hover:bg-zinc-300 active:scale-95 w-full px-4 py-1 ">Delete</span>
        </div> */}



          {filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <Card key={item._id} {...item} />
            ))
          ) : (
            <div className="text-3xl text-gray-500 mt-20">
              No Listing Found
            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default MyListing;