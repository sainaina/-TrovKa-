import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Metadata } from "../../lib/Metadata";
import { useTranslation } from "react-i18next";
import { GrFavorite } from "react-icons/gr";
import ProviderFavoriteCom from "../../components/provider-components/ProviderFavoriteCom";

const ProviderFavorite = () => {
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
          title="Provider Setting | TrovKa"
          description="Welcome to Service-TrovKa"
          author="SainaIna"
          keywords="services, trovka, home"
          thumbnail="./src/assets/logo/Trovka-icon.png"
        />
      </div>

      <div className="flex flex-col rounded-2xl -mt-10 bg-neutral-100 dark:bg-gray-900 w-full">
        <div className="mt-8 w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 w-full">
            <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
              
              <button
                onClick={toggleDropdown}
                className="md:hidden bg-Primary text-white p-2 rounded-lg w-full mb-5"
              >
                {t('Menu')}
              </button>
              {/* Dropdown menu */}
              <div
                className={`flex flex-col grow pb-20 text-base tracking-wide leading-6 text-neutral-500 max-md:mt-6 ${isOpen ? "block" : "hidden"
                  } md:block`}
              >
                <div className="flex gap-5 justify-between items-start pt-8 pb-14 pl-8 md:w-[250px] w-full bg-white dark:bg-gray-800 rounded-tr-lg max-md:pl-5">
                  <div className="flex flex-col mt-2">
                    <div
                      className="flex gap-4 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-00 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick("/dashboard-provider")}
                    >
                      <AiOutlineDashboard className="shrink-0 w-6 aspect-square text-[25px]" />
                      <div>{t("Dashboard")}</div>
                    </div>

                    <div
                      className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-00 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick("/provider-setting")}
                    >
                      <IoSettingsOutline className="shrink-0 w-6 aspect-square text-[25px]" />
                      <div>{t("Profile_Setting")}</div>
                    </div>

                    <div
                      className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-00 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick("/my-service")}
                    >
                      <RiCustomerService2Line className="shrink-0 w-6 aspect-square text-[25px]" />
                      <div>{t("My_Service")}</div>
                    </div>

                    <div className="flex mt-3 gap-4 whitespace-nowrap font-semibold p-2 rounded-lg bg-Primary text-white dark:hover:text-gray-100 dark:text-gray dark:bg-gray-600 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
                      onClick={() => handleButtonClick('/provider-favorite')}
                    >
                      <GrFavorite
                        className="shrink-0 w-6 aspect-square text-[25px]"
                      />
                      <div>{t('Favorite')}</div>
                    </div>

                    <div
                      className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-00 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick("/provider-review")}
                    >
                      <VscPreview className="shrink-0 w-6 aspect-square text-[25px]" />
                      <div>{t("Reviews")}</div>
                    </div>

                    <div
                      className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-00 dark:text-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
                      onClick={() => handleButtonClick("/provider-password")}
                    >
                      <RiLockPasswordLine className="shrink-0 w-6 aspect-square text-[25px]" />
                      <div>{t("Change_Pw")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-[82%] md:ml-5 mb-20">
              <div className="flex flex-col items-center px-16 pt-8 pb-9 dark:bg-gray-800 bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
                <ProviderFavoriteCom/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProviderFavorite;
