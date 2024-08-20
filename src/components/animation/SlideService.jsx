import { Carousel } from "flowbite-react";
import { useTranslation } from 'react-i18next';

const SlideService = () => {
  const { t } = useTranslation();
  return (
    <div className="sm:h-64 xl:h-80 2xl:h-96 relative">
      <Carousel pauseOnHover>
        <div className="relative h-full">
          <img className="w-full h-full object-cover" src={"/image/image1/home-service-slide.jpg"} alt="Home Services" />
          <p className="absolute inset-0 flex items-center justify-center text-white text-[30px] font-bold bg-black bg-opacity-50 transition-colors duration-300 hover:text-Secondary">{t('Home_Service')}</p>
        </div>
        <div className="relative h-full">
          <img className="w-full h-full object-cover" src={"/image/image1/auto-service-slide.jpg"} alt="auto service" />
          <p className="absolute inset-0 flex items-center justify-center text-white text-[30px] font-bold bg-black bg-opacity-50 transition-colors duration-300 hover:text-yellow-400">{t('Auto_service')}</p>
        </div>
        <div className="relative h-full">
          <img className="w-full h-full object-cover" src={"/image/image1/restaurant-slide.jpg"} alt="restaurant" />
          <p className="absolute inset-0 flex items-center justify-center text-white text-[30px] font-bold bg-black bg-opacity-50 transition-colors duration-300 hover:text-yellow-400">{t('Restaurant')}</p>
        </div>
        <div className="relative h-full">
          <img className="w-full h-full object-cover" src={"/image/image1/education-slide.jpg"} alt="education" />
          <p className="absolute inset-0 flex items-center justify-center text-white text-[30px] font-bold bg-black bg-opacity-50 transition-colors duration-300 hover:text-yellow-400">{t('Education')}</p>
        </div>
        <div className="relative h-full">
          <img className="w-full h-full object-cover " src={"/image/image1/electronic-slide.png"} alt="electronic" />
          <p className="absolute inset-0 flex items-center justify-center text-white text-[30px] font-bold bg-black bg-opacity-50 transition-colors duration-300 hover:text-yellow-400">{t('Electronic')}</p>
        </div>
      </Carousel>
    </div>
  );
};

export default SlideService;
