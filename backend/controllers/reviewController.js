import asyncHandler from "../middlewares/asyncHandler.js";
import Review from "../models/Reviewmodel.js";

// import Review from "../models/review.model.js";
// Add Review
export const createReview = asyncHandler (async (req, res) => {
<<<<<<< HEAD
  try {
    const { listingId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.create({
      listing: listingId,
      user: req.user._id, // auth middleware
=======
   console.log("req.userId:", req.userId);
  try {
    const { listingId } = req.params;
    const { rating, comment } = req.body;
    console.log(listingId,rating,comment);

    const review = await Review.create({
      listing: listingId,
      user: req.userId, // auth middleware
>>>>>>> recover-health
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})


// Get Reviews by Listing
export const getListingReviews = asyncHandler (async (req, res) => {
  try {
    const { listingId } = req.params;

    const reviews = await Review.find({
      listing: listingId,
    })
<<<<<<< HEAD
      .populate("user", "username profileImage")
=======
      .populate("user", "fullName ")
>>>>>>> recover-health
      .sort({ createdAt: -1 });

    const total = reviews.length;

    const avgRating =
      total === 0
        ? 0
        : (
            reviews.reduce((sum, item) => sum + item.rating, 0) /
            total
          ).toFixed(1);

    res.json({
      success: true,
      totalReviews: total,
      avgRating,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

// Delete Review
export const deleteReview = asyncHandler(async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);

    res.json({
      success: true,
      message: "Review deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})