import RatingItem from "./RatingItem";
import {
  FaBroom,
  FaCheckCircle,
  FaKey,
  FaRegCommentDots,
  FaMapMarkedAlt,
  FaTag,
} from "react-icons/fa";

export default function RatingSummary() {
  const ratings = [
    { title: "Cleanliness", value: "4.8", icon: <FaBroom /> },
    { title: "Accuracy", value: "5.0", icon: <FaCheckCircle /> },
    { title: "Check-in", value: "5.0", icon: <FaKey /> },
    { title: "Communication", value: "5.0", icon: <FaRegCommentDots /> },
    { title: "Location", value: "5.0", icon: <FaMapMarkedAlt /> },
    { title: "Value", value: "5.0", icon: <FaTag /> },
  ];

  return (
    <>
      <div className="text-center">
        <h1 className="text-7xl font-bold">🍃 5.0 🍃</h1>

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