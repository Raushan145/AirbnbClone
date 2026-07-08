import React, { useContext, useMemo, useState } from "react";
import Nav from "../Component/Nav";
import Card from "../Component/Card";
import { listingDataContext } from "../Context/ListingContex";
// import { DotLoader } from "react-spinners";
import Footer from "../Component/Footer";
import Skeleton from 'react-loading-skeleton'
import SkeletonCard from "../Component/Skeleton/SkeletonCard";


const Home = () => {
  // const [loading, setLoading] = useState(false);
  const {loading , allListing} = useContext(listingDataContext);

  const [cate, setCate] = useState("All");

  const filteredListings = useMemo(() => {
    if (cate === "All") return allListing;

    return allListing.filter(
      (item) => item.category.toLowerCase() === cate.toLowerCase()
    );
  }, [cate, allListing]);

  return (
    <>
      <Nav page="home" cate={cate} setCate={setCate} loading={loading}/>

   <div className="pt-[150px] md:px-10">

  {loading ? (

  //    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-4">
  //   {Array.from({ length: 8 }).map((_, index) => (
  //     <div key={index} className="space-y-2">
  //       <Skeleton height={250} borderRadius={15} />
  //       <Skeleton height={20} width="80%" />
  //       <Skeleton height={18} width="60%" />
  //       <Skeleton height={18} width="40%" />
  //     </div>
  //   ))}
  // </div>
       <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>

  ) : (

    <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6">

      {filteredListings.length > 0 ? (
        filteredListings.map((item) => (
          <Card key={item._id} {...item} />
        ))
      ) : (
        <h1 className="w-full text-center text-3xl mt-20">
          No Listing Found
        </h1>
      )}

    </div>

  )}

</div>

      <Footer />
    </>
  );
};

export default Home;