import React, { useContext, useMemo, useState } from "react";
import Nav from "../Component/Nav";
import Card from "../Component/Card";
import { listingDataContext } from "../Context/ListingContex";

const Home = () => {
  const { allListing } = useContext(listingDataContext);

  const [cate, setCate] = useState("All");

  const filteredListings = useMemo(() => {
    if (cate === "All") return allListing;

    return allListing.filter(
      (item) => item.category.toLowerCase() === cate.toLowerCase()
    );
  }, [cate, allListing]);

  return (
    <>
      <Nav page="home" cate={cate} setCate={setCate}/>

      <div className="pt-[150px] md:px-10 grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-1">

        {filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <Card
              key={item._id}
              {...item}
            />
          ))
        ) : (
          <h1 className="w-full text-center text-3xl mt-20">
            No Listing Found
          </h1>
        )}

      </div>
    </>
  );
};

export default Home;