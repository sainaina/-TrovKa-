import React, { useEffect, useState } from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { MdSupervisorAccount } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { MdCategory } from "react-icons/md";
import ManageReviewsComponent from '../../components/admin-component/ManageReviewsComponent';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/user/userSlice';
import ConfirmLogoutModal from '../../components/provider-components/ConfirmLogoutModal';
import { FiLogOut } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { CiLight, CiDark } from 'react-icons/ci';

const ManageReview = ({ onLogout }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const dispatch = useDispatch(); // Initialize useDispatch
    const [darkMode, setDarkMode] = useState(false); // Dark mode state
    const [language, setLanguage] = useState('en');
    const { t, i18n } = useTranslation();

    const handleButtonClick = (path) => {
        navigate(path);
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

    useEffect(() => {
        const darkModeClass = 'dark';
        const lightModeClass = 'light';
        if (darkMode) {
            document.body.classList.add(darkModeClass);
            document.body.classList.remove(lightModeClass);
        } else {
            document.body.classList.add(lightModeClass);
            document.body.classList.remove(darkModeClass);
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    const handleLanguageChange = () => {
        const newLanguage = language === 'en' ? 'kh' : 'en';
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <>

            <div className="flex flex-col rounded-2xl bg-neutral-100 dark:bg-gray-900">

                <div className="mt-8 w-full max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow pb-20 text-base tracking-wide leading-6 text-neutral-500 max-md:mt-6">
                                <div className="flex gap-5 justify-between items-start pt-8 pb-14 pl-8 w-[250px] bg-white dark:bg-gray-800 rounded-tr-lg max-md:pl-5">

                                    <div className="flex flex-col mt-2">
                                        <div className="flex gap-4 mt-3 hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={() => handleButtonClick('/admin')}>
                                            <AiOutlineDashboard
                                                className="shrink-0 w-6 aspect-square text-[25px]"
                                            />
                                            <div >{t('Dashboard')} </div>
                                        </div>


                                        <div className="flex gap-4 mt-3 hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={() => handleButtonClick('/manage-user')}
                                        >
                                            <FaUserCog className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div> {t('Manage_Users')} </div>
                                        </div>


                                        <div className="your-component-container">
                                            <div className="flex gap-4 mt-3 hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                                onClick={() => handleButtonClick('/manage-provider')}
                                            >
                                                <MdSupervisorAccount className="shrink-0 w-6 aspect-square text-[25px]" />
                                                <div> {t('Manage_Providers')} </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-3 hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={() => handleButtonClick('/manage-service')}
                                        >
                                            <IoSettingsOutline
                                                className="shrink-0 w-6 aspect-square text-[25px]"

                                            />
                                            <div > {t('Service')} </div>
                                        </div>


                                        <div className="flex gap-4 mt-3 hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={() => handleButtonClick('/manage-category')}
                                        >
                                            <MdCategory className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Category')} </div>
                                        </div>



                                        <div className="flex gap-4 mt-3 whitespace-nowrap font-semibold bg-Primary dark:bg-gray-600 text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={() => handleButtonClick('/manage-review')}
                                        >
                                            <MdRateReview className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Reviews')} </div>
                                        </div>

                                        <div className="flex gap-4 mt-3 hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={() => handleButtonClick('/admin-setting')}
                                        >
                                            <AiOutlineUser className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Profile_Setting')} </div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/admin-password')}
                                        >
                                            <RiLockPasswordLine
                                                className="shrink-0 w-6 aspect-square text-[25px]"
                                            />
                                            <div >
                                                {t('Change_Pw')}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={handleLanguageChange}>
                                            <MdLanguage className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{language === 'en' ? (t('KH')) : (t('EN'))}</div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={toggleDarkMode}>
                                            {darkMode ? (
                                                <CiLight className="shrink-0 w-6 aspect-square text-[25px]" />
                                            ) : (
                                                <CiDark className="shrink-0 w-6 aspect-square text-[25px]" />
                                            )}
                                            <div>{darkMode ? (t('Light_Mode')) : (t('Dark_Mode'))}</div>
                                        </div>

                                        <div className="flex gap-4 mt-3 hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white p-2 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={handleLogout}
                                        >
                                            <FiLogOut
                                                className="shrink-0 w-6 aspect-square text-[25px]"
                                            />
                                            <div>{t('Logout')}</div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
                            <ManageReviewsComponent />
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmLogoutModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmLogout}
            />
        </>
    )
}

export default ManageReview;





