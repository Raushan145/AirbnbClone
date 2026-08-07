import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
<<<<<<< HEAD
=======
  // console.log(review)
>>>>>>> recover-health
    const [expanded, setExpanded] = useState(false)
   

  return (
    <div>

      <div className="flex items-center gap-4">

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
<<<<<<< HEAD
          {review.name[0]}
=======
          {review?.user?.fullName[0]}
>>>>>>> recover-health
        </div>

        <div>
          <h3 className="font-semibold ">
<<<<<<< HEAD
            {review.name}
          </h3>

          <p className="text-sm text-gray-500">
            {review.joined}
=======
            {review?.user?.fullName}
          </h3>

          <p className="text-sm text-gray-500">
            {/* {review.joined} */}
>>>>>>> recover-health
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2 mt-2 text-sm">
        <FaStar className="text-black" />
<<<<<<< HEAD
        <span>5</span>
        <span>•</span>
        <span>{review.date}</span>
=======
        <span>{review.rating}</span>
        <span>•</span>
        <span>{review.createdAt}</span>
>>>>>>> recover-health
      </div>

       <p
        className={`mt-4 text-gray-700 leading-7 ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
<<<<<<< HEAD
      {review.review}
      </p>


      {review.review.length > 200 && (
=======
      {review?.comment}
      </p>


      {review.length > 200 && (
>>>>>>> recover-health
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 font-semibold underline cursor-pointer"
          >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
      <hr className="text-zinc-200 mt-3"/>

       

    </div>
  );
}