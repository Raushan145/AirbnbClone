import React, { useContext, useState } from 'react'
import { listingDataContext } from '../Context/ListingContex'

const EditForm = () => {
    const [updatePopUP, setUpdatePopUP] = useState(false)
    const {cardDetails,setCardDetails,updating, setUpdating,deleteing, setDeleteing} = useContext(listingDataContext)
    
  const handleUpdateListing =async () => {
    setUpdating(true)
         try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
     if(backendEndImage1){formData.append("image1", backendEndImage1)};
     if(backendEndImage2){formData.append("image2", backendEndImage2)};
     if(backendEndImage3){formData.append("image3", backendEndImage3)};
     if(rent){formData.append("rent", rent)};
     if(city){formData.append("city", city)};
     if(landmark){formData.append("landmark", landmark)};

      const result = await axios.patch(
        `${ServerURL}/api/listings/update/${listing._id}`,
        formData,
        { withCredentials: true }
      );
      console.log(result)
      toast.success("Listing Update Successfully");
      setUpdating(false)
      navigate("/")

    setTitle("")
    setDescription("")
    setBackendEndImage1(null)
    setBackendEndImage2(null)
    setBackendEndImage3(null)
    setRent("")
    setCity("")
    setLandmark("")
     
    } catch (error) {
        setUpdating(false);
        console.log(error)
        toast.error("Something went Wronge.");
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

    }
  }

            const handleImage1 = (e)=>{
               let file = e.target.files[0]
               setBackendEndImage1(file)
             
            }
            
            const handleImage2 = (e)=>{
               let file = e.target.files[0]
               setBackendEndImage2(file)
              
            }
            const handleImage3 = (e)=>{
               let file = e.target.files[0]
               setBackendEndImage3(file)
            }
    
  return (
    <>
        {/* Update Listing Popup */}
      
                {updatePopUP && (
                  <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="relative w-[90%] max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto p-6"
                    >
      
                      {/* Close */}
                      <span
                        onClick={() => setUpdatePopUP(false)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-200 hover:bg-zinc-300 flex justify-center items-center cursor-pointer active:scale-95"
                      >
                        <ImCross />
                      </span>
      
                      {/* Heading */}
                      <h2 className="text-center text-2xl font-semibold text-red-600 mb-8">
                        Update Your Home
                      </h2>
      
                      {/* Title */}
                      <div className="mb-5">
                        <label className="block font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter Title"
                          className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
                        />
                      </div>
      
                      {/* Description */}
                      <div className="mb-5">
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                          rows="4"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter Description"
                          className="w-full border rounded-lg p-3 outline-none resize-none focus:border-red-500"
                        ></textarea>
                      </div>
      
                      {/* Images */}
                      <div className="grid md:grid-cols-3 gap-5 mb-5">
      
                        <div>
                          <label className="block font-medium mb-2">Image 1</label>
                          <input
                            type="file"
                            onChange={handleImage1}
                            className="w-full border rounded-lg p-2"
                          />
                        </div>
      
                        <div>
                          <label className="block font-medium mb-2">Image 2</label>
                          <input
                            type="file"
                            onChange={handleImage2}
                            className="w-full border rounded-lg p-2"
                          />
                        </div>
      
                        <div>
                          <label className="block font-medium mb-2">Image 3</label>
                          <input
                            type="file"
                            onChange={handleImage3}
                            className="w-full border rounded-lg p-2"
                          />
                        </div>
      
                      </div>
      
                      {/* Price & City */}
                      <div className="grid md:grid-cols-2 gap-5 mb-5">
      
                        <div>
                          <label className="block font-medium mb-2">Price</label>
                          <input
                            type="number"
                            value={rent}
                            onChange={(e) => setRent(e.target.value)}
                            placeholder="Enter Price"
                            className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
                          />
                        </div>
      
                        <div>
                          <label className="block font-medium mb-2">City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter City"
                            className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
                          />
                        </div>
      
                      </div>
      
                      {/* Landmark */}
                      <div className="mb-8">
                        <label className="block font-medium mb-2">Landmark</label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="Enter Landmark"
                          className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
                        />
                      </div>
      
                      {/* Button */}
                      <div className="flex justify-center gap-5">
                        <button
                          type="button"
                          onClick={handleUpdateListing}
                          disabled={updating}
                          className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full text-lg shadow-lg active:scale-95 disabled:opacity-60"
                        >
                          {updating ? "Updating..." : "Update Listing"}
                        </button>
      
                        <button
                          type="button"
                          onClick={handleDeleteListing}
                          disabled={deleteing}
                          className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full text-lg shadow-lg active:scale-95 disabled:opacity-60"
                        >
                          {deleteing ? "Deleteing..." : "Delete Listing"}
                        </button>
                      </div>
      
                    </form>
      
                  </div>
                )}
    </>
  )
}

export default EditForm
