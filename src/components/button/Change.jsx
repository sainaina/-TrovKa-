import React from 'react';
import { useTranslation } from 'react-i18next';

const Change = () => {
const { i18n, t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };


  return (
    <div>
      <button onClick={() => changeLanguage('en')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        EN
      </button>
      <button onClick={() => changeLanguage('kh')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        KH
      </button>
    </div>
  );
};

export default Change;
