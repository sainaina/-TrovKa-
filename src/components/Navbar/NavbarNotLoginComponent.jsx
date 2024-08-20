import React, { useState, useEffect } from "react";
import { CiLogin, CiLight, CiDark } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { FaBars, FaTimes } from "react-icons/fa";

export function NavbarNotLoginComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const darkModeClass = "dark";
    const lightModeClass = "light";
    if (darkMode) {
      document.body.classList.add(darkModeClass);
      document.body.classList.remove(lightModeClass);
    } else {
      document.body.classList.add(lightModeClass);
      document.body.classList.remove(darkModeClass);
    }
  }, [darkMode]);

  const menuList = [
    { path: "/service", title: t("Service") },
    { path: "/category", title: t("Category") },
    { path: "/contact-us", title: t("Contact") },
    { path: "/about-us", title: t("About Us") },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[40px] flex justify-center items-center bg-Primary text-white z-40">
        <p className="text-center text-[15px] flex items-center justify-center space-x-2">
          <a href="https://t.me/+hZuf-aIGzB4yYjVl">
            <img
              src="/image/image1/telegram.png"
              className="w-[30px] h-[30px]"
              alt="Telegram"
            />
          </a>
          <span>
            <a href="https://t.me/+hZuf-aIGzB4yYjVl" className="text-[#98caf9]">
              {t("Join_our_community")}
            </a>
            {t("Support_and_Connect")}
          </span>
        </p>
      </div>
      <nav className="navbar fixed top-[40px] px-[60px] left-0 w-full bg-white dark:bg-gray-900 dark:text-white z-50">
        <div className="container mx-auto flex items-center justify-between h-[70px] p-4 md:p-0">
          <div className="flex items-center">
            <button
              className="lg:hidden text-2xl focus:outline-none -ml-[50px] mr-[5px]"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes className="text-Primary dark:text-white" /> : <FaBars className="text-Primary dark:text-white" />}
            </button>
            <img
              className="w-40 hover:cursor-pointer"
              src={darkMode ? "/image/logo/Trovka-logo-official-dark.png " : "/image/logo/Trovka-logo-official.png"}
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="hidden lg:flex items-center flex-grow">
            <div className="flex-grow flex items-center justify-center space-x-10">
              {menuList.map((menu, index) => (
                <NavLink
                  key={index}
                  to={menu.path}
                  className={({ isActive }) =>
                    `block px-2 py-2 transition-colors  duration-300 text-[18px] dark:text-gray-300 ${
                      isActive
                        ? "text-Secondary font-semibold border-b-2 border-Secondary"
                        : "dark:hover:text-Secondary"
                    }`
                  }
                >
                  {menu.title}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => changeLanguage("kh")}
                className="text-textColor hover:text-primary transition-colors duration-300 dark:text-gray-300"
              >
                KH
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className="text-textColor hover:text-primary transition-colors duration-300 dark:text-gray-300"
              >
                EN
              </button>
              <button
                onClick={toggleDarkMode}
                className="text-textColor hover:text-primary transition-colors duration-300 dark:text-gray-300"
              >
                {darkMode ? (
                  <CiLight
                    className="text-[22px]"
                    style={{ color: "#FFFFFF", opacity: 0.9 }}
                  />
                ) : (
                  <CiDark
                    className="text-[22px]"
                    style={{ color: "#000000", opacity: 0.9 }}
                  />
                )}
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-[120px] h-9 bg-[#FFB600] rounded-xl flex justify-center items-center text-white text-[18px]"
              >
                <CiLogin className="mr-2 text-[20px]" />
                {t("Sign In")}
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-[120px] h-9 border-secondary border rounded-xl flex justify-center items-center text-textColor text-[18px]"
              >
                {t("Sign Up")}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden fixed top-[100px] left-0 w-full h-full bg-white dark:bg-gray-900 dark:text-white z-50`}
      >
        <div className="flex items-center justify-end px-4 py-2 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changeLanguage("kh")}
              className="text-textColor hover:text-primary transition-colors duration-300 dark:text-gray-300"
            >
              KH
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className="text-textColor hover:text-primary transition-colors duration-300 dark:text-gray-300"
            >
              EN
            </button>
            <button
              onClick={toggleDarkMode}
              className="text-textColor hover:text-primary transition-colors duration-300 dark:text-gray-300"
            >
              {darkMode ? (
                <CiLight
                  className="text-[22px]"
                  style={{ color: "#FFFFFF", opacity: 0.9 }}
                />
              ) : (
                <CiDark
                  className="text-[22px]"
                  style={{ color: "#000000", opacity: 0.9 }}
                />
              )}
            </button>
          </div>
        </div>
        <ul className="flex flex-col items-center space-y-2 py-2 ">
          {menuList.map((menu, index) => (
            <li key={index}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `block px-4 py-2 text-textColor transition-colors duration-300 text-[18px] dark:text-gray-300 ${
                    isActive
                      ? "text-Primary font-semibold border-b-2 border-Secondary"
                      : "hover:text-Secondary dark:hover:text-Secondary"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {menu.title}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => navigate("/login")}
              className="w-[120px] h-9 bg-[#FFB600] rounded-xl my-[15px] flex justify-center items-center text-white text-[18px]"
            >
              <CiLogin className="mr-2 text-[20px]" />
              {t("Sign In")}
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/register")}
              className="w-[120px] h-9 border-secondary border rounded-xl flex justify-center items-center text-textColor text-[18px]"
            >
              {t("Sign Up")}
            </button>
          </li>
        </ul>
      </div>
      <div className="pt-[135px]"></div>
    </>
  );
}
