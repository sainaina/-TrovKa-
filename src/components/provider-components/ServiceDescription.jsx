import React from 'react';
import { useTranslation } from "react-i18next";

export const ServiceDescription = ({ service }) => {
  const { t } = useTranslation();
  return (
    <div className="p-9 sm:p-8 md:p-10 lg:p-10 -mt-[40px] -mb-[40px]">
      <h2 className="font-semibold border-b-[2px] dark:text-[#98caf9] border-spacing-y-1 border-[#D9D9D9] text-Primary mb-4 text-[24px]">
        {t('Service_Detail')}
      </h2>
      <p>{service.description}</p>
    </div>
  );
};
