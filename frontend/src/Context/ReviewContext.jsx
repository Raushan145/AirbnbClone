import { createContext, useContext, useState } from "react";
import axios from "axios";
import { ServerURL } from "../App";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get Reviews
  const getReviews = async (listingId) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${ServerURL}/api/review/${listingId}`
      );

      if (data.success) {
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
        setTotalReviews(data.totalReviews);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Create Review
  const createReview = async (
    listingId,
    rating,
    comment,
    token
  ) => {
    try {
      const { data } = await axios.post(
        `${ServerURL}/api/review/${listingId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        getReviews(listingId);
      }

      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  // Delete Review
  const deleteReview = async (
    reviewId,
    listingId,
    token
  ) => {
    try {
      const { data } = await axios.delete(
        `${ServerURL}/api/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        getReviews(listingId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        avgRating,
        totalReviews,
        loading,
        getReviews,
        createReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);