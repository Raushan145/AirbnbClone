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
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)} required
              className="text-4xl text-yellow-500 hover:scale-110 duration-200"
            >
              {star <= rating ? (
                <MdOutlineStar />
              ) : (
                <MdOutlineStarBorder />
              )}
            </button>
          ))}
        </div>

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
  );
}