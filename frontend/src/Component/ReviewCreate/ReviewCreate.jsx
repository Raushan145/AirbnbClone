<<<<<<< HEAD
import { useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { toast } from "react-toastify";

export default function ReviewCreate() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewSubmit, setReviewSubmit] = useState(true)

  const handleSubmit = () => {
    // e.preventDefault();

    if (rating === 0) {
      return toast.error("Please select a rating.")
      
    }

    console.log({
      rating,
      comment,
    });

    // Yaha createReview() call karna

    // alert("🎉 Thanks for your feedback!");
    toast.success("Thanks for your feedback!");
     setReviewSubmit(false)
    setRating(0);
    setComment("");

  };

  return (
    <div className="bg-gray-50 md:w-[89%] w-full">
     {reviewSubmit && ( <div className="max-w-3xl mx-auto bg-white rounded-xl p-1">

        <h2 className="text-2xl font-bold mb-3">
          Reviews & Rating
        </h2>

        {/* Stars */}
        <div className="flex gap-2 mb-6">
=======

import { useContext, useEffect, useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { toast } from "react-toastify";
import { ReviewDataContext } from "../../Context/ReviewContext";
import { bookingDataContect } from "../../Context/BookingContext";
import { listingDataContext } from "../../Context/ListingContex";
import { useParams } from "react-router-dom";
import { userDataContext } from "../../Context/UserContext";

export default function ReviewCreate() {
  
  const { rating, setRating, comment, setComment, createReview ,getReviews} = useContext(ReviewDataContext);

  const { bookingData } = useContext(bookingDataContect);
  const { cardDetails } = useContext(listingDataContext);
  const { id: urlListingId } = useParams();
  const { userData } = useContext(userDataContext);

  const [reviewSubmit, setReviewSubmit] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setReviewSubmit(true)
    }, 5000);
  },[reviewSubmit])

 const handleSubmit = () => {

  if (rating === 0) {
    return toast.error("Please select a rating.");
  }

  const listingId = urlListingId || cardDetails?._id;

  console.log("Listing ID:", listingId);

  if (!userData) {
    toast.error("Please sign in to submit a review.");
    return;
  }
  if (!listingId) {
    // toast.error("Listing not found.");
    return;
  }

  createReview(listingId, rating, comment)
    .then(async(res) => {
      if (res?.success) {
        toast.success("Thanks for your feedback!");
        setReviewSubmit(false);
        setRating(0);
        setComment("");
        await getReviews(listingId);
      } else {
        toast.error(res?.message || "Failed to submit review.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
   <div className="bg-gray-50 w-full">
  {reviewSubmit ? (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-5">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Share your experience
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Your review helps future guests make better decisions.
        </p>
      </div>

      {/* Stars */}
      <div className="mb-4">
        {/* <p className="text-sm font-semibold text-gray-700 mb-2">
          Give a rating
        </p> */}

        <div className="flex gap-1">
>>>>>>> recover-health
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
<<<<<<< HEAD
              onClick={() => setRating(star)} required
              className="text-4xl text-yellow-500 hover:scale-110 duration-200"
            >
              {star <= rating ? (
                <MdOutlineStar />
              ) : (
                <MdOutlineStarBorder />
=======
              onClick={() => setRating(star)}
              className={`text-4xl transition-all duration-300 hover:scale-125 ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            >
              {star <= rating ? (
                <MdOutlineStar className="text-yellow-400" />
              ) : (
                <MdOutlineStarBorder className="text-gray-300" />
>>>>>>> recover-health
              )}
            </button>
          ))}
        </div>
<<<<<<< HEAD

        {/* Comment */}
        <textarea
          placeholder="Write your experience..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)} required
          className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-rose-400 resize-none"
        />

        <div className="flex justify-end items-center">
            <button
            onClick={()=>{
                handleSubmit()
            }}
            className="mt-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg duration-300"
            >
            Submit Review
            </button>
        </div>
      </div>)}
         {!reviewSubmit && ( 
                    <div className="text-2xl font-semibold bg-green-400 text-black flex items-center justify-center px-3 py-2"> 🌟 Thanks for sharing your experience!</div>
        )}

    </div>
=======
      </div>

      {/* Comment */}
      <textarea
        placeholder="Write your experience..."
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="
          w-full
          border border-gray-300
          rounded-xl
          p-3
          text-sm
          outline-none
          resize-none
          focus:ring-2
          focus:ring-rose-400
          focus:border-transparent
          transition
        "
      />

      {/* Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="
            bg-gradient-to-r from-rose-500 to-pink-500
            hover:from-rose-600 hover:to-pink-600
            text-white
            px-7 py-2.5
            rounded-xl
            text-sm
            font-semibold
            shadow-md
            hover:shadow-lg
            transition
          "
        >
          Submit Review
        </button>
      </div>

    </div>
  ) : (
    <div className="
      max-w-3xl mx-auto
      bg-green-50
      border border-green-200
      rounded-2xl
      shadow-md
      flex items-center justify-center
      px-5 py-4
      text-lg font-semibold text-green-700
    ">
      🌟 Thanks for sharing your experience!
    </div>
  )}
</div>
>>>>>>> recover-health
  );
}