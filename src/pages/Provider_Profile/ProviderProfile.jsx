import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceById, fetchServices, selectService, selectServices, selectServiceStatus } from '../../redux/feature/service/serviceSlice';
import ProfileNew from "../../components/layout/ProfileNew";
import HorizontalCard from '../../components/cart/HorizontalCard';
import { useTranslation } from "react-i18next";
import { fetchServiceReviews, selectReviews, selectReviewsStatus } from '../../redux/feature/review/reviewSlice';
import LoadingComponent from '../../components/common/LoadingComponent';

const ProviderProfile = () => {
  const { providerId } = useParams();
  console.log('Fetched ID:', providerId);
  const dispatch = useDispatch();
  const service = useSelector(selectService);
  const reviews = useSelector(selectReviews);
  const services = useSelector(selectServices);
  const serviceStatus = useSelector(selectServiceStatus);
  const reviewsStatus = useSelector(selectReviewsStatus);
  const { t } = useTranslation();
  useEffect(() => {
  const token = localStorage.getItem('token'); 
  console.log('Token:', token);
  if (!token) {
    console.warn('No token found!');
  }
}, []);


  useEffect(() => {
    console.log('Component Mounted');
  }, []);
  
  useEffect(() => {
    console.log('useEffect: fetching all services');
    dispatch(fetchServices());
  }, [dispatch]);
  
  useEffect(() => {
    if (providerId) {
      console.log('useEffect: id changed', providerId);
      dispatch(fetchServiceById(providerId));
      dispatch(fetchServiceReviews(providerId));
    }
  }, [dispatch, providerId]);
  
  useEffect(() => {
    console.log('Service:', service);
    console.log('Services:', services);
    console.log('Reviews:', reviews);
    console.log('Review Status:', reviewsStatus);
  }, [service, services, reviews, reviewsStatus]);
  

  if (serviceStatus === 'loading' || reviewsStatus === 'loading') {
    return <LoadingComponent/>;
  }

  if (serviceStatus === 'failed' || reviewsStatus === 'failed') {
    return <div>Error loading service details </div>;
  }

  const filteredServices = services.filter(svc => svc.created_by.id === service?.created_by?.id);
  const serviceCount = filteredServices.length;
  const serviceIds = filteredServices.map(svc => svc.id);
  const filteredReviews = reviews.filter(review => serviceIds.includes(review.service));
  const totalReviews = filteredReviews.length;
  const averageRating = totalReviews > 0
    ? (filteredReviews.reduce((acc, review) => acc + review.rate_star, 0) / totalReviews).toFixed(1)
    : 0;


    return (
      <>
        <div className=' -mt-2'>
          {service && (
            <>
              <ProfileNew 
                createdBy={service.created_by}
                serviceCount={serviceCount}
                totalReviews={totalReviews}
                averageRating={averageRating}
              />
              
            </>
          )}
        </div>
        <div className="mt-10 max-md:mt-[10px] max-sm:-mt-[12px]">
          <div className="px-8 md:px-[72px] lg:px-[7rem] max-sm:px-[20px]  md:py-10 pb-5 mt-8 md:-mt-12 lg:-mt-[50px]">
            <h2 className="font-bold border-b border-gray-300 dark:text-Action text-Primary py-1 -mb-2 text-lg md:text-xl lg:text-[24px]">
              {t("Service")}
            </h2>
          </div>
          <div className="px-4 py-10 md:px-16 lg:px-[6rem] pb-5 -mt-9 md:-mt-12 lg:-mt-[50px]">
            {filteredServices.map((service) => (
               <div key={service.id} className="mb-10">
               <HorizontalCard
                 id={service.id}
                 image={service.image}
                 name={service.name}
                 created_at={service.created_at}
                 description={service.description}
                 category={service.category.category_name}
                 location={`${service.location.province}, ${service.location.district}, ${service.location.commune}, ${service.location.village}, ${service.location.postal_code}`}
                 working_days={Array.isArray(service.working_days) ? service.working_days.join(', ') : service.working_days}
                 reviews={filteredReviews.filter(review => review.service === service.id)}
               />
             </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default ProviderProfile;
  