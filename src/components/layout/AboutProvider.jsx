import React from "react";
import { useTranslation } from "react-i18next";

const AboutProvider = () => {
  const { t } = useTranslation();
  return (
    <div className="px-8 py-10 md:px-16 lg:px-[6rem] md:py-20 pb-5 -mt-8 md:-mt-12 lg:-mt-[50px]">
      <h2 className="font-bold border-b dark:text-Action border-gray-300 text-Primary mb-4 text-lg md:text-xl lg:text-[24px]">
        {t('About')}
      </h2>
      <p className="text-sm md:text-base lg:text-lg">
        We have a wide spectrum of expertise in web solutions within these industries, giving us the necessary skills and knowledge to help you increase your presence on the web.
      </p>
    </div>
  );
};

export default AboutProvider;
