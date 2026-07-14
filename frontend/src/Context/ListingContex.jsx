import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ServerURL } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Context export karo
export const listingDataContext = createContext();

const ListingContex = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);

  const [backendEndImage1, setBackendEndImage1] = useState(null);
  const [backendEndImage2, setBackendEndImage2] = useState(null);
  const [backendEndImage3, setBackendEndImage3] = useState(null);

  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleteing, setDeleteing] = useState(false);
  const [allListing, setAllListing] = useState([]);
  const [listingData, setListingData] = useState([]);
  const [cardDetails, setCardDetails] = useState(null)
  const [searchData, setSearchData] = useState([])
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Add Listing
  const handleaddListing = async () => {
    setAdding(true)
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("image1", backendEndImage1);
      formData.append("image2", backendEndImage2);
      formData.append("image3", backendEndImage3);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      const result = await axios.post(
        `${ServerURL}/api/listings/add`,
        formData,
        { withCredentials: true }
      );
      // console.log(result)
      toast.success("Listing Add Successfully");
      setAdding(false)
      navigate("/")

    setTitle("")
    setDescription("")
    setFrontEndImage1(null)
    setFrontEndImage2(null)
    setFrontEndImage3(null)
    setBackendEndImage1(null)
    setBackendEndImage2(null)
    setBackendEndImage3(null)
    setRent("")
    setCity("")
    setLandmark("")
    setCategory("")
     
    } catch (error) {
        setAdding(false)
        toast.error("Something went Wronge.");
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

    }
  };

  // Get Listing
 const getListing = async () => {
  try {
    setLoading(true);
     await new Promise((resolve) => setTimeout(resolve, 6000)); // sirf testing
    const result = await axios.get(
      `${ServerURL}/api/listings/get`,
      { withCredentials: true }
    );
    
    setListingData(result.data);
    setAllListing(result.data);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const getListingById = async (id) => {
  const result = await axios.get(
    `${ServerURL}/api/listings/listing/${id}`,
    { withCredentials: true }
  );

  setCardDetails(result.data);
};

  // Handle View Listing
  const handleViewCard = async (id)=>{
    try {
      const result = await axios.get(`${ServerURL}/api/listings/listing/${id}` ,{ withCredentials: true })
        console.log(result.data); 
        setCardDetails(result.data);
        navigate(`/listing/${id}`)
    } catch (error) {
        console.log("ERROR RESPONSE:", error?.response?.data);
        console.log("ERROR STATUS:", error?.response?.status);
    }

  }


const handleSearch = async () => {
  if (!data || data.trim() === "") {
    setSearchData([]);
    return;
  }

  try {
    const result = await axios.get(
      `${ServerURL}/api/listings/search?query${data}`,
     
    );

    setSearchData(result.data);
  } catch (error) {
    console.error("Search Error:", error);
    setSearchData([]);
  }
};

  useEffect(()=>{
    getListing()
  },[adding,updating,deleteing])

  const value = {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backendEndImage1,
    setBackendEndImage1,
    backendEndImage2,
    setBackendEndImage2,
    backendEndImage3,
    setBackendEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category,
    setCategory,
    listingData,
    setListingData,
    getListing,
    loading,
    setLoading,
    allListing,
    getListingById,
    setAllListing,
    handleViewCard,
    handleaddListing,
    cardDetails,
    setCardDetails,
    updating,
    setUpdating,
    deleteing,
    setDeleteing,
    adding,
    setAdding,
    handleSearch,
    searchData,
    setSearchData,
    data, 
    setData
  };

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
};

export default ListingContex;