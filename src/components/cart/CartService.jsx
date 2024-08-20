import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceReviews } from '../../redux/feature/review/reviewSlice';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const CartService = ({
  id,
  image,
  name = "Unknown Service",
  created_at = new Date().toISOString(),
  description,
  category = "Uncategorized",
  location = "Unknown Location",
  working_days = "Not specified",
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const [averageRating, setAverageRating] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    dispatch(fetchServiceReviews(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (reviews) {
      const serviceReviews = reviews.filter(review => review.service === id);
      const totalRating = serviceReviews.reduce((acc, review) => acc + review.rate_star, 0);
      const avgRating = serviceReviews.length ? totalRating / serviceReviews.length : 0;
      setAverageRating(avgRating);
    }
  }, [reviews, id]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/service-detail/${id}`);
  };

  const fallbackImage = "https://i0.wp.com/sigmamaleimage.com/wp-content/uploads/2023/03/placeholder-1-1.png?resize=768%2C512&ssl=1";
  const fallbackDescription = "No description available";
  const roundedRating = Math.round(averageRating);
  const formattedRating = averageRating % 1 === 0 ? roundedRating : averageRating.toFixed(1);

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className="flex gap-8 flex-wrap justify-center"
    >
      <div className='w-full h-full flex justify-center items-center'>
        <div
          className='w-[320px] h-[455px] rounded-xl shadow-sm mt-5 dark:bg-gray-700 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer border dark:border-none'
          onClick={handleCardClick}
        >
          <div className='relative w-full h-[200px] rounded-t-lg overflow-hidden'>
            <img
              src={image || fallbackImage}
              alt={name}
              className='w-full h-full object-cover duration-300 transform transition-transform hover:scale-100'
            />
          </div>
          <div className="flex flex-col p-6 h-[calc(100%-200px)] justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-[18px] font-medium text-gray-800 line-clamp-1 dark:text-gray-200">{name}</p>
                  <p className='text-sm'>
                    {new Date(created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }).replace(/\//g, '/')}
                  </p>
                </div>
                <div onClick={(e) => { e.stopPropagation(); toggleFavorite(); }} className="cursor-pointer -translate-y-1">
                  {isFavorite ? <FaHeart className="text-2xl text-red-500" /> : <FaRegHeart className="text-2xl text-gray-400 hover:text-red-500 transition-colors duration-300 dark:text-gray-200" />}
                </div>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-2 dark:text-gray-200">{description || fallbackDescription}</p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="flex text-Secondary">
                  {[...Array(5)].map((_, i) => (
                    i < roundedRating ? <FaStar key={i} /> : <FaRegStar key={i} />
                  ))}
                </div>
                <div className="ml-2 px-2 py-1 bg-Secondary text-white text-sm rounded-md">
                  {formattedRating}/5
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="bg-[#022278] text-white text-sm px-3 py-1 rounded-md">{category}</div>
                <div className="text-right -translate-y-1">
                  <div className="text-sm text-gray-500 dark:text-gray-200">{location}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-200">{working_days}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartService;
