import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function SuggestedCustomer() {
  const { t } = useTranslation();

  // Variants for animations
  const fadeInLeft = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Custom hook to use Intersection Observer
  const useScrollAnimation = (threshold = 0.1) => {
    const [ref, inView] = useInView({
      threshold,
      triggerOnce: true, // Trigger animation once when in view
    });
    return [ref, inView];
  };

  // Using custom hook for each section
  const [section1Ref, section1InView] = useScrollAnimation();
  const [section2Ref, section2InView] = useScrollAnimation();
  const [section3Ref, section3InView] = useScrollAnimation();
  const [section4Ref, section4InView] = useScrollAnimation();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex gap-5 mr-[100px] ml-[20px] my-[90px] max-md:flex-col max-md:gap-0"
        >
            <motion.div
                ref={section1Ref}
                initial="hidden"
                animate={section1InView ? "visible" : "hidden"}
                variants={fadeInLeft}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="ml-20 flex flex-col w-6/12 max-md:ml-0 max-md:w-full"
            >
                <div className="flex flex-col self-stretch px-5 my-auto text-xl text-black max-md:mt-10 max-md:max-w-full">
                    <div className="text-5xl font-extrabold text-Primary max-md:max-w-full max-md:text-4xl">
                        {t("Comment1")}
                    </div>
                    <span className="mt-[10px] font-extrabold text-5xl text-[#FFB600] ">
                        {t("Comment2")}
                    </span>
                    <div className="mt-[20px] max-md:max-w-full dark:text-white ">
                        {t("Comment")}
                    </div>
                </div>
            </motion.div>

            <motion.div
                ref={section2Ref}
                initial="hidden"
                animate={section2InView ? "visible" : "hidden"}
                variants={fadeInRight}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full"
            >
                <motion.div
                    ref={section3Ref}
                    initial="hidden"
                    animate={section3InView ? "visible" : "hidden"}
                    variants={fadeInLeft}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                    className="ml-20 w-[500px] rounded-xl dark:bg-gray-700 bg-gray-100 flex flex-col grow items-end max-md:mt-10 max-md:max-w-full"
                >
                    <div className="flex gap-5 justify-between items-center dark:bg-gray-700 px-5 py-5 rounded-3xl bg-neutral-100 max-md:flex-wrap">

                        <img
                            loading="lazy"
                            srcSet="/image/image1/tola.jpg"
                            className="shrink-0 max-w-full aspect-square object-cover w-[108px] rounded-full"
                            alt="Customer 1"
                        />

                        <div className="flex flex-col my-auto text-black">
                            <div className="text-xl font-medium">
                                <div className="text-xl font-medium dark:text-gray-300">
                                    Saroeun Tola
                                </div>
                            </div>
                            <div className="mt-2 text-base dark:text-gray-300">
                                {t('Comment_First')}
                            </div>
                        </div>
                        <div className="font-mono self-start mt-5 text-5xl font-extrabold text-zinc-400 max-md:text-4xl">
                            ”
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    ref={section4Ref}
                    initial="hidden"
                    animate={section4InView ? "visible" : "hidden"}
                    variants={fadeInRight}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                    className="w-[500px] self-stretch rounded-xl px-6 dark:bg-gray-700 py-2.5 mt-8 bg-neutral-100 max-md:px-5 max-md:max-w-full"
                >
                    <div className="flex gap-5 justify-between items-center dark:bg-gray-700 py-3 rounded-3xl bg-neutral-100 max-md:flex-wrap">
                        <img
                            loading="lazy"
                            srcSet="/image/image1/chanly.jpg"
                            className="shrink-0 max-w-full mt-[10px] object-cover aspect-square w-[108px] rounded-full max-md:mt-8"
                            alt="Customer 2"
                        />

                        <div className="flex flex-col my-auto text-black">
                            <div className="text-xl font-medium dark:text-gray-300">
                                Va Channly
                            </div>
                            <div className="mt-2 text-base dark:text-gray-300">
                                {t('Comment_Second')}
                            </div>
                        </div>

            <div className="font-mono self-start mt-5 text-5xl font-extrabold text-zinc-400 max-md:text-4xl">
              ”
            </div>
          </div>
        </motion.div>

                <motion.div
                    ref={section4Ref}
                    initial="hidden"
                    animate={section4InView ? "visible" : "hidden"}
                    variants={fadeInLeft}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
                    className="rounded-xl flex gap-5 justify-between items-center px-5 py-5 mt-8 dark:bg-gray-700 bg-neutral-100 max-md:flex-wrap w-[500px] max-md:max-w-full ml-20"
                >

                    <div className="flex gap-5 justify-between items-center dark:bg-gray-700 py-3 rounded-3xl bg-neutral-100 max-md:flex-wrap">
                        <img
                            loading="lazy"
                            srcSet="/image/image1/borin.jpg"
                            className="shrink-0 max-w-full object-cover aspect-square w-[108px] rounded-full"
                            alt="Customer 3"
                        />

            <div className="flex flex-col my-auto text-black">
              <div className="text-xl font-medium dark:text-gray-300">
                Seam Borin
              </div>
              <div className="mt-2 text-base dark:text-gray-300 flex-wrap">
                {t("Comment_Third")}
              </div>
            </div>

            <div className="font-mono self-start mt-5 text-5xl font-extrabold text-zinc-400 max-md:text-4xl">
              ”
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SuggestedCustomer;
