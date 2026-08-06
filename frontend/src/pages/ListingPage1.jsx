import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import ListingContex from '../Context/ListingContex';
import {listingDataContext} from '../Context/ListingContex';


const ListingPage1 = () => {

  const navigate = useNavigate()
  

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
            adding,setAdding,} = useContext(listingDataContext);

            const handleImage1 = (e)=>{
               let file = e.target.files[0]
               setBackendEndImage1(file)
               setFrontEndImage1(URL.createObjectURL(file))
            }
            
            const handleImage2 = (e)=>{
               let file = e.target.files[0]
               setBackendEndImage2(file)
               setFrontEndImage2(URL.createObjectURL(file))
            }
            const handleImage3 = (e)=>{
               let file = e.target.files[0]
               setBackendEndImage3(file)
               setFrontEndImage3(URL.createObjectURL(file))
            }

            const isFormValid =
               title.trim() &&
               description.trim() &&
               image1 &&
               image2 &&
               image3 &&
               rent &&
               city.trim() &&
               landmark.trim();


  return (
    <div className='w-[100%] h-[100vh] bg-amber-50 h-screen flex items-center justify-center relative overflow-hidden'>

        <form action="" onSubmit={(e)=>{ e.preventDefault() ;  if (!isFormValid) return ; navigate("/listingpage2")} } className='max-w-[900px] mt-[120px]  h-[80vh] pb-20  Page1Form w-[90%] h-screen  flex items-center justify-start flex-col md:items-start gap-[10px] overflow-y-auto '>

          <div className='w-[40px] h-[40px] bg-zinc-100 active:scale-95 cursor-pointer absolute top-[2%] left-[5px] rounded-full flex justify-center items-center ' onClick={()=>navigate("/")}>
              <FaChevronLeft size={25} />
          </div>
          <div className='w-[40px] h-[40px] bg-zinc-100 active:scale-95 cursor-pointer absolute top-[2%] left-[60px] rounded-full md:flex hidden justify-center items-center ' onClick={()=>navigate("/listingpage2")}>
             <FaChevronRight size={25}/>
          </div>

          <div className='absolute top-[3%] left-30 font-bold text-2xl text-blue-500 md:pb-0 pb-5'>
              <h2>Create New Listing</h2>
          </div>

          <div className='px-9 py-1 text-[20px] bg-red-600 text-white md:flex hidden justify-center items-center rounded-3xl absolute top-[2%] right-[20px] shadow-lg '> 
            Setup Your Home
          </div>

          {/* Title */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto  flex justify-start items-start flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="title" className='block text-gray-700 font-medium mb-1' >Title</label>
                   <input type="text" required placeholder='Enter your title' id='title'  onChange={(e)=>setTitle(e.target.value)} value={title}
                   className='w-full border rounded-lg px-3 py-1 focus:outline-none '/>
               {/* </div> */}
            </div>
            {/* Description */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start  flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="Descr" className='block text-gray-700 font-medium mb-1'  >Description</label>
                  <textarea name="desc" id="Desc"   className='w-full border rounded-lg px-3 py-1 focus:outline-none'onChange={(e)=>setDescription(e.target.value)} value={description} ></textarea> 
    
               {/* </div> */}
            </div>

            {/* imgae 1 */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start  flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="Inage1" className='block text-gray-700 font-medium mb-1'  >Image1</label>
                  <div className='flex justify-start cursor-pointer items-center w-full h-[40px] border-[#555656]  border rounded-lg text-[13px] px-3 py-1  focus:outline-none' >
                    <input type="file" name="Image2" id="image1" className=' text-[13px]  ' required onChange={handleImage1} />
                  </div>    
               {/* </div> */}
            </div>

            {/* imgae 2 */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start  flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="Inage2" className='block text-gray-700 font-medium mb-1' >Image2</label>
                  <div className='flex justify-start cursor-pointer items-center w-full h-[40px] border-[#555656]  border rounded-lg text-[13px] px-3 py-1  focus:outline-none'>
                    <input type="file" name="Image2" id="image2" className=' text-[13px]  ' required onChange={handleImage2}/>
                  </div>    
               {/* </div> */}
            </div>

            {/* imgae 3 */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start  flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="Inage3" className='block text-gray-700 font-medium mb-1' onChange={handleImage3} >Image3</label>
                  <div className='flex justify-start cursor-pointer items-center w-full h-[40px] border-[#555656]  border rounded-lg text-[13px] px-3 py-1  focus:outline-none'>
                    <input type="file" name="Image3" id="image3" className=' text-[13px]  ' required onChange={handleImage3}/>
                  </div>    
               {/* </div> */}
            </div>

             {/* Price */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="rate" className='block text-gray-700 font-medium mb-1' >Price</label>
                   <input type="Number" required placeholder='Enter your Price' id='rate'
                   className='w-full border rounded-lg px-3 py-1 focus:outline-none ' onChange={(e)=>setRent(e.target.value)} value={rent}/>
               {/* </div> */}
            </div>

             {/* City */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="city" className='block text-gray-700 font-medium mb-1' >City</label>
                   <input type="text" required placeholder='Enter your City' id='city' onChange={(e)=>setCity(e.target.value)} value={city}
                   className='w-full border rounded-lg px-3 py-1 focus:outline-none '/>
               {/* </div> */}
            </div>

           

             {/* LandMark */}
            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start flex-col md:items-start gap-[5px] '>
               {/* <div className='w-full flex justify-center items-center'> */}
                  <label htmlFor="landmark" className='block text-gray-700 font-medium mb-1' >Landmark</label>
                   <input type="text" required placeholder='Enter your Landmark' id='landmark'  onChange={(e)=>setLandmark(e.target.value)} value={landmark}
                   className='w-full border rounded-lg px-3 py-1 focus:outline-none '/>
               {/* </div> */}
            </div>

            <div className='max-w-[90%] w-[80%] text-[20px] mx-auto flex justify-start items-start  flex-col md:items-start gap-[5px] '>
               <button
                     type="submit"
                     disabled={!isFormValid}
                     onClick={() => navigate("/listingpage2")}
                     className={`px-9 py-1 text-[20px] text-white rounded-3xl mt-2 shadow-lg transition-all
                        ${
                           isFormValid
                           ? "bg-red-500 cursor-pointer hover:bg-red-700"
                           : "bg-red-400 cursor-not-allowed"
                        }`}
                     >
                     Next
                </button>
            </div>

          

        </form>
        
    </div>
  )
}

export default ListingPage1
