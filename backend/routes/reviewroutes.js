import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createReview, deleteReview, getListingReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/:listingId", isAuth, createReview);

reviewRouter.get("/:listingId", getListingReviews);

reviewRouter.delete("/:reviewId", isAuth, deleteReview);

export default reviewRouter;