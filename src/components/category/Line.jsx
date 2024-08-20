import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

const Line = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-center items-center">
        <div className="text-center">
          {/* You can add additional content here if needed */}
        </div>
      </div>

      <div className="flex justify-center items-center pb-20">
        {loading ? (
          <Skeleton
            height={60}
            width={300}
            style={{ borderRadius: '16px' }}
            className="mt-4 px-6 md:px-16 py-4 text-xl md:text-2xl font-semibold rounded-lg max-w-full md:max-w-[465px]"
          />
        ) : (
          <div className="mt-4 px-6 md:px-16 py-4 text-xl md:text-2xl font-semibold dark:text-Action text-Secondary border border-Secondary rounded-lg max-w-full md:max-w-[465px] transform transition-transform hover:scale-110">
            {t('Our_Category')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Line;
