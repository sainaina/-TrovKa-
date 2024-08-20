import React, { useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { VscPreview } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Review from '../../components/user-component/Review';

const UserReview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col rounded-2xl -mt-10 bg-neutral-100 dark:bg-gray-900 w-full overflow-x-hidden">
      <div className="mt-8 w-full">
        <div className="flex flex-col md:flex-row gap-5 w-full">
          {/* Dropdown Button for Small Screens */}
          <button
            onClick={toggleDropdown}
            className="md:hidden bg-Primary text-white p-2 rounded-lg w-full mb-4"
          >
            {t('Menu')}
          </button>

          {/* Sidebar */}
          <div className={`flex flex-col ${isOpen ? 'block' : 'hidden'} md:flex md:w-1/5 w-full`}>
            <div className={`flex flex-col text-base tracking-wide leading-6 text-neutral-500 ${isOpen ? 'block' : 'hidden'} md:block bg-white dark:bg-gray-800 rounded-tr-lg`}>
              <div className="flex flex-col gap-4 pt-8 pb-14 px-4 md:px-7">
                <div
                  className="flex gap-4 p-2 mt-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                  onClick={() => handleButtonClick('/user-setting')}
                >
                  <IoSettingsOutline className="shrink-0 w-6 aspect-square text-[25px]" />
                  <div>{t('Profile_Setting')}</div>
                </div>

                <div
                  className="flex gap-4 p-2 -mt-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                  onClick={() => handleButtonClick('/user-favorite')}
                >
                  <GrFavorite className="shrink-0 w-6 aspect-square text-[25px]" />
                  <div>{t('Favorite')}</div>
                </div>

                <div
                  className="flex gap-4 p-2 font-semibold bg-Primary dark:text-gray-100 dark:bg-gray-600 text-white rounded-lg hover:cursor-pointer"
                  onClick={() => handleButtonClick('/user-review')}
                >
                  <VscPreview className="shrink-0 w-6 aspect-square text-[25px]" />
                  <div>{t('Reviews')}</div>
                </div>

                <div
                  className="flex gap-4 p-2  rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                  onClick={() => handleButtonClick('/user-password')}
                >
                  <RiLockPasswordLine className="shrink-0 w-6 aspect-square text-[25px]" />
                  <div>{t('Change_Pw')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col w-full md:w-4/5 mb-16">
            <div className="flex flex-col w-full">
              <div className="flex flex-col items-center px-4 md:px-8 pt-8 pb-6 bg-white dark:bg-gray-800 rounded-2xl w-full">
                <div className="flex flex-col gap-4 w-full">
                  <Review />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserReview;
