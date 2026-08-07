import { createContext, useContext, useState } from "react";
import axios from "axios";
import { ServerURL } from "../App";

 export const ReviewDataContext = createContext();

 const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(false);
  const [averagerating, setAveragerating] = useState(3.5);
  const [totalNoReviews, setTotalNoReviews] = useState(0)

  // Get Reviews
  const getReviews = async (listingId) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${ServerURL}/api/reviews/${listingId}`
      );

      if (data.success) {
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
        setTotalReviews(data.totalReviews);
        return data
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Create Review
  const createReview = async (listingId, rating, comment) => {
    console.log("Create Review Context Api Hit")
    try {
      const { data } = await axios.post(
        `${ServerURL}/api/reviews/${listingId}`,
        {
          rating,
          comment,
        },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        getReviews(listingId);
      }
     
      return data;  
    } catch (error) {
      console.log(error);
      return error.response?.data || { success: false, message: error.message };
    }
  };

  // Delete Review
  const deleteReview = async (reviewId, listingId) => {
    try {
      const { data } = await axios.delete(
        `${ServerURL}/api/reviews/${reviewId}`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        getReviews(listingId);
      }
      return data;
    } catch (error) {
      console.log(error);
      return error.response?.data || { success: false, message: error.message };
    }
  };

  return (
    <ReviewDataContext.Provider
      value={{
        reviews,
        avgRating,
        totalReviews,
        loading,
        getReviews,
        createReview,
        deleteReview,
        rating, 
        setRating,
        comment,
        setComment,
        averagerating,
        setAveragerating,
        totalNoReviews,
        setTotalNoReviews
      }}
    >
      {children}
    </ReviewDataContext.Provider>
  );
};

export default ReviewProvider;
export { ReviewProvider };