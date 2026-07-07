import { useContext } from "react";
import HostCard from "./HostCard";
import ThingsToKnow from "./ThingsToKnow";
import { listingDataContext } from "../../Context/ListingContex";

export default function HostSection() {
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
    <section className="max-w-6xl mx-auto px-5 py-5  md:ml-22 md:mt-12">

      <h2 className="text-3xl font-semibold mb-1">
        Meet your host
      </h2>

      <div className="grid lg:grid-cols-2  gap-12 md:gap-5">

        <HostCard />

        <div className="px-8 md:px-5">
          <div className="flex items-center gap-3 mb-8 ">
            🌐
            <span>Speaks English and Hindi</span>
          </div>

          <h3 className="text-2xl font-semibold">
          {cardDetails.host?.fullName?.split(" ")[0]} is a {hostBadge}
          </h3>

          <p className="text-gray-600 mt-3">
             {hostBadge} are experienced, highly rated hosts committed to
            providing great stays for guests.
          </p>

          <div className="mt-3">
            <h4 className="font-semibold text-xl mb-3">
              Host details
            </h4>

            <p>Response rate: 100%</p>

            <p>Responds within an hour</p>
          </div>

          <button
            className="mt-5 w-full sm:w-64 border rounded-xl py-3 font-semibold hover:bg-black hover:text-white transition"
          >
            Message host
          </button>

          <div className="flex gap-3 mt-8 text-sm text-gray-500">
            🛡️
            <p>
              To help protect your payment, always use Airbnb to send
              money and communicate with hosts.
            </p>
          </div>

        </div>

      </div>
      
      <ThingsToKnow />

    </section>
  );
}