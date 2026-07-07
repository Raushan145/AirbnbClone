import { useContext, useState } from "react";
import {
  FaStar,
  FaMedal
} from "react-icons/fa";
import { listingDataContext } from "../../Context/ListingContex";

export default function HostCard() {
  const [imgError, setImgError] = useState(false);
   const {
        cardDetails,
        setCardDetails,
        updating,
        setUpdating,
        deleteing,
        setDeleteing,
      } = useContext(listingDataContext);
  
      
    const listing = cardDetails || {};
    
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
    <div className="bg-white rounded-3xl md:h-[300px] h-auto w-full md:w-[400px] md:ml-0 ml-0 shadow-xl md:mt-10 p-8">

      <div className="grid grid-cols-2 gap-5">

        <div className="flex justify-center items-center flex-col">

         <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-400 flex items-center justify-center">
            {cardDetails?.host?.profileImg && !imgError ? (
              <img
                src={cardDetails.host.profileImg}
                alt={cardDetails.host.fullName}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-white text-3xl font-bold">
                {cardDetails?.host?.fullName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold mt-4">
           {cardDetails.host?.fullName?.split(" ")[0]}
          </h2>

          <div className="flex justify-center items-center gap-2 mt-2 text-gray-600">
            <FaMedal />
            {hostBadge}
          </div>

        </div>

        <div className="space-y-3">

          <div>
            <h2 className="text-2xl font-bold">{cardDetails.review || 10}</h2>
            <p className="text-gray-500">Reviews</p>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {cardDetails.rating || 3.5} 
              <FaStar className="text-black text-lg" />
            </h2>

            <p className="text-gray-500">
              Rating
            </p>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-bold">2</h2>

            <p className="text-gray-500">
              Years hosting
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}