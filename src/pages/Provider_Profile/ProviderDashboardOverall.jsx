import React, { useEffect, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { Metadata } from "../../lib/Metadata";
import { useTranslation } from "react-i18next";
import { GrFavorite } from "react-icons/gr";
import ChartProvider from '../../components/common/ChartProvider';
import { selectServices } from "../../redux/feature/service/providerServiceSlice";
import { useSelector } from "react-redux";
import { selectReviews } from "../../redux/feature/review/reviewSlice";
import { selectUser } from "../../redux/feature/user/userSlice";


const ProviderDashboardOverall = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);
  const services = useSelector(selectServices);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const reviews = useSelector(selectReviews);
  const provider = useSelector(selectUser);

  const totalReviews = reviews.filter((review) =>
    services.some(
      (service) =>
        service.id === review.service &&
        service.created_by.username === provider.username
    )
  ).length;

  // Filtering logic inside the component
  const filterServices = (services, query) => {
    if (!query) return services;
    return services.filter((service) =>
      Object.values(service).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const filtered = filterServices(services, searchQuery);
    setFilteredServices(filtered);
  }, [services, searchQuery]);

  
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

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

      <div className="flex flex-col -mt-10 rounded-2xl bg-neutral-100 dark:bg-gray-900 w-full">
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
                      className="flex gap-4 whitespace-nowrap font-semibold p-2 rounded-lg bg-Primary text-white dark:hover:text-gray-100 dark:text-gray dark:bg-gray-600 hover:cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
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

                    <div className="flex gap-4 mt-3 p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary hover:text-white hover:shadow-lg"
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
              <div className="flex gap-4 flex-wrap px-3">
                <div className="flex flex-auto gap-5 justify-between px-8 py-6 bg-[#813ffb] rounded-lg border border-solid border-slate-100 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-auto md:px-8">
                  <div className="flex flex-col">
                    <div className="text-sm leading-4 text-white">{t('Reviews')}</div>
                    <div className="mt-5 text-xl font-bold leading-6 text-white"> {totalReviews} </div>
                  </div>
                  <VscPreview className="shrink-0 w-16 aspect-square text-[50px] text-white" />
                </div>

                <div className="flex flex-auto gap-5 justify-between px-8 py-6 bg-[#4787ff] rounded-lg border border-solid border-slate-100 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-auto md:px-8">
                  <div className="flex flex-col">
                    <div className="text-sm leading-4 text-white">{t('My_Service')}</div>
                    <div className="mt-5 text-xl font-bold leading-6 text-white"> {filteredServices.length} </div>
                  </div>
                  <RiCustomerService2Line className="shrink-0 w-16 aspect-square text-[50px] text-white" />
                </div>
              </div>

              <div className="flex flex-col items-center px-16 pt-20 pb-9 mt-6 bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
                <ChartProvider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProviderDashboardOverall;
