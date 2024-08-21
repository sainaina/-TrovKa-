import React, { useState, useEffect } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { VscPreview } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCustomerService2Line } from "react-icons/ri";
import ChartProvider from "../../components/common/ChartProvider";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectServices, fetchProviderServices } from "../../redux/feature/service/providerServiceSlice";
import { selectReviews, fetchReviews } from "../../redux/feature/review/reviewSlice";
import { selectUser } from "../../redux/feature/user/userSlice";

const SidebarItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <div
    className={clsx(
      "flex gap-4 p-2 rounded-lg transition-all duration-300 hover:cursor-pointer",
      {
        "text-white bg-Primary hover:shadow-lg hover:scale-105": isActive,
        "text-neutral-500 hover:text-white hover:bg-Primary dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:text-gray-300 hover:shadow-lg hover:scale-105":
          !isActive,
      }
    )}
    onClick={() => onClick(path)}
  >
    <Icon className="shrink-0 w-6 h-6" />
    <div>{label}</div>
  </div>
);

const ProviderDashboardOverall = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);

  const services = useSelector(selectServices);
  const reviews = useSelector(selectReviews);
  const provider = useSelector(selectUser);

  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch services and reviews when the component mounts if not already loaded
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchProviderServices());
    }

    if (reviews.length === 0) {
      dispatch(fetchReviews());
    }
  }, [dispatch, services.length, reviews.length]);

  useEffect(() => {
    if (services.length > 0) {
      const filtered = filterServices(services, searchQuery);
      setFilteredServices(filtered);
    }
  }, [services, searchQuery]);

  const totalReviews = reviews.length > 0 && services.length > 0 ? reviews.filter((review) =>
    services.some(
      (service) =>
        service.id === review.service &&
        service.created_by.username === provider.username
    )
  ).length : 0;

  const filterServices = (services, query) => {
    if (!query) return services;
    return services.filter((service) =>
      Object.values(service).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleButtonClick = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      icon: AiOutlineDashboard,
      label: t("Dashboard"),
      path: "/dashboard-provider",
    },
    {
      icon: IoSettingsOutline,
      label: t("Profile_Setting"),
      path: "/provider-setting",
    },
    {
      icon: RiCustomerService2Line,
      label: t("My_Service"),
      path: "/my-service",
    },
    { icon: VscPreview, label: t("Reviews"), path: "/provider-review" },
    {
      icon: RiLockPasswordLine,
      label: t("Change_Pw"),
      path: "/provider-password",
    },
  ];

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);


  return (
    <div className="flex flex-col rounded-2xl bg-neutral-100 dark:bg-gray-900">
      <div className="mt-8 w-full">
        <div className="flex gap-5 flex-col md:flex-row w-full">
          {/* Dropdown Button for Mobile Screens */}
          <div className="md:hidden flex flex-col w-full">
            <button
              onClick={toggleDropdown}
              className="bg-Primary text-white p-2 rounded-lg w-full mb-2"
            >
              {t("Menu")}
            </button>
            <div
              className={`flex flex-col text-base tracking-wide leading-6 text-neutral-500 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col gap-5 justify-between items-start pt-8 pb-14 px-8 md:px-0 md:pl-8 w-full bg-white dark:bg-gray-800 rounded-tr-lg">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isActive={activePath === item.path}
                    onClick={handleButtonClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar for Larger Screens */}
          <div className="hidden md:flex flex-col w-[18%]">
            <div className="flex flex-col grow pb-20 text-base tracking-wide leading-6 text-neutral-500">
              <div className="flex flex-col gap-5 justify-between items-start pt-8 pb-14 px-8 md:px-0 md:pl-8 w-full md:w-[250px] bg-white dark:bg-gray-800 rounded-tr-lg">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    isActive={activePath === item.path}
                    onClick={handleButtonClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col w-full md:w-[82%] md:ml-5 mb-20">
            <div className="flex gap-4 flex-wrap px-3">
              <div className="flex flex-auto gap-5 justify-between px-8 py-6 bg-[#813ffb] rounded-lg border border-solid border-slate-100 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-auto md:px-8">
                <div className="flex flex-col">
                  <div className="text-sm leading-4 text-white">
                    {t("Reviews")}
                  </div>
                  <div className="mt-5 text-xl font-bold leading-6 text-white">
                    {totalReviews}
                  </div>
                </div>
                <VscPreview className="shrink-0 w-16 aspect-square text-[50px] text-white" />
              </div>

              <div className="flex flex-auto gap-5 justify-between px-8 py-6 bg-[#4787ff] rounded-lg border border-solid border-slate-100 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-auto md:px-8">
                <div className="flex flex-col">
                  <div className="text-sm leading-4 text-white">
                    {t("My_Service")}
                  </div>
                  <div className="mt-5 text-xl font-bold leading-6 text-white">
                    {filteredServices.length}
                  </div>
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
  );
};

export default ProviderDashboardOverall;
