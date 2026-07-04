import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { listingDataContext } from '../Context/ListingContex';


const ListingPage3 = () => {
    const navigate = useNavigate();
     const { title,setTitle,
                description,setDescription,
                frontEndImage1,setFrontEndImage1,
                frontEndImage2,setFrontEndImage2,
                frontEndImage3,setFrontEndImage3,
                backendEndImage1,setBackendEndImage1,
                backendEndImage2,setBackendEndImage2,
                backendEndImage3,setBackendEndImage3,
                rent,setRent,
                city,setCity,
                landmark,setLandmark,
                adding,setAdding,
                handleaddListing,
                category,setCategory} = useContext(listingDataContext);


  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative '>
       
              {/* Navigate Btn */}
             <div
               className="w-12 h-12 bg-white rounded-full shadow cursor-pointer flex justify-center items-center absolute top-5 left-5 active:scale-95"
               onClick={() => navigate("/listingpage2")}
             >
               <FaChevronLeft size={22} />
             </div>
       
             {/* Heading */}
             <div className="absolute top-5 right-5 bg-red-600 text-white px-8 py-2 rounded-full shadow-lg text-lg">
               Review your listing
             </div>
<div className="w-[95%] md:w-[80%] flex flex-col pt-40 px-3 md:pt-20">

  {/* Heading */}
  <h1 className="text-xl md:text-2xl font-semibold mb-5">
    In {(description || "").toUpperCase()}, {(title || "").toUpperCase()}
  </h1>

  {/* Images */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

    <div className="h-[250px] md:h-[350px] rounded-2xl overflow-hidden">
      <img
        src={frontEndImage1}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-1 gap-3">

      <div className="h-[200px] md:h-[170px] rounded-2xl overflow-hidden">
        <img
          src={frontEndImage2}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="h-[200px] md:h-[170px] rounded-2xl overflow-hidden">
        <img
          src={frontEndImage3}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

    </div>

  </div>

  {/* Details */}
  <div className="mt-6 space-y-3">

    <h2 className="text-lg md:text-2xl font-medium">
      {(category || "").toUpperCase()} in{" "}
      {(city || "").toUpperCase()},{" "}
      {(landmark || "").toUpperCase()}
    </h2>

    <p className="text-2xl md:text-3xl font-bold">
      ₹ {rent || 0}
      <span className="text-lg font-normal text-gray-500">
        {" "}
        / day
      </span>
    </p>

  </div>

  {/* Button */}
  <div className="mt-8 flex justify-center flex">
    <button
      type="button"
      onClick={handleaddListing}
      disabled={adding}
      className="px-10 py-3 rounded-full bg-red-500 text-white text-lg font-semibold hover:bg-red-600 active:scale-95 transition disabled:opacity-60"
    >
      {adding ? "Adding...." : "Add Listing"}
    </button>
  </div>

</div>

    </div>


  )
}

export default ListingPage3
