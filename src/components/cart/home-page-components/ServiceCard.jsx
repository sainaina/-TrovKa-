import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

function ServiceCard() {

  const { t } = useTranslation();
  const fadeVariants = {
    hiddenLeft: { opacity: 0, x: '-100%' },
    hiddenRight: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };

  // Service data
  const services = [
    { src: '/image/image1/education.png', count: 23},
    { src: '/image/image1/auto.png', count: 12 },
    { src: '/image/image1/restaurant.png', count: 22 },
    { src: '/image/image1/home.png', count: 18 },
    { src: '/image/image1/electronic.png', count: 24 },
  ];

  return (
    <div className="flex my-[25px] mx-[100px] gap-[30px] flex-wrap justify-center">
      {services.map((service, index) => {
        // Use useInView to trigger animation when the element comes into view
        const { ref, inView } = useInView({
          triggerOnce: false, // Trigger animation multiple times
          threshold: 0.1, // Trigger animation when 10% of the element is in view
        });

        return (
          <motion.article
            className="flex mb-[20px] justify-center items-center px-10 py-6 text-lg text-black dark:text-gray-300 bg-neutral-100 dark:bg-gray-700 rounded-2xl shadow-sm max-w-[362px]"
            key={index}
            ref={ref}
            initial={index % 2 === 0 ? fadeVariants.hiddenLeft : fadeVariants.hiddenRight}
            animate={inView ? fadeVariants.visible : (index % 2 === 0 ? fadeVariants.hiddenLeft : fadeVariants.hiddenRight)}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center w-40 lg:max-w-[100px]  xl:max-w-[100px]">
              <motion.img
                loading="lazy"
                src={service.src}
                alt={`Service illustration for ${service.count} services`}
                className="w-full aspect-[0.98]"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -100 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <motion.p
                className="mt-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {service.count} {service.label} {t('Service')}
              </motion.p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export default ServiceCard;
