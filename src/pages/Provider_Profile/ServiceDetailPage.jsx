import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceById, selectService, selectServiceStatus } from '../../redux/feature/service/serviceSlice';
import ContactInfo from '../../components/provider-components/ContactInfo';
import WriteReview from '../../components/provider-components/WriteReview';
import { Metadata } from "../../lib/Metadata";
import { ServiceDescription } from '../../components/provider-components/ServiceDescription';
import LoadingComponent from '../../components/common/LoadingComponent';
import { selectReviews, fetchServiceReviews } from '../../redux/feature/review/reviewSlice';
import ServiceProviderCard from '../../components/provider-components/ServiceCover';
import { FaPhone } from 'react-icons/fa';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector(selectService);
  const serviceStatus = useSelector(selectServiceStatus);
  const reviews = useSelector(selectReviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
      dispatch(fetchServiceReviews(id));
    } else {
      console.error('Service ID is undefined');
    }
  }, [dispatch, id]);

  if (serviceStatus === 'loading') {
    return <LoadingComponent />;
  }

  if (serviceStatus === 'failed') {
    return <div className="text-center text-red-600">Error loading service details</div>;
  }

  const filteredReviews = reviews.filter((review) => review.service === service.id);
  const validRatings = filteredReviews
    .map((review) => Number(review.rate_star))
    .filter((rating) => !isNaN(rating) && rating >= 0 && rating <= 5);

  const totalRating = validRatings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = validRatings.length > 0 ? totalRating / validRatings.length : 0;

  return (
    <>
      <Metadata
        title="Service Detail | TrovKa"
        description="Welcome to Service-TrovKa"
        author="SainaIna"
        keywords="services, trovka, home"
        thumbnail="./src/assets/logo/Trovka-icon.png"
      />
      <div className="container mx-auto -mt-14">
        <ServiceProviderCard service={service} averageRating={averageRating} reviewCount={validRatings.length} />
        <ServiceDescription service={service} />    
        <ContactInfo service={service} />
        <WriteReview service={service} />
      </div>
    </>
  );
};

export default ServiceDetailPage;
