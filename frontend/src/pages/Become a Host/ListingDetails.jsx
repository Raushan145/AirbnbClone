import React, { useContext, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { steps } from 'motion';
import { listingDataContext } from '../../Context/ListingContex';
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


const ListingDetails = () => {
    const [steps, setSteps] = useState(1)
    const [guest, setGuest] = useState(0)
    const [bedrooms,setBedrooms] = useState(0)
    const [bed, setBed] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)

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
    <>
        <nav className='flex justify-between items-center h-[14vh] shadow px-10'>
            <img src="https://tse2.mm.bing.net/th/id/OIP.fbrVBr63NNUHg84XIwK5yAHaH-?r=0&pid=Api&h=220&P=0" alt="logo" width={30} />
            <div className='flex items-center gap-10 justify-between'>
                <span className='px-5 py-2 border rounded-full'>Questions?</span>
                <span className='px-5 py-2 border rounded-full'>Save & exits</span>
            </div>
        </nav>

            { steps == 1 &&( <div className=' w-[50%]  mx-auto mt-10 px-5 pb-10'> 
                    <h1 className='text-2xl font-bold'>Share Some basic about your place</h1>
                    <p className='text-sm text-zinc-500'>You'll add more details later, such as bed types</p>

                <div className='flex gap-8 flex-col mt-7'>
                    {/* Guest */}
                    <div className="flex justify-between items-center">
                <span>Guest</span>

                <div className="flex items-center gap-3">
                    <button
                    disabled={guest === 0}
                    onClick={() => setGuest((prev) => Math.max(0, prev - 1))}
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        guest === 0
                        ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        : "bg-zinc-100 cursor-pointer"
                    }`}
                    >
                    <GrFormSubtract />
                    </button>

                    <span className="text-md font-semibold">{guest}</span>

                    <button
                    onClick={() => setGuest((prev) => prev + 1)}
                    className="h-8 w-8 bg-zinc-100 rounded-full flex items-center justify-center cursor-pointer"
                    >
                    <IoIosAdd />
                    </button>
                </div>
                </div>
                    
                    {/* Bedrooms */}
                     <div className="flex justify-between items-center">
                <span>Bedrooms</span>

                <div className="flex items-center gap-3">
                    <button
                    disabled={bedrooms === 0}
                    onClick={() => setBedrooms((prev) => Math.max(0, prev - 1))}
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        bedrooms === 0
                        ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        : "bg-zinc-100 cursor-pointer"
                    }`}
                    >
                    <GrFormSubtract />
                    </button>

                    <span className="text-md font-semibold">{bedrooms}</span>

                    <button
                    onClick={() => setBedrooms((prev) => prev + 1)}
                    className="h-8 w-8 bg-zinc-100 rounded-full flex items-center justify-center cursor-pointer"
                    >
                    <IoIosAdd />
                    </button>
                </div>
                </div>
                    
                    {/* Beds */}
                  <div className="flex justify-between items-center">
                   <span>Bed</span>

                <div className="flex items-center gap-3">
                    <button
                    disabled={bed === 0}
                    onClick={() => setBed((prev) => Math.max(0, prev - 1))}
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        bed === 0
                        ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        : "bg-zinc-100 cursor-pointer"
                    }`}
                    >
                    <GrFormSubtract />
                    </button>

                    <span className="text-md font-semibold">{bed}</span>

                    <button
                    onClick={() => setBed((prev) => prev + 1)}
                    className="h-8 w-8 bg-zinc-100 rounded-full flex items-center justify-center cursor-pointer"
                    >
                    <IoIosAdd />
                    </button>
                </div>
                </div>
                    
                    {/* Bathrooms */}
                    <div className="flex justify-between items-center">
                    <span>Bathrooms</span>

                    <div className="flex items-center gap-3">
                        <button
                        disabled={bathrooms === 0}
                        onClick={() => setBathrooms((prev) => Math.max(0, prev - 1))}
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            bathrooms === 0
                            ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                            : "bg-zinc-100 cursor-pointer"
                        }`}
                        >
                        <GrFormSubtract />
                        </button>

                        <span className="text-md font-semibold">{bathrooms}</span>

                        <button
                        onClick={() => setBathrooms((prev) => prev + 1)}
                        className="h-8 w-8 bg-zinc-100 rounded-full flex items-center justify-center cursor-pointer"
                        >
                        <IoIosAdd />
                        </button>
                    </div>
                    </div>
                    
                </div>
                </div>)}

            {steps == 2 &&( <div className="max-w-5xl w-[95%] md:w-[80%] h-[85vh] bg-white rounded-xl shadow-lg mt-10 flex flex-col">

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

               </div>)}

            {steps == 3 &&(
                <div></div>
            )}


            <footer className=' fixed bottom-0 w-[100%]  py-3 bg-zinc-50  mx-auto'>
                <div className='flex justify-between items-center w-[80%] mx-auto'>
                <span className='px-5 py-2 rounded-2xl active:scale-95 border border-zinc-200 cursor-pointer font-semibold' onClick={() => setSteps((prev) => prev - 1)}>Back</span>
                <button className='px-5 py-2 border-none bg-black text-white hover:bg-white hover:text-black rounded-2xl transition-all duration-300'  onClick={() => setSteps((prev) => prev + 1)}>Next</button>
                </div>
            </footer>

    </>
  )
}

export default ListingDetails
