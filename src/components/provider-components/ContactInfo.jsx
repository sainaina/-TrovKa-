import React from "react";
import { useTranslation } from 'react-i18next';

const ContactInfo = ({ service }) => {
  if (!service) {
    return <div>Loading...</div>; 
  }

  const { t } = useTranslation();
  const workingDays = service.working_days ? service.working_days.split('-') : [];
  const startTime = service.start_time || "N/A";
  const endTime = service.end_time || "N/A";
  const created_by = service.created_by || "N/A";
  const location = service.location || "unknown location";

  return (
    <div className="p-9 sm:p-8 md:p-10 lg:p-10 mt-10">
      <h2 className="border-b-2 text-Primary dark:text-Action border-gray-300 font-semibold text-2xl" >
      {t('Contact_Info')}
      </h2>

      <div className="mt-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <iframe
            className="w-full h-64 lg:h-80"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=phnom%20penh+(cambodia)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-10 flex flex-col w-full lg:w-1/2">
          <div className="mb-6">
            <h2 className="font-semibold text-Primary dark:text-Action" >{t('Working_Days')}</h2>
            <div className="flex gap-2 text-gray-900 dark:text-gray-300">
              <div className="flex flex-col mr-8">
                {workingDays.map((day, index) => (
                  <div key={index} className="mb-2">{day}</div>
                ))}
              </div>
              <div className="flex flex-col">
                {workingDays.map((_, index) => (
                  <div key={index} className="mb-2">
                    {startTime} - {endTime}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold text-Primary dark:text-Action">{t('Address')}</h2>
            <p className="text-gray-900 dark:text-gray-300 my-[5px]">
              {`${location.province}, ${location.district}, ${location.commune}, ${location.village}`}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold text-Primary dark:text-Action">{t('Email')}</h2>
            <p className="text-gray-900 dark:text-gray-300">{created_by.email || "N/A"}</p>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold text-Primary dark:text-Action">{t('Phone')}</h2>
            <p className="text-gray-900 dark:text-gray-300"> {created_by.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
