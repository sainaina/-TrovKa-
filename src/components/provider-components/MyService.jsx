import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  selectCategories,
  selectCategoryTypes,
  fetchCategories,
  fetchCategoryTypes
} from '../../redux/feature/category/cateSlice';
import {
  selectServices,
  selectServicesError,
  selectServicesStatus,
  fetchProviderServices,
  deleteService
} from '../../redux/feature/service/providerServiceSlice';
import LoadingComponent from '../common/LoadingComponent';
import ConfirmDelete from './ConfirmDelete';

const CustomDataTable = styled(DataTable)`
  .rdt_Pagination select {
    display: none;
  }
`;

const MyService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const categoryTypes = useSelector(selectCategoryTypes);
  const categories = useSelector(selectCategories);
  const servicesStatus = useSelector(selectServicesStatus);
  const servicesError = useSelector(selectServicesError);
  const { t } = useTranslation();

  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProviderServices());
    dispatch(fetchCategories());
    dispatch(fetchCategoryTypes());
  }, [dispatch]);
  

  useEffect(() => {
    handleSearch();
  }, [searchQuery, services]);

  const handleAddService = () => {
    navigate('/add-service');
  };

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = services.filter(service =>
        Object.values(service).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  };

  const toggleStatus = (id) => {
    const updatedServices = services.map(service =>
      service.id === id ? { ...service, status: !service.status } : service
    );
    setFilteredServices(updatedServices.filter(service =>
      Object.values(service).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    ));
  };
  // Function to get category type name by ID
  const getCategoryTypeName = (categoryTypeId) => {
    const categoryType = categoryTypes.find(type => type.id === categoryTypeId);
    return categoryType ? categoryType.name : '';
  };


  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteService(serviceToDelete.id)).then(() => {
      setFilteredServices(filteredServices.filter(service => service.id !== serviceToDelete.id));
      setShowModal(false);
      setServiceToDelete(null);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setServiceToDelete(null);
  };


  const columns = [
    {
      name: t('Service'),
      selector: row => row?.name,
      sortable: true,
    },
    {
      name: t('Category'),
      selector: row => getCategoryTypeName(row.category?.category_type),
      sortable: true,
      width: '150px',
    },
    {
      name: t('Sub_Category'),
      selector: row => row.category?.category_name,
      sortable: true,
      width: '150px',
    },
    {
      name: t('Price'),
      selector: row => `$${row?.price}`,  
      sortable: true,
      width: '110px',
    },
    {
      name: t('Created_By'),
      selector: row => row.created_by?.username,
      sortable: true,
      width: '120px',
    },
    {
      name: t('Created_At'),
      selector: row => new Date(row?.created_at).toLocaleDateString(),
      sortable: true,
      width: '120px',
    },
    {
      // name: t('Status'),
      // cell: row => (
      //   <label className="switch small-switch">
      //     <input
      //       type="checkbox"
      //       checked={row.status}
      //       onChange={() => toggleStatus(row.id)}
      //     />
      //     <span className="slider round small-slider"></span>
      //   </label>
      // ),
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '50px',
    },
    {
      name: t('Action'),
      cell: row => (
        <>
          <FaEdit
            className="text-blue-500 inline mx-2 cursor-pointer"
            onClick={() => navigate(`/service/update/${row.id}`)} // Navigate to the edit service page
          />
          <FaTrash
            className="text-red-500 inline mx-2 cursor-pointer"
            onClick={() => handleDeleteClick(row)}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (servicesStatus === 'loading') {
    return <LoadingComponent />;
  }

  if (servicesStatus === 'failed') {
    // Ensure 'servicesError' is a string
    return <div>Error: {typeof servicesError === 'object' ? servicesError.detail : servicesError}</div>;
  }

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">{t('My_Service')}</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <input
            type="text"
            placeholder={t('Search')}
            className="border p-2 rounded flex-grow dark:bg-gray-900"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleAddService}
            className="bg-Primary text-white px-4 py-2 rounded-lg"
          >
            {t("Add_Service")} +
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-300">{t('List_Service')}</h3>
        {filteredServices.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>{t('No_data_to_display')}</p>
          </div>
        ) : (
          <CustomDataTable
            columns={columns}
            data={filteredServices}
            pagination
            responsive
            className="w-full dark:bg-gray-900"
          />
        )}
      </div>
      <ConfirmDelete 
        show={showModal} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmDelete} 
      />
    </section>
  );
};

export default MyService;
