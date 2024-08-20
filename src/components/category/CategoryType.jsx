import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

const fadeLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const CategoryType = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();

  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: false });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: false });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: false });
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: false });
  const { ref: ref5, inView: inView5 } = useInView({ triggerOnce: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView1) {
      controls1.start("visible");
    } else {
      controls1.start("hidden");
    }
  }, [controls1, inView1]);

  useEffect(() => {
    if (inView2) {
      controls2.start("visible");
    } else {
      controls2.start("hidden");
    }
  }, [controls2, inView2]);

  useEffect(() => {
    if (inView3) {
      controls3.start("visible");
    } else {
      controls3.start("hidden");
    }
  }, [controls3, inView3]);

  useEffect(() => {
    if (inView4) {
      controls4.start("visible");
    } else {
      controls4.start("hidden");
    }
  }, [controls4, inView4]);

  useEffect(() => {
    if (inView5) {
      controls5.start("visible");
    } else {
      controls5.start("hidden");
    }
  }, [controls5, inView5]);

  return (
    <div className="px-4 lg:px-8 mb-[90px] overflow-x-hidden ">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        {/* Animation 1 */}
        {loading ? (
          <div className="flex flex-col items-center md:flex-row gap-5 mb-[90px]">
            <div className="flex-1 text-center md:text-left">
              <Skeleton
                height={32}
                width={220}
                style={{ borderRadius: "16px" }}
                className="mb-4 bg-gray-200 dark:bg-gray-700"
              />
              <Skeleton
                height={20}
                width={280}
                style={{ borderRadius: "16px" }}
                className="mb-6 bg-gray-200 dark:bg-gray-700"
              />
              <Skeleton
                height={200}
                style={{ borderRadius: "16px" }}
                className="w-full max-w-[400px] mb-4 bg-gray-200 dark:bg-gray-700"
              />
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton
                height={200}
                width={400}
                style={{ borderRadius: "16px" }}
                className="bg-gray-200 dark:bg-gray-700"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center md:flex-row gap-5 mb-[90px]">
            <div className="flex-1 text-center md:text-left">
              <div className="text-2xl font-bold text-Primary dark:text-Secondary text-center">
                {t("Home_Service")}
              </div>
              <motion.div
                ref={ref1}
                initial="hidden"
                animate={controls1}
                variants={fadeLeft}
                transition={{ duration: 0.5 }}
                className="mt-9 text-lg text-stone-500 dark:text-gray-300 max-md:text-left"
              >
                {t("Home")}
              </motion.div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[400px]">
                <dotlottie-player
                  src="https://lottie.host/b727161c-a755-4fd2-bea3-8cce1062fb77/4HUiHvWMoW.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-full h-auto"
                ></dotlottie-player>
              </div>
            </div>
          </div>
        )}

        {/* Animation 2 */}
        {loading ? (
          <div className="flex flex-col items-center md:flex-row-reverse gap-5 mb-[100px]">
            <div className="flex-1 text-center md:text-left">
              <Skeleton
                height={32}
                width={220}
                style={{ borderRadius: "16px" }}
                className="mb-4"
              />
              <Skeleton
                height={20}
                width={280}
                style={{ borderRadius: "16px" }}
                className="mb-6"
              />
              <Skeleton
                height={200}
                style={{ borderRadius: "16px" }}
                className="w-full max-w-[400px] mb-4"
              />
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton
                height={200}
                width={400}
                style={{ borderRadius: "16px" }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center md:flex-row-reverse gap-5 mb-[100px]">
            <div className="flex-1 text-center md:text-left">
              <div className="text-2xl text-center font-bold text-Primary dark:text-Secondary">
                {t("Education")}
              </div>
              <motion.div
                ref={ref2}
                initial="hidden"
                animate={controls2}
                variants={fadeRight}
                transition={{ duration: 0.5 }}
                className="mt-9 text-lg text-stone-500 dark:text-gray-300 max-md:text-left"
              >
                {t("Educations")}
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[400px]">
                <dotlottie-player
                  src="https://lottie.host/62455509-c6fd-4b2e-bed9-cee5664f4e48/hUUWTI6YUm.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-full h-auto"
                ></dotlottie-player>
              </div>
            </div>
          </div>
        )}

        {/* Animation 3 */}
        {loading ? (
          <div className="flex flex-col items-center md:flex-row gap-5 mb-[60px]">
            <div className="flex-1 text-center md:text-left">
              <Skeleton
                height={32}
                width={220}
                style={{ borderRadius: "16px" }}
                className="mb-4"
              />
              <Skeleton
                height={20}
                width={280}
                style={{ borderRadius: "16px" }}
                className="mb-6"
              />
              <Skeleton
                height={200}
                style={{ borderRadius: "16px" }}
                className="w-full max-w-[400px] mb-4"
              />
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton
                height={200}
                width={400}
                style={{ borderRadius: "16px" }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center md:flex-row gap-5 mb-[60px]">
            <div className="flex-1 text-center md:text-left">
              <div className="text-2xl text-center font-bold text-Primary dark:text-Secondary">
                {t("Restaurant")}
              </div>
              <motion.div
                ref={ref3}
                initial="hidden"
                animate={controls3}
                variants={fadeLeft}
                transition={{ duration: 0.5 }}
                className="mt-9 text-lg text-stone-500 dark:text-gray-300 max-md:text-left"
              >
                {t("Restaurants")}
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[400px]">
                <lottie-player
                  src="https://lottie.host/691d5e75-04d7-4d70-bb8f-cfdaccf81794/dQYZQnUfod.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-full h-auto"
                ></lottie-player>
              </div>
            </div>
          </div>
        )}

        {/* Animation 4 */}
        {loading ? (
          <div className="flex flex-col items-center md:flex-row-reverse gap-5 mb-[60px]">
            <div className="flex-1 text-center md:text-left">
              <Skeleton
                height={32}
                width={220}
                style={{ borderRadius: "16px" }}
                className="mb-4"
              />
              <Skeleton
                height={20}
                width={280}
                style={{ borderRadius: "16px" }}
                className="mb-6"
              />
              <Skeleton
                height={200}
                style={{ borderRadius: "16px" }}
                className="w-full max-w-[400px] mb-4"
              />
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton
                height={200}
                width={400}
                style={{ borderRadius: "16px" }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center md:flex-row-reverse gap-5 mb-[60px]">
            <div className="flex-1 text-center md:text-left">
              <div className="text-2xl text-center font-bold text-Primary dark:text-Secondary">
                {t("Electronic")}
              </div>
              <motion.div
                ref={ref4}
                initial="hidden"
                animate={controls4}
                variants={fadeRight}
                transition={{ duration: 0.5 }}
                className="mt-9 text-lg text-stone-500 dark:text-gray-300 max-md:text-left"
              >
                {t("Electronics")}
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[400px]">
                <lottie-player
                  src="https://lottie.host/8f6075ff-5c92-4967-ac63-f385fb5f5058/q8TqSL0g27.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-full h-auto"
                ></lottie-player>
              </div>
            </div>
          </div>
        )}

        {/* Animation 5 */}
        {loading ? (
          <div className="flex flex-col items-center md:flex-row gap-5">
            <div className="flex-1 text-center md:text-left">
              <Skeleton
                height={32}
                width={220}
                style={{ borderRadius: "16px" }}
                className="mb-4"
              />
              <Skeleton
                height={20}
                width={280}
                style={{ borderRadius: "16px" }}
                className="mb-6"
              />
              <Skeleton
                height={200}
                style={{ borderRadius: "16px" }}
                className="w-full max-w-[400px] mb-4"
              />
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton
                height={200}
                width={400}
                style={{ borderRadius: "16px" }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center md:flex-row gap-5">
            <div className="flex-1 text-center md:text-left">
              <div className="text-2xl font-bold text-center text-Primary dark:text-Secondary">
                {t("Auto_service")}
              </div>
              <motion.div
                ref={ref5}
                initial="hidden"
                animate={controls5}
                variants={fadeLeft}
                transition={{ duration: 0.5 }}
                className="mt-9 text-lg text-stone-500 dark:text-gray-300 max-md:text-left"
              >
                {t("Auto_Service")}
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[400px]">
                <lottie-player
                  src="https://lottie.host/a2c2572c-5b49-42a5-beec-2666d592d1ab/UTvE6pY0Qw.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-full h-auto"
                ></lottie-player>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryType;
