import asyncHandler from "../middlewares/asyncHandler.js";
import Listing from "../models/listingmodel.js";
import User from "../models/usermodel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addListing =asyncHandler (async (req ,res)=>{

    try {
        let host = req.userId;
        let {title,description,rent,city,landmark,category} = req.body;

        let image1 = await uploadOnCloudinary(req.files.image1[0].path);
        let image2 = await uploadOnCloudinary(req.files.image2[0].path);
        let image3 = await uploadOnCloudinary(req.files.image3[0].path);

        const listing = await Listing.create({
            title,
            description,
            rent,
            city,
            landmark,
            category,
            image1,
            image2,
            image3,
            host
        })

        const user = User.findByIdAndUpdate(host,{$push:{listing:listing._id}},{new:true})
        if(!user){
             res.status(404).json({message:"User Not Found"})
        }

       return res.status(201).json(listing)
        
    } catch (error) {
       return res.status(500).json({message:`Add Listing Error ${error}`})
    }

})

export const getListing =asyncHandler (async (req,res)=>{

    try {

        let listing = await  Listing.find().sort({createdAt:-1})
       return res.status(200).json(listing)  
    } catch (error) {
        console.log(error.response);
        return res.status(500).json({message: `getListing Error ${error?.data?.message}`})
    }

})

export const getListingById = asyncHandler (async (req, res) => {
  // console.log("🔥 getListingById API HIT");
  // console.log("ID:", req.params.id);
    try {
        const listing = await Listing.findById(req.params.id)
        .populate(
      "host",
      "fullName profileImg email mobileNo hostingSince"
    );

    // console.log(listing)

        if (!listing) {
            return res.status(404).json({
                success:false,
                message: "Listing not found"
            });
        }

        res.status(200).json(listing);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

export const findListing =asyncHandler (async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({success:false, message: "Listing Not Found" });
    }

    return res.status(200).json(listing);

  } catch (error) {
    return res.status(500).json({
      message: `Find Listing Error: ${error.message}`,
    });
  }
})

export const updateListing =asyncHandler (async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {};
    // Text fields
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.rent) updateData.rent = req.body.rent;
    if (req.body.city) updateData.city = req.body.city;
    if (req.body.landmark) updateData.landmark = req.body.landmark;
    if (req.body.category) updateData.category = req.body.category;

    // Images
    if (req.files?.image1) {
      const image = await uploadOnCloudinary(req.files.image1[0].path);
      updateData.image1 = image.secure_url;
    }

    if (req.files?.image2) {
      const image = await uploadOnCloudinary(req.files.image2[0].path);
      updateData.image2 = image.secure_url;
    }

    if (req.files?.image3) {
      const image = await uploadOnCloudinary(req.files.image3[0].path);
      updateData.image3 = image.secure_url;
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json(listing);

  } catch (error) {
    return res.status(500).json({
      message: `Update Listing Error: ${error.message}`
    });
  }
})


export const DeleteListing =asyncHandler (async (req, res) => {
  
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id)

    //  if (listing.host.toString() !== req.user.id) {
    //   return res.status(403).json({
    //     message: "You are not authorized to delete this listing.",
    //   });
    // }

    let user = await User.findByIdAndUpdate(listing.host,{
      $pull:{listing:listing._id}
    },{new:true})

    if(!user){
      res.status(201).json({messgae:"User not Found"}) 
    }

    res.status(201).json({messgae:"Listing Deleted"})

  } catch (error) {
    return res.status(500).json({
      message: `Delete Listing Error: ${error.message}`
    });
  }
})

export const search =asyncHandler (async(req,res) =>{

  try {

    const {query} = req.query;

    if(!query){
      return res.status(400).json({message:"Search Queary is required"})
    }

    const listing = await Listing.find({
      $or:[
        {landmark:{$regex: query, $options: "i"}},
        {city:{$regex: query, $options: "i"}},
        {title:{$regex: query, $options: "i"}},
      ],
    })

    return res.status(200).json(listing)
    
  } catch (error) {
    console.error("Search error:",error)
     return res.status(500).json({message:"Internal Server error"})
  }

})
