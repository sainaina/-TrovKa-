import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HorizontalCard = ({
  id,
  image,
  name = "Unknown Service",
  created_at = new Date().toISOString(),
  description = "No description available",
  category = "Uncategorized",
  location = "Unknown Location",
  working_days = "Not specified",
  reviews = [],
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (reviews.length) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rate_star, 0);
      const avgRating = totalRating / reviews.length;
      setAverageRating(avgRating);
    }
  }, [reviews]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/service-detail/${id}`);
  };

  const fallbackImage = "https://i0.wp.com/sigmamaleimage.com/wp-content/uploads/2023/03/placeholder-1-1.png?resize=768%2C512&ssl=1";
  const roundedRating = Math.round(averageRating);
  const formattedRating = averageRating % 1 === 0 ? roundedRating : averageRating.toFixed(1);

  return (
    <div className="my-5 mx-auto w-full max-w-[97%] border dark:border-none bg-white dark:bg-gray-700 rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl" onClick={handleCardClick}>
      <div className="flex gap-6 flex-col md:flex-row rounded-xl items-stretch">
        <div className="flex-shrink-0 w-full md:w-1/3 overflow-hidden rounded-t-xl md:rounded-xl">
          <img
            loading="lazy"
            src={image || fallbackImage}
            alt={name}
            className="w-full h-[240px] object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow p-6 -translate-y-5 md:-translate-y-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-grow">
              <h2 className="text-[18px] font-medium text-gray-900 line-clamp-1 dark:text-gray-200">{name}</h2>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>
            <div onClick={toggleFavorite} className="cursor-pointer md:ml-0">
              {isFavorite ? (
                <FaHeart className="text-2xl text-red-500 transition-colors duration-300" />
              ) : (
                <FaRegHeart className="text-2xl text-gray-400 hover:text-red-500 transition-colors duration-300 dark:text-gray-200" />
              )}
            </div>
          </div>
          <p className="text-gray-700 mb-4 line-clamp-1 flex-wrap dark:text-gray-200">{description}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-Secondary">
              {[...Array(5)].map((_, i) => (
                i < roundedRating ? <FaStar key={i} /> : <FaRegStar key={i} />
              ))}
            </div>
            <div className="ml-3 bg-Secondary text-white text-sm px-2 py-1 rounded-md">
              {formattedRating}/5
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="bg-gradient-to-r bg-Primary text-white text-sm px-3 py-1 rounded-md">
              {category}
            </span>
            <div className="text-right hide-below-506 sm:block hidden">
              <div className="text-sm text-gray-500 dark:text-gray-200">{location}</div>
              <div className="text-sm text-gray-500 dark:text-gray-200">{working_days}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
