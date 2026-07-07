import { useContext } from "react";
import RatingItem from "./RatingItem";
import {
  FaBroom,
  FaCheckCircle,
  FaKey,
  FaRegCommentDots,
  FaMapMarkedAlt,
  FaTag,
} from "react-icons/fa";
import { listingDataContext } from "../../Context/ListingContex";
import { li } from "motion/react-client";

export default function RatingSummary() {
  const ratings = [
    { title: "Cleanliness", value: "4.8", icon: <FaBroom /> },
    { title: "Accuracy", value: "5.0", icon: <FaCheckCircle /> },
    { title: "Check-in", value: "5.0", icon: <FaKey /> },
    { title: "Communication", value: "5.0", icon: <FaRegCommentDots /> },
    { title: "Location", value: "5.0", icon: <FaMapMarkedAlt /> },
    { title: "Value", value: "5.0", icon: <FaTag /> },
  ];

  
   const {
        cardDetails,
        setCardDetails,
        updating,
        setUpdating,
        deleteing,
        setDeleteing,
      } = useContext(listingDataContext);
  
      
    const listing = cardDetails || {};
    // console.log(listing)
    
//  HostIng Since
const hostingSince = cardDetails?.host?.hostingSince;

let hostBadge = "New Host";
let hostingText = "Just started hosting";

if (hostingSince) {
  const startDate = new Date(hostingSince);
  const today = new Date();

  const diffMonths =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    (today.getMonth() - startDate.getMonth());

  const diffYears = Math.floor(diffMonths / 12);

  if (diffMonths < 1) {
    hostBadge = "New Host";
    hostingText = "Recently joined Airbnb";
  } else if (diffMonths < 6) {
    hostBadge = "Rising Host";
    hostingText = `${diffMonths} months hosting`;
  } else if (diffYears < 2) {
    hostBadge = "Experienced Host";
    hostingText = `${diffYears || 1} year hosting`;
  } else if (diffYears < 5) {
    hostBadge = "Superhost";
    hostingText = `${diffYears} years hosting`;
  } else if (diffYears < 10) {
    hostBadge = "Elite Host";
    hostingText = `${diffYears} years hosting`;
  } else {
    hostBadge = "Legend Host";
    hostingText = `${diffYears} years hosting`;
  }
}

  return (
    <>
      <div className="text-center">
        <h1 className="text-7xl font-bold">🍃 {cardDetails.rating || 3.5} 🍃</h1>

        <h2 className="text-3xl font-semibold mt-4">
          Guest favourite
        </h2>

        <p className="text-gray-500 mt-2">
          This home is a guest favourite based on ratings,
          reviews and reliability.
        </p>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-10">
        {ratings.map((item) => (
          <RatingItem key={item.title} {...item} />
        ))}
      </div> */}
    </>
  );
}