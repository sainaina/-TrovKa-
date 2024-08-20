import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReviews,
  selectReviews,
  selectReviewsError,
  selectReviewsStatus,
} from '../../redux/feature/review/reviewSlice';
import {
  fetchServices,
  selectServices,
} from '../../redux/feature/service/serviceSlice';
import LoadingComponent from '../common/LoadingComponent';
import { selectUser } from '../../redux/feature/user/userSlice';
import { useTranslation } from 'react-i18next';

const ProviderReview = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const status = useSelector(selectReviewsStatus);
  const error = useSelector(selectReviewsError);
  const services = useSelector(selectServices);
  const provider = useSelector(selectUser);
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    console.log('Component mounted: Fetching reviews and services');
    dispatch(fetchReviews());
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    console.log('Reviews:', reviews);
    console.log('Services:', services);
    console.log('Provider:', provider);
  }, [reviews, services, provider]);

  const providerServiceIds = services
    .filter(service => service.created_by.username === provider.username)
    .map(service => service.id);

  console.log('Provider Service IDs:', providerServiceIds);

  const columns = [
    {
      name: t('Date'),
      selector: row => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
    },
    {
      name: t('User'),
      selector: row => row.created_by,
      sortable: true,
    },
    {
      name: t('Service'),
      selector: row => {
        const service = services.find(service => service.id === row.service);
        return service ? service.name : 'Unknown Service';
      },
      sortable: true,
    },
    {
      name: t('Rate'),
      selector: row => row.rate_star,
      sortable: true,
    },
    {
      name: t('Commend'),
      selector: row => row.comment,
      sortable: true,
    },
  ];

  const filteredReviews = reviews
    .filter(review => providerServiceIds.includes(review.service))
    .filter(review => review.created_by.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(review => selectedService ? review.service.toString() === selectedService : true);

  if (status === 'loading') {
    return <LoadingComponent />;
  }

  if (status === 'failed') {
    return <div>Error: {typeof error === 'object' ? error.detail : error}</div>;
  }

  return (
    <section className="container mx-auto p-4 max-w-full lg:max-w-[1000px] overflow-x-hidden">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-4">{t('Reviews')}</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <input
            type="text"
            placeholder={t('Search')}
            className="border p-2 rounded flex-grow dark:text-gray-300 dark:bg-slate-800"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
    
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-300">{t('List_Reviews')}</h3>
        {filteredReviews.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredReviews}
            pagination
            highlightOnHover
            responsive
            className="w-full dark:bg-gray-900"
            noHeader
          />
        ) : (
          <p>{t('No_data_to_display')}</p>
        )}
      </div>
    </section>
  );
};

export default ProviderReview;
