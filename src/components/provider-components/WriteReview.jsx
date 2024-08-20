import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
  fetchServiceReviews,
  selectReviews,
  selectReviewsError,
  selectReviewsStatus,
  postReview,
  likeReview,
  unlikeReview,
  setUserAction,
  selectUserActions
} from "../../redux/feature/review/reviewSlice"; // Adjust the import path as needed
import { getAccessToken } from "../../lib/secureLocalStorage";
import { useNavigate } from "react-router-dom";

// Rating Component
const Rating = ({ rating, setRating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} style={{ color: "#F6B721" }} onClick={() => setRating && setRating(i + 1)} />
      ) : (
        <FaRegStar key={i} style={{ color: "#F6B721" }} onClick={() => setRating && setRating(i + 1)} />
      )
    )}
  </div>
);

// ReviewCard Component
const ReviewCard = ({ id, name, date, rating, text, likeCount, unlikeCount }) => {
  const dispatch = useDispatch();
  const userActions = useSelector(selectUserActions);
  const [likeAction, setLikeAction] = useState(null); // 'like' or 'unlike'


  const handleLike = () => {
    dispatch(likeReview(id));
    setLikeAction('like');
    dispatch(setUserAction({ reviewId: id, userId: getAccessToken(), actionType: 'like' }));
  };

  const handleUnlike = () => {
    dispatch(unlikeReview(id));
    setLikeAction('unlike');
    dispatch(setUserAction({ reviewId: id, userId: getAccessToken(), actionType: 'unlike' }));
  };

  const userId = getAccessToken();
  const userAction = userActions[id] && userActions[id][userId];

  return (
    <div className="p-4 border rounded-lg shadow-sm mb-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">{name}</h3>
        <span className="text-gray-500">{date}</span>
      </div>
      <Rating rating={rating} />
      <p className="text-gray-700 mt-2">{text}</p>
      <div className="flex items-center mt-2">
        <button
          className={`mr-2 ${userAction === 'like' ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={handleLike}
          disabled={userAction === 'like'}
        >
          <FaThumbsUp /> {likeCount}
        </button>
        <button
          className={`mr-2 ${userAction === 'unlike' ? 'text-red-500' : 'text-gray-500'}`}
          onClick={handleUnlike}
          disabled={userAction === 'unlike'}
        >
          <FaThumbsDown /> {unlikeCount}
        </button>
      </div>
    </div>
  );
};

// AverageRating Component
const AverageRating = ({ averageRating, reviewCounts }) => {
  const { t } = useTranslation();
  const starPercentage = (rating) =>
    (reviewCounts[rating] / Object.values(reviewCounts).reduce((a, b) => a + b, 0)) * 100;

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-semibold text-Primary mb-4 dark:text-[#98caf9]">{t('Average')}</h2>
      <div className="flex items-center mb-2">
        <span className="text-3xl font-medium text-gray-400 ">{averageRating.toFixed(1)}</span>
        <Rating rating={Math.round(averageRating)} />
      </div>
      <div className="text-gray-400">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center">
            <span className="w-4 text-center">{star}</span>
            <div className="w-full h-2 bg-gray-200 ml-2 mr-2">
              <div className="h-full bg-Secondary" style={{ width: `${starPercentage(star)}%` }}></div>
            </div>
            <span className="w-10 text-right">
              {starPercentage(star).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ReviewForm Component
const ReviewForm = ({ serviceId, onReviewSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) {
      setErrorMessage("Please log in to submit your review.");
      navigate("/login")
      return;
    }
    if (!comment || !rating) {
      setErrorMessage("Please provide both a rating and a comment.");
      return;
    }

    const review = {
      comment,
      rate_star: rating,
      service: serviceId,
    };

    try {
      const response = await dispatch(postReview(review)).unwrap();
      console.log("Review Response:", response);
      setRating(0);
      setComment("");
      setErrorMessage("");
      if (onReviewSubmit) {
        onReviewSubmit();  // Call the prop function to refresh reviews
      }
    } catch (error) {
      setErrorMessage("Failed to submit review. Please try again.");
      console.error("Submit Review Error:", error);
    }
  };

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-semibold text-Primary mb-4 dark:text-[#98caf9]">{t('Submit_Comment')}</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-300">{t('Add_Your_Rating')}</label>
          <Rating rating={rating} setRating={setRating} />
        </div>
        <div className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('Write_Your_Review')}
            className="w-full p-2 border rounded-md dark:bg-gray-800 resize-none"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="bg-Secondary text-white px-4 py-2 rounded-md">
          {t('Submit_Review')}
        </button>
      </form>
    </div>
  );
};

// WriteReview Component
const WriteReview = ({ service }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const reviewsStatus = useSelector(selectReviewsStatus);
  const reviewsError = useSelector(selectReviewsError);
  const [visibleReviews, setVisibleReviews] = useState(5); // Initialize with 5 reviews visible
  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 5); // Increase the number of visible reviews by 5
  };
  const handleShowLess = () => {
    setVisibleReviews(5); // Reset to show only the initial 5 reviews
  };


  useEffect(() => {
    if (reviewsStatus === "idle") {
      dispatch(fetchServiceReviews(service.id));
    }
  }, [dispatch, reviewsStatus, service.id]);

  const handleReviewSubmit = () => {
    dispatch(fetchServiceReviews(service.id));
  };

  const filteredReviews = reviews.filter((review) => review.service === service.id);
  const reviewsToShow = filteredReviews.slice(0, visibleReviews); // Slice the reviews array based on visibleReviews

  const validRatings = filteredReviews
    .map((review) => Number(review.rate_star))
    .filter((rating) => !isNaN(rating) && rating >= 0 && rating <= 5);

  const totalRating = validRatings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = validRatings.length > 0 ? totalRating / validRatings.length : 0;

  const reviewCounts = filteredReviews.reduce((acc, review) => {
    const rating = review.rate_star;
    if (!acc[rating]) {
      acc[rating] = 0;
    }
    acc[rating]++;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto p-9 mb-24 -mt-8 max-lg:px-10 max-sm:px-10 max-md:px-8 px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <AverageRating averageRating={averageRating} reviewCounts={reviewCounts} />
        <ReviewForm serviceId={service.id} onReviewSubmit={handleReviewSubmit} />
      </div>

      <h2 className="text-xl font-semibold text-Primary mb-4 dark:text-[#98caf9]">{t('Cus_Review')}</h2>
      {reviewsToShow.length > 0 ? (
        reviewsToShow.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            name={review.created_by}
            date={new Date(review.created_at).toLocaleDateString()}
            rating={review.rate_star}
            text={review.comment}
            likeCount={review.like_count}
            unlikeCount={review.unlike_count}
          />
        ))
      ) : (
        <div>{t('No_Review_Yet')}</div>
      )}

      <div className="flex justify-between mt-4">
        {visibleReviews < filteredReviews.length && (
          <button
            onClick={handleShowMore}
            className="bg-Secondary text-white px-4 py-2 rounded-md"
          >
            {t('See_More')}
          </button>
        )}
        {visibleReviews > 5 && (
          <button
            onClick={handleShowLess}
            className="bg-Secondary text-white px-4 py-2 rounded-md"
          >
            {t('Show_Less')}
          </button>
        )}
      </div>
    </div>
  );
};

export default WriteReview;
