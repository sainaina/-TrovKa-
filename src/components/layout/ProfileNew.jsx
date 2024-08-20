import React from 'react';
import { FaCalendarAlt, FaStar, FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const ProfileNew = ({ createdBy, serviceCount, averageRating, totalReviews }) => {
  if (!createdBy) return null;
  const { t } = useTranslation();

  return (
    <div>
      <div className="h-40 flex flex-col items-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 py-8 w-full">
      </div>

      <div className="bg-white dark:bg-gray-800  rounded-lg overflow-hidden w-full mt-22 border-b ">
        <div className="flex flex-col md:flex-row items-center justify-between p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-32 h-32 object-cover"
                src={createdBy.avatar || ".//src/assets/image/profile.png"}
                alt="Profile"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-medium dark:text-gray-200 hover:text-green-500 transition duration-300 transform hover:scale-105">{createdBy.username}</h2>
              <p className="text-gray-500 dark:text-gray-500 hover:text-green-500 transition duration-300 transform hover:scale-105">{createdBy.email}</p>

              <div className="flex items-center gap-2 text-gray-500 mt-2 justify-center md:justify-start hover:text-green-500 transition duration-300 transform hover:scale-105">
                <FaCalendarAlt />
                <p>{t('Member_since')} {createdBy.created_at ? new Date(createdBy.created_at).toLocaleDateString() : "Unknown"}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-2 justify-center md:justify-start hover:text-yellow-500 transition duration-300 transform hover:scale-105">
                <FaStar />
                <p>{averageRating || "No Rating"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6 md:mt-0">
            <a
              href={`tel:${createdBy.phone || ''}`}
              className="px-4 py-2 bg-Primary text-white rounded-lg hover:bg-blue-800 flex items-center gap-2"
            >
              <FaPhoneAlt className="mr-2" />
              {t('Phone')}: {createdBy.phone || 'N/A'}
            </a>
          </div>

        </div>
        <div className="flex flex-col md:flex-row justify-around py-4 border-t border-gray-200">
          <div className="text-center p-4">
            <p className="text-2xl font-semibold text-Primary dark:text-Action">{totalReviews}</p>
            <p className="text-gray-500 dark:text-Action">{t('Reviews')}</p>
          </div>
          <div className="text-center p-4">
            <p className="text-2xl font-semibold text-Primary dark:text-Action">{serviceCount}</p>
            <p className="text-gray-500 dark:text-Action">{t('Service')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNew;
