import React, { useState, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="flex justify-center px-4 ">
        <div className="text-left max-w-[510px] w-full">
          {loading ? (
            <>
              {/* Static Skeleton Loader */}
              <div className="font-bold text-4xl text-[#FFB600]">
                <Skeleton height={40} width={300} borderRadius={20} />
              </div>
              <div className="mt-[20px]">
                <Skeleton count={2} borderRadius={20} />
              </div>
            </>
          ) : (
            <>
              {/* Slide-in animation for title */}
              <motion.h1
                className="font-bold text-4xl text-[#FFB600]"
                variants={slideInFromLeft}
                initial="hidden"
                animate="visible"
              >
                <ReactTyped
                  strings={[t('welcome_To_Trovka')]}
                  typeSpeed={100}
                  loop
                  className="text-4xl max-[600px]:text-3xl max-[400px]:text-2xl max-[320px]:text-xl"
                />
              </motion.h1>
              <motion.div
                className="mt-[20px]"
                variants={slideInFromLeft}
                initial="hidden"
                animate="visible"
              >
                <p className="sm:text-[18px] md:text-[18px] mt-[20px] lg:text-[18px] break-words">
                  {t('Welcome')}
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default HeroSection;
