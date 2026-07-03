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
               Setup Your Category
             </div>

             <div className='w-[95%]  flex flex-col items-center justify-start text-[25px] md:w-[90%] mb-[10px]  '>
                        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
                            {`In ${description.toUpperCase()}, ${title.toUpperCase()}`}
                        </div>
                        <div className='w-[95%] md:h-[350px] h-[600px] flex items-center justify-center flex-col md:w-[80%] bg-amber-200 md:flex-row '>
                                <div className='w-[100%] h-[65%] md:w-[55%] md:h-[100%] overflow-hidden flex items-center justify-start border border-amber-50'>
                                        <img src={frontEndImage1} alt={title}  className='w-[100%] object-cover'/>
                                </div>
                                <div className='w-[100%] h-[65%] md:w-[45%] md:h-[100%] overflow-hidden flex md:flex-col items-center justify-start border border-amber-50'>
                                    <div className='w-[100%] h-[65%] md:w-full md:h-[100%] overflow-hidden flex items-center justify-center border border-amber-50  '>
                                            <img src={frontEndImage2} alt={title}  className='w-[100%] object-cover'/>

                                    </div>
                                    <div className='w-[100%] h-[65%] md:w-full md:h-[100%] overflow-hidden flex items-center justify-center border border-amber-50 '>
                                            <img src={frontEndImage3} alt={title} className='w-[100%] object-cover'/>

                                    </div>
                                </div>
                        </div>

                        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
                             {`${category.toUpperCase()} in ${city.toUpperCase()}, ${landmark.toUpperCase()}`}
                        </div>

                        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
                             {`Rs. ${rent} / day`}
                        </div>

                        <div className='w-[95%] h-[50px] flex items-center justify-center '>
                         <button type="button" className={`px-9 py-2 text-[20px] rounded-3xl mt-2 shadow-lg bg-red-500 text-white cursor-pointer cursor-pointer active:scale-95`} onClick={handleaddListing}
                         disabled={adding}>
                          {adding ? "Adding..." : "Add Listing"}
                        </button>
                        </div>

             </div>

       

    </div>
  )
}

export default ListingPage3
