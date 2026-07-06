import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
    const [expanded, setExpanded] = useState(false)
   

  return (
    <div>

      <div className="flex items-center gap-4">

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          {review.name[0]}
        </div>

        <div>
          <h3 className="font-semibold ">
            {review.name}
          </h3>

          <p className="text-sm text-gray-500">
            {review.joined}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2 mt-2 text-sm">
        <FaStar className="text-black" />
        <span>5</span>
        <span>•</span>
        <span>{review.date}</span>
      </div>

       <p
        className={`mt-4 text-gray-700 leading-7 ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
      {review.review}
      </p>


      {review.review.length > 200 && (
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