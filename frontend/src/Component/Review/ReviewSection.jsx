import { useContext, useState } from "react";
import ReviewCard from "./ReviewCard";
import { listingDataContext } from "../../Context/ListingContex";


const reviews = [
  {
    id: 1,
    name: "Susant Kumar",
    joined: "1 year on Airbnb",
    date: "1 week ago",
    review:
      "The property is huge. If you're a family of even 10-12 members, you can comfortably stay here.lorem1",
  },
  {
    id: 2,
    name: "Nikhil",
    joined: "1 year on Airbnb",
    date: "1 week ago",
    review:
      "Had a wonderful stay. Felt right at home with a very private neighbourhood.",
  },
  {
    id: 3,
    name: "Bhupender",
    joined: "New to Airbnb",
    date: "3 weeks ago",
    review:
      "We had a wonderful stay at this Airbnb in Varanasi.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum repudiandae, minima velit laborum distinctio odio vel expedita! Nam, esse assumenda.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum repudiandae, minima velit laborum distinctio odio vel expedita! Nam, esse assumenda.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum repudiandae, minima velit laborum distinctio odio vel expedita! Nam, esse assumenda.",
  },
  {
    id: 4,
    name: "Shubh",
    joined: "New to Airbnb",
    date: "1 day ago",
    review:
      "Awesome stay. Highly recommended.",
  },
];


export default function ReviewSection() {
  
     const [showReviewPopUp, setShowReviewPopUp] = useState(false)

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
    <section className="max-w-7xl mx-auto px-6 mt-5  border-t">

         <div className="text-center mt-5">
        <h1 className="text-7xl font-bold">🍃 {cardDetails.rating || 3.5} 🍃</h1>

        <h2 className="text-3xl font-semibold mt-4">
          Guest favourite
        </h2>

        <p className="text-gray-500 mt-2">
          This home is a guest favourite based on ratings,
          reviews and reliability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-10 w-[85%] mx-auto">
        {reviews.slice(0,2).map((item) => (
          <ReviewCard key={item.id} review={item} />
        ))}
      </div>
       <button onClick={() => setShowReviewPopUp(true)} className="bg-red-200 w-[80%] md:w-[30%] flex justify-center items-center mx-auto px-10 mt-8 cursor-pointer bg-zinc-200 hover:bg-zinc-300 text-lg font-semibold rounded-full py-2">Show all {reviews.length} reviews</button>
     
   

      {showReviewPopUp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-500 catScroll">
            <div className="bg-white w-[90%] md:w-[70%] h-[80vh] rounded-2xl p-6 overflow-y-auto relative catScroll">

            {/* Close Button */}
            <button
                onClick={() => setShowReviewPopUp(false)}
                className="absolute top-4 right-4 text-2xl font-bold active:scale-95 cursor-pointer "
            >
                ✕
            </button>
               <div className="text-center mt-5">
        <h1 className="text-7xl font-bold">🍃 {cardDetails.rating || 3.5} 🍃</h1>

        <h2 className="text-3xl font-semibold mt-4">
          Guest favourite
        </h2>

        <p className="text-gray-500 mt-2">
          This home is a guest favourite based on ratings,
          reviews and reliability.
        </p>
      </div>

            <h2 className="text-2xl font-bold mb-6 mt-6">All Reviews</h2>

            <div className="grid md:grid-cols-2 gap-6">
                 
                {reviews.map((item) => (
                <ReviewCard key={item.id} review={item} />
                ))}
            </div>

            </div>
        </div>
        )}
   
        

    </section>
  );
}