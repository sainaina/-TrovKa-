import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const StatisticItem = ({ value, label, color }) => (
  <motion.div
    className="flex flex-col self-end mt-5 max-lg:self-center"
    whileHover={{ scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <motion.div
      className={`self-center text-6xl ${color} max-lg:text-[24px]`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {value}
    </motion.div>
    <motion.div
      className="mt-9 text-2xl text-white max-lg:text-[24px] max-lg:mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {label}
    </motion.div>
  </motion.div>
);

const StatisticsSection = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const { ref, inView, entry } = useInView({
    triggerOnce: false, // Allow multiple triggers
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const statisticsData = [
    { value: '5', label: t('Category'), color: 'text-white' },
    { value: '36', label: t('Providers'), color: 'text-cyan-300' },
    { value: '36', label: t('Customers'), color: 'text-lime-600' },
  ];

  return (
    <motion.section
      className="flex justify-center mx-[55px] my-[25px] md:my-[22px] items-center py-[70px] font-light bg-[#022278] rounded-[40px] max-lg:px-5"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
    >
      <div className="flex flex-col w-full max-w-[881px] max-lg:max-w-full max-lg:items-center">
        <motion.h2
          className="self-center text-3xl text-white max-lg:max-w-full max-lg:text-[24px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('Trust')}
        </motion.h2>
        <motion.div
          className="flex gap-5 justify-between items-start mt-[30px] whitespace-nowrap max-lg:flex-wrap max-lg:mt-10 max-lg:max-w-full max-lg:justify-center"
          variants={fadeInVariants}
        >
          {statisticsData.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <StatisticItem
                value={stat.value}
                label={stat.label}
                color={stat.color}
              />
              {index < statisticsData.length - 1 && (
                <motion.div
                  className="shrink-0 w-0.5 bg-white border-2 border-white border-solid h-[118px] max-lg:hidden"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StatisticsSection;
