import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

const HomeProfile = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for sliding in from the right and rotating
  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const bounce = {
    hidden: { rotate: 6 },
    visible: {
      y: [0, -10, 0],
      rotate: 6,
      transition: { y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
    },
  };

  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
      <div className="flex flex-col max-w-[365px] ml-[60px] h-[320px]">
        {loading ? (
          <Skeleton
            height={320}
            width={365}
            borderRadius={20}
            className="rotate-6"
          />
        ) : (
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
          >
            <motion.img
              src="/image/image1/ProfilePic.png"
              alt="Profile"
              variants={bounce}
              initial="hidden"
              animate="visible"
            />
          </motion.div>
        )}
      </div>
    </SkeletonTheme>
  );
}

export default HomeProfile;
