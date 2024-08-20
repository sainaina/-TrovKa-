import React, { useState } from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { VscPreview } from "react-icons/vsc";
import { RiLockPasswordLine, RiCustomerService2Line } from "react-icons/ri";
import ProviderReview from '../../components/provider-components/ProviderReview';
import { Metadata } from "../../lib/Metadata";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GrFavorite } from "react-icons/gr";

const ProviderReviewPage = () => {
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
      <div>
        <Metadata
          title="Provider Review | TrovKa"
          description="Welcome to Service-TrovKa"
          author="SainaIna"
          keywords="services, trovka, home"
          thumbnail="./src/assets/logo/Trovka-icon.png"
        />
      </div>

      <div className="flex flex-col rounded-2xl -mt-10 bg-neutral-100 dark:bg-gray-900 w-full">
        <div className="mt-8 w-full">
          <div className="flex gap-5 flex-col md:flex-row w-full">

            {/* Dropdown Button for Mobile Screens */}
            <div className="md:hidden flex flex-col w-full">
              <button
                onClick={toggleDropdown}
                className="bg-Primary text-white p-2 rounded-lg w-full mb-2"
              >
                {t('Menu')}
              </button>
              <div className={`flex flex-col text-base tracking-wide leading-6 text-neutral-500 ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col gap-5 justify-between items-start pt-8 pb-14 px-8 md:px-0 md:pl-8 w-full bg-white dark:bg-gray-800 rounded-tr-lg">

                  <div className="flex flex-col mt-2">
                    <div className="flex gap-4 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/dashboard-provider')}>
                      <AiOutlineDashboard className="shrink-0 w-6 h-6" />
                      <div>{t('Dashboard')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/provider-setting')}>
                      <IoSettingsOutline className="shrink-0 w-6 h-6" />
                      <div>{t('Profile_Setting')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/my-service')}>
                      <RiCustomerService2Line className="shrink-0 w-6 h-6" />
                      <div>{t('My_Service')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                      onClick={() => handleButtonClick('/provider-favorite')}
                    >
                      <GrFavorite
                        className="shrink-0 w-6 aspect-square text-[25px]"
                      />
                      <div>{t('Favorite')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 whitespace-nowrap font-semibold rounded-lg bg-Primary text-white dark:hover:text-gray-100 dark:text-gray dark:bg-gray-600 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
                      onClick={() => handleButtonClick('/provider-review')}>
                      <VscPreview className="shrink-0 w-6 h-6" />
                      <div>{t('Reviews')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/provider-password')}>
                      <RiLockPasswordLine className="shrink-0 w-6 h-6" />
                      <div>{t('Change_Pw')}</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden md:flex flex-col w-[18%]">
              <div className="flex flex-col grow pb-20 text-base tracking-wide leading-6 text-neutral-500">
                <div className="flex flex-col gap-5 justify-between items-start pt-8 pb-14 px-8 md:px-0 md:pl-8 w-full md:w-[250px] bg-white dark:bg-gray-800 rounded-tr-lg">

                  <div className="flex flex-col mt-2">
                    <div className="flex gap-4 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/dashboard-provider')}>
                      <AiOutlineDashboard className="shrink-0 w-6 h-6" />
                      <div>{t('Dashboard')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/provider-setting')}>
                      <IoSettingsOutline className="shrink-0 w-6 h-6" />
                      <div>{t('Profile_Setting')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/my-service')}>
                      <RiCustomerService2Line className="shrink-0 w-6 h-6" />
                      <div>{t('My_Service')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
                      onClick={() => handleButtonClick('/provider-favorite')}
                    >
                      <GrFavorite
                        className="shrink-0 w-6 aspect-square text-[25px]"
                      />
                      <div>{t('Favorite')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 whitespace-nowrap font-semibold rounded-lg bg-Primary text-white dark:hover:text-gray-100 dark:text-gray dark:bg-gray-600 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
                      onClick={() => handleButtonClick('/provider-review')}>
                      <VscPreview className="shrink-0 w-6 h-6" />
                      <div>{t('Reviews')}</div>
                    </div>

                    <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick('/provider-password')}>
                      <RiLockPasswordLine className="shrink-0 w-6 h-6" />
                      <div>{t('Change_Pw')}</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col w-full md:w-[82%] md:ml-5 mb-20">
              <div className="flex flex-col items-center px-5 md:px-8 lg:px-16 pt-10 pb-9 bg-white dark:bg-gray-800 rounded-2xl">
                <div className="w-full">
                  <ProviderReview />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProviderReviewPage;
