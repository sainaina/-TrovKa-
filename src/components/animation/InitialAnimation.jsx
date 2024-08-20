// src/components/InitialAnimation.js

import React from 'react';
import { motion } from 'framer-motion';

const InitialAnimation = ({ onAnimationComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      onAnimationComplete={onAnimationComplete}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.h1
        initial={{ scale: 1 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="text-white text-5xl"
      >
        Welcome To TrovKa !!
      </motion.h1>
    </motion.div>
  );
};

export default InitialAnimation;
