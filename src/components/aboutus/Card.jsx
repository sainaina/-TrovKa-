import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const fadeLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const Card = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const controlsGoal = useAnimation();
  const controlsMission = useAnimation();
  const controlsVision = useAnimation();

  const { ref: refGoal, inView: inViewGoal } = useInView({
    triggerOnce: false,
  });
  const { ref: refMission, inView: inViewMission } = useInView({
    triggerOnce: false,
  });
  const { ref: refVision, inView: inViewVision } = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    if (inViewGoal) {
      controlsGoal.start("visible");
    } else {
      controlsGoal.start("hidden");
    }
  }, [controlsGoal, inViewGoal]);

  useEffect(() => {
    if (inViewMission) {
      controlsMission.start("visible");
    } else {
      controlsMission.start("hidden");
    }
  }, [controlsMission, inViewMission]);

  useEffect(() => {
    if (inViewVision) {
      controlsVision.start("visible");
    } else {
      controlsVision.start("hidden");
    }
  }, [controlsVision, inViewVision]);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network request
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
        <div className="px-5 xl:px-[90px] mb-[90px]">
          {/* Animation 1: Goal */}
          <div className="flex flex-col mt-[70px] items-center md:flex-row gap-5 mb-[90px]">
            <div className="flex-1">
              <Skeleton height={40} width={200} />
              <div className="mt-9">
                <Skeleton count={3} borderRadius={70} />
              </div>
            </div>
            <div className="flex flex-1 justify-center">
              <Skeleton height={400} width={400} />
            </div>
          </div>

          {/* Animation 2: Mission */}
          <div className="flex flex-col items-center md:flex-row-reverse gap-5 mb-[100px]">
            <div className="flex-1">
              <Skeleton height={40} width={200} />
              <div className="mt-9">
                <Skeleton count={3} borderRadius={30} />
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton height={400} width={400} />
            </div>
          </div>

          {/* Animation 3: Vision */}
          <div className="flex flex-col items-center md:flex-row gap-5 mb-[90px]">
            <div className="flex-1">
              <Skeleton height={40} width={200} />
              <div className="mt-9">
                <Skeleton count={3} borderRadius={30} />
              </div>
            </div>
            <div className="flex flex-1 justify-center">
              <Skeleton height={400} width={400} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="px-5 xl:px-[90px] mb-[90px]">
        {/* Animation 1: Goal */}
        <div className="flex flex-col mt-[70px] items-center md:flex-row gap-5 mb-[90px]">
          <div className="flex-1">
            <div className="text-2xl font-bold text-center text-Primary dark:text-Secondary">
              {t("Goal")}
            </div>
            <motion.div
              ref={refGoal}
              initial="hidden"
              animate={controlsGoal}
              variants={fadeLeft}
              transition={{ duration: 0.5 }}
              className="mt-9 text-gray-900 text-lg max-md:max-w-full dark:text-gray-300"
            >
              {inViewGoal ? t("Goal_Content") : <Skeleton count={3} borderRadius={30} />}
            </motion.div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="w-2/2 max-w-[400px]">
              <lottie-player
                src="https://lottie.host/b162f405-2819-4c84-9127-a13cc62a4878/nNQZuisCYR.json"
                background="##fff"
                speed="1"
                loop
                autoplay
                direction="1"
                mode="normal"
              ></lottie-player>
            </div>
          </div>
        </div>

        {/* Animation 2: Mission */}
        <div className="flex flex-col items-center md:flex-row-reverse gap-5 mb-[100px]">
          <div className="flex-1">
            <div className=" text-2xl font-bold text-center text-Primary dark:text-Secondary">
              {t("Mission")}
            </div>
            <motion.div
              ref={refMission}
              initial="hidden"
              animate={controlsMission}
              variants={fadeRight}
              transition={{ duration: 0.5 }}
              className="mt-9 text-lg text-gray-900 max-md:max-w-full dark:text-gray-300"
            >
              {inViewMission ? t("Mission_Content") : <Skeleton count={3} borderRadius={30} />}
            </motion.div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-2/2 max-w-[400px]">
              <lottie-player
                src="https://lottie.host/acc7e1f3-1d16-4219-9380-cdc7d847e7c7/HUCKgu0ZOV.json"
                background="##FFFFFF"
                speed="1"
                loop
                autoplay
                direction="1"
                mode="normal"
              ></lottie-player>
            </div>
          </div>
        </div>

        {/* Animation 3: Vision */}
        <div className="flex flex-col items-center md:flex-row gap-5 mb-[90px]">
          <div className="flex-1">
            <div className="text-2xl font-bold text-center text-Primary dark:text-Secondary">
              {t("Vision")}
            </div>
            <motion.div
              ref={refVision}
              initial="hidden"
              animate={controlsVision}
              variants={fadeLeft}
              transition={{ duration: 0.5 }}
              className="mt-9 text-lg text-gray-900 max-md:max-w-full dark:text-gray-300"
            >
              {inViewVision ? t("Vision_Content") : <Skeleton count={3} borderRadius={30} />}
            </motion.div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="w-2/2 max-w-[400px]">
              <dotlottie-player
                src="https://lottie.host/4addf017-a16f-4da2-b0f9-733077a73b4a/dJvPs4a4sa.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></dotlottie-player>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Card;
