import asyncHandler from "../middlewares/asyncHandler.js";
import Review from "../models/Reviewmodel.js";

// import Review from "../models/review.model.js";
// Add Review
export const createReview = asyncHandler (async (req, res) => {
  try {
    const { listingId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.create({
      listing: listingId,
      user: req.user._id, // auth middleware
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
      .populate("user", "username profileImage")
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