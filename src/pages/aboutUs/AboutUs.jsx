import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../../components/aboutus/Card";
import { Team } from "../../components/aboutus/Team";
import { Mentor } from "../../components/aboutus/Mentor";
import { motion } from "framer-motion";
import { Metadata } from "../../lib/Metadata";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate a longer loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden mx-4 lg:my-[10px] lg:mx-30">
      <Metadata
        title="About Us | Troka"
        description="Learn about Troka’s mission, vision, and goals, and how we connect users with top services."
        author="TrovKa Team"
        keywords="services, Troka, About Us"
        thumbnail="https://i.ibb.co/s6D2gFC/trovka-icon.png"
      />

      <motion.div
        className="mx-auto mb-6 w-16 h-16 lg:w-20 lg:h-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <Skeleton
            circle={true}
            height="100%"
            width="100%"
            borderRadius={20}
          />
        ) : (
          <img
            src="image/logo/trovka-icon.png"
            alt="Logo"
            className="w-full h-full"
          />
        )}
      </motion.div>

      <motion.div
        className="mb-[5px] text-4xl font-bold text-[#98caf9] text-center"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <Skeleton height={50} width={300} borderRadius={20} />
        ) : (
          <h1>{t("About_Trovka")}</h1>
        )}
      </motion.div>

      <div className="px-4 py-[2px] w-full max-w-3xl mx-auto">
        <motion.div
          className="mt-5 text-left text-gray-900 dark:text-gray-300 lg:text-left"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <Skeleton height={20} width="100%" borderRadius={20} />
          ) : (
            <p className=" text-lg">{t("About_Des")}</p>
          )}
        </motion.div>
      </div>


      <motion.div
        className="w-full mt-[9px] mb-[40px] lg:w-1/2 lg:mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <Skeleton height={300} width="100%" borderRadius={20} />
        ) : (
          <dotlottie-player
            src="https://lottie.host/4664f3d5-bf53-4a77-a45c-b59b74b7f5f1/8eZIpWEnNY.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        )}
      </motion.div>

      <div className="px-4 lg:px-8 xl:px-16 2xl:px-32 mb-[90px] overflow-x-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center lg:items-center my-4 lg:my-8">
            <motion.div
              className="text-2xl lg:text-4xl font-bold text-[#98caf9] text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {loading ? (
                <Skeleton height={40} width={300} borderRadius={20} />
              ) : (
                <h2>{t("Goal_Mission_Vision")}</h2>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Card />

      <div className="mt-8 lg:mt-20 px-4 lg:px-8">
        <motion.div
          className="bg-[#022278] py-2 text-white rounded-md flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-base lg:text-lg">{t("Our_Mentor")}</span>
        </motion.div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Mentor />
        </motion.div>
      </div>
      <div className="lg:mt-20 px-4 lg:px-8">
        <motion.div
          className="bg-[#022278] py-2 text-white rounded-md flex justify-center mb-[90px]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-base lg:text-lg">{t("Our_Team")}</span>
        </motion.div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Team />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
