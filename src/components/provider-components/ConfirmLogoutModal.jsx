import React from 'react';
import { useTranslation } from "react-i18next";

const ConfirmLogoutModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-[102%] -translate-x-4 bg-gray-800 bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{t('Confirm_Logout')}</h2>
        <p className="mb-4 ">{t('Are_You_Sure')}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            {t('Cancel')}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={onConfirm}
          >
            {t('Logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
