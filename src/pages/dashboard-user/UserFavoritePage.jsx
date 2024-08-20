import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { VscPreview } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Favorite from '../../components/user-component/Favorite';

export const UserFavoritePage = () => {
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
    <>
      <div className="flex flex-col rounded-2xl -mt-10 bg-neutral-100 dark:bg-gray-900 w-full">
        <div className="mt-8 w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 w-full">
            <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
              <button
                onClick={toggleDropdown}
                className="md:hidden bg-Primary text-white p-2 rounded-lg w-full"
              >
                {t('Menu')}
              </button>
              <div className={`flex flex-col grow pb-20 text-base tracking-wide leading-6 text-neutral-500 max-md:mt-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="flex gap-5 justify-between items-start pt-8 pb-14 pl-8 md:w-[250px] w-full bg-white dark:bg-gray-800 rounded-tr-lg max-md:pl-5">
                  <div className="flex flex-col mt-2">
                    <div className="flex gap-4 p-2  rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                      onClick={() => handleButtonClick('/user-setting')}>
                      <IoSettingsOutline className="shrink-0 w-6 h-6" />
                      <div>{t('Profile_Setting')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 font-semibold bg-Primary dark:hover:text-gray-100 dark:text-gray-300 dark:bg-gray-600 text-white p-2 hover:cursor-pointer rounded-lg"
                      onClick={() => handleButtonClick('/user-favorite')}>
                      <GrFavorite className="shrink-0 w-6 h-6" />
                      <div>{t('Favorite')}</div>
                    </div>

                    <div className="flex gap-4 p-2 mt-3 rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                      onClick={() => handleButtonClick('/user-review')}>
                      <VscPreview className="shrink-0 w-6 h-6" />
                      <div>{t('Reviews')}</div>
                    </div>

                    <div className="flex gap-4 p-2 mt-3 rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                      onClick={() => handleButtonClick('/user-password')}>
                      <RiLockPasswordLine className="shrink-0 w-6 h-6" />
                      <div>{t('Change_Pw')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full mb-16">
              <div className="flex flex-col max-md:mt-6 max-md:max-w-full max-md:w-full">
                <div className="flex flex-col items-center px-16  pb-9 bg-white dark:bg-gray-800 rounded-2xl max-md:px-5 max-md:max-w-full max-md:w-full">
                  <div className="flex gap-2  max-md:flex-wrap  w-full">
                    <div className='w-full'>
                      <Favorite />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFavoritePage;
