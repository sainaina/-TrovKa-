import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CategoryLocation = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // Simulate loading for 0.7 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/service?query=${searchQuery}`);
  };

  // Animation variants for the actual content
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="max-w-md my-[33px] ml-[16px]">
        {loading ? (
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Skeleton circle={true} height={24} width={24} />
            </div>
            <Skeleton height={50} borderRadius={30} />
            <div className="flex justify-end mt-2">
              <Skeleton width={100} height={40} borderRadius={20} />
            </div>
          </div>
        ) : (
          <motion.form
            variants={slideInFromLeft}
            initial="hidden"
            animate="visible"
            className="relative"
            onSubmit={handleSearch}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              {t('Search')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t('Enter_the_Category')}
                required
              />
              <button
                type="submit"
                className="absolute end-2.5 bottom-2.5 text-white bg-[#022278] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#022278] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t('Search')}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </SkeletonTheme>
  );
};

export default CategoryLocation;
