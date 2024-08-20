import React from 'react';
import { FaFacebook, FaTelegram } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { MdOutlineCopyright } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export const FooterComponent = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-Primary w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start py-0 md:py-0">
        {/* <img src="/image/logo/logo-footer.png" alt="Logo" className="w-40 mb-0 md:mb-0 md:ml-14 md:-translate-y-5" /> */}
        <img src="/image/logo/Trovka-logo-official-dark.png" alt="Logo" className="w-40 mt-14 mb-10 md:mb-0 md:ml-14 md:-translate-y-5" />
        <div className="text-white uppercase flex flex-col md:flex-row md:translate-y-10 text-[20px] md:justify-between md:w-full md:px-16">
          <div className="mb-8 md:mb-0 md:mr-12">
            <p>{t('Feature')}</p>
            <ul className="capitalize text-[17px] block -ml-4 mt-3 md:mt-3 leading-8">
              <li>{t('Listing')}</li>
              <li>{t('Searching')}</li>
              <li>{t('Filtering')}</li>
            </ul>
          </div>
          <div className="mb-8 md:mb-0 md:mr-12">
            <p>{t('Category_1')}</p>
            <ul className="capitalize text-[17px] mt-3 -ml-4 block md:mt-3 leading-8">
              <li><a href="#">{t('Education')}</a></li>
              <li><a href="#">{t('Auto_service')}</a></li>
              <li><a href="#">{t('Home_Service')}</a></li>
              <li><a href="#">{t('Restaurant')}</a></li>
              <li><a href="#">{t('Electronic')}</a></li>
            </ul>
          </div>
          <div>
            <p>{t('Contact_Us')}</p>
            <address className="capitalize text-[17px] block mt-3  md:mt-3 leading-8 not-italic">
              <p>{t('Address')}:<a href="#"> 11st Toulkork, Phnom Penh</a></p>
              <p>{t('Email')}:<a href="mailto:trovka@gmail.com" className='lowercase'> trovka@gmail.com</a></p>
              <p>{t('Phone')}:<a href="tel:+081515149"> 081 51 51 49</a></p>
              <div className="w-28 mt-2">
                <nav className="flex justify-between text-2xl items-center">
                  <a href="#"><FaFacebook /></a>
                  <a href="https://t.me/+hZuf-aIGzB4yYjVl" target='_blank'><FaTelegram /></a>
                  <a href="https://www.youtube.com/@TrovKa" target='_blank'><IoLogoYoutube className="text-[28px]" /></a>
                </nav>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="w-full h-[60px] mt-8 md:mt-16 border-t flex justify-center items-center text-white text-lg">
        <MdOutlineCopyright className="text-2xl mr-1" />
        <p>2024 TROVKA. {t('All_rights_reserved')} </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
