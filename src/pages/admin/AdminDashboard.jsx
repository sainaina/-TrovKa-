import React, { useState, useEffect } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdOutlineDesignServices, MdBuild } from 'react-icons/md';
import BasicStacking from '../../components/common/BasicStacking';
import { FaUserCog } from 'react-icons/fa';
import { MdSupervisorAccount } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { MdCategory } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/user/userSlice';
import { MdLanguage } from 'react-icons/md';
import ConfirmLogoutModal from '../../components/provider-components/ConfirmLogoutModal';
import { CiLight, CiDark } from 'react-icons/ci'; // Import dark mode icons

const AdminDashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // Dark mode state
    const [language, setLanguage] = useState('en'); // Language state
    const dispatch = useDispatch();

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

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const handleLanguageChange = () => {
        const newLanguage = language === 'en' ? 'kh' : 'en';
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    const handleLogout = () => {
        setShowModal(true);
    };

    const handleConfirmLogout = () => {
        dispatch(logout());
        onLogout();
        navigate("/");
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
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
                                        <div className="flex gap-4 whitespace-nowrap font-semibold dark:bg-gray-600 bg-Primary text-white p-2 dark:hover:bg-gray-600 dark:text-gray-300 rounded-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                            onClick={() => handleButtonClick('/admin')}>
                                            <AiOutlineDashboard
                                                className="shrink-0 w-6 aspect-square text-[25px]"
                                            />
                                            <div>{t('Dashboard')}</div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/manage-user')}
                                        >
                                            <FaUserCog className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Manage_Users')} </div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/manage-provider')}
                                        >
                                            <MdSupervisorAccount className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Manage_Providers')} </div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/manage-service')}
                                        >
                                            <IoSettingsOutline
                                                className="shrink-0 w-6 aspect-square text-[25px]"
                                            />
                                            <div>{t('Service')}</div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/manage-category')}
                                        >
                                            <MdCategory className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Category')}</div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/manage-review')}
                                        >
                                            <MdRateReview className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Reviews')}</div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/admin-setting')}
                                        >
                                            <AiOutlineUser className="shrink-0 w-6 aspect-square text-[25px]" />
                                            <div>{t('Profile_Setting')}</div>
                                        </div>

                                        <div className="flex gap-4 mt-3 p-2 text-neutral-500 rounded-lg hover:bg-Primary dark:hover:bg-gray-600 dark:text-gray-300 hover:text-white hover:cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                                            onClick={() => handleButtonClick('/admin-password')}
                                        >
                                            <RiLockPasswordLine
                                                className="shrink-0 w-6 aspect-square text-[25px]"
                                            />
                                            <div>{t('Change_Pw')}</div>
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
                            <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
                                <div className="flex gap-7 self-start whitespace-nowrap max-md:flex-wrap">

                                    <div className="flex flex-auto gap-10 justify-between px-8 py-6 bg-[#813ffb] rounded-lg border border-solid border-slate-100 max-md:pr-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
                                        <div className="flex flex-col">
                                            <div className="text-sm leading-4 text-white">{t('Reviews')}</div>
                                            <div className="mt-5 text-xl font-bold leading-6 text-white">14</div>
                                        </div>
                                        <AiOutlineComment className="shrink-0 w-16 aspect-square text-[50px] text-white" />
                                    </div>

                                    <div className="flex flex-auto gap-10 justify-between py-6 pr-12 pl-5 bg-[#e6523a] rounded-lg border border-solid border-slate-100 max-md:px-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
                                        <div className="flex flex-col self-start">
                                            <div className="text-sm leading-4 text-white">{t('User')}</div>
                                            <div className="mt-5 text-xl font-bold leading-6 text-white">4</div>
                                        </div>
                                        <FaUser className="shrink-0 w-16 aspect-square text-[50px] text-white" />
                                    </div>

                                    <div className="flex flex-auto gap-10 justify-between py-6 pr-12 pl-5 bg-[#4787ff] rounded-lg border border-solid border-slate-100 max-md:px-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
                                        <div className="flex flex-col self-start">
                                            <div className="text-sm leading-4 text-white">{t('Providers')}</div>
                                            <div className="mt-5 text-xl font-bold leading-6 text-white">4</div>
                                        </div>
                                        <MdOutlineDesignServices className="shrink-0 w-16 aspect-square text-[50px] text-white" />
                                    </div>

                                    <div className="flex flex-auto gap-10 justify-between py-6 pr-12 pl-5 bg-[#00b8da] rounded-lg border border-solid border-slate-100 max-md:px-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
                                        <div className="flex flex-col self-start">
                                            <div className="text-sm leading-4 text-white">{t('Service')}</div>
                                            <div className="mt-5 text-xl font-bold leading-6 text-white">4</div>
                                        </div>
                                        <MdBuild className="shrink-0 w-16 aspect-square text-[50px] text-white" />
                                    </div>

                                </div>

                                <div className="flex flex-col items-center px-16 pt-10 pb-9 mt-6 bg-white rounded-2xl border border-solid border-slate-100 max-md:px-5 max-md:max-w-full">
                                    <BasicStacking />
                                </div>
                            </div>
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
    );
};

export default AdminDashboard;
