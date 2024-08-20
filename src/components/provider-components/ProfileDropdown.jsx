import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, selectUserRole } from "../../redux/feature/user/userSlice"; // Import the selectors and logout action
import ConfirmLogoutModal from "./ConfirmLogoutModal"; // Import your ConfirmLogoutModal component
import { useTranslation } from "react-i18next";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiLogOut } from 'react-icons/fi';

export default function ProfileDropdown({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const { t } = useTranslation();
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  // Use selector to get the user role
  const userRole = useSelector(selectUserRole);
  const user = useSelector(selectUser);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  const handleButtonClick = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmLogout = () => {
    dispatch(logout()); // Dispatch logout action
    onLogout(); // Call the onLogout prop
    navigate("/"); // Redirect to login page
    setDropdownOpen(false);
    setShowModal(false);

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderLinks = () => {
    switch (userRole) {
      case 'admin':
        return (
          <>
            <button
              className="flex whitespace-nowrap w-full p-3 rounded-lg hover:cursor-pointer transition-transform duration-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary transform hover:scale-105 hover:text-white hover:shadow-lg"
              onClick={() => handleButtonClick('/admin-dashboard')}
            >
              <AiOutlineDashboard
                className="shrink-0 w-6 aspect-square mr-2 text-[25px]"
              />
              {t('Dashboard')}
            </button>
            <button
              className="flex whitespace-nowrap w-full p-3 rounded-lg hover:cursor-pointer transition-transform duration-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary transform hover:scale-105 hover:text-white hover:shadow-lg"
              onClick={handleLogout}
            >
              <FiLogOut
                className="shrink-0 w-6 aspect-square mr-2 text-[25px]"
              />
              {t('Logout')}
            </button>
          </>
        );
      case 'provider':
        return (
          <>
            <button
              className="flex whitespace-nowrap w-full p-3 rounded-lg hover:cursor-pointer transition-transform duration-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary transform hover:scale-105 hover:text-white hover:shadow-lg"
              onClick={() => handleButtonClick('/dashboard-provider')}
            >
              <AiOutlineDashboard className="shrink-0 w-6 mr-2 aspect-square text-[25px]" />
              {t('Dashboard')}
            </button>
            <button
              className="flex whitespace-nowrap w-full p-3 rounded-lg hover:cursor-pointer transition-transform duration-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary transform hover:scale-105 hover:text-white hover:shadow-lg"
              onClick={handleLogout}
            >
              <FiLogOut className="shrink-0 w-6 aspect-square mr-2 text-[25px]" />
              {t('Logout')}
            </button>
          </>
        );
      case 'user':
      default:
        return (
          <>
            <button
              className="flex whitespace-nowrap w-full p-3 rounded-lg hover:cursor-pointer transition-transform duration-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary transform hover:scale-105 hover:text-white hover:shadow-lg"
              onClick={() => handleButtonClick('/user-setting')}
            >
              <AiOutlineDashboard
                className="shrink-0 w-6 mr-2 aspect-square text-[25px]"
              />
              {t('Dashboard')}
            </button>
            <button
              className="flex whitespace-nowrap w-full p-3 rounded-lg hover:cursor-pointer transition-transform duration-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-300 hover:bg-Primary transform hover:scale-105 hover:text-white hover:shadow-lg"
              onClick={handleLogout}
            >
              <FiLogOut
                className="shrink-0 w-6 aspect-square mr-2 text-[25px]"
              />
              {t('Logout')}
            </button>
          </>
        );
    }
  };

  return (
    <>
      <section className="bg-gray-2 py-20 ">
        <div className="container ">
          <div className="flex justify-center ">
            <div className="relative inline-block ">
              <button
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-left "
              >
                <div className="relative mr-4 my-[12px] h-[42px] w-[42px] rounded-full ">
                  <img
                    src={user?.avatar || "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover object-center"
                  />
                  <span className="absolute -right-0.5 -top-0.5 block h-[14px] w-[14px] rounded-full border-[2.3px] border-white bg-[#219653] dark:border-dark"></span>
                </div>
              </button>
              <div
                ref={dropdown}
                className={`absolute right-0 top-full z-50 w-[200px] space-y-1 rounded-lg bg-white p-2 shadow-card dark:bg-slate-700 dark:shadow-box-dark ${dropdownOpen ? "block" : "hidden"}`}
              >
                <div className="px-3 py-2">
                  <p className="text-base font-medium text-dark dark:text-white">
                    {user?.username}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userRole}
                  </p>
                </div>
                {renderLinks()}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConfirmLogoutModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
