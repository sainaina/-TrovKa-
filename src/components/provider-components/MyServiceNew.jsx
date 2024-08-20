import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import ConfirmDeleteModal from './ConfirmDelete';
import EditServiceForm from './EditServiceForm'; 
import { useTranslation } from 'react-i18next';

const CustomDataTable = styled(DataTable)`
  .rdt_Pagination select {
    display: none;
  }
`;

const MyServiceNew = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Car repair',
      category: 'Auto Service',
      subCategory: 'Car repair',
      price: '$15',
      createdBy: 'Pu Chhveng',
      date: '7 July, 2024',
      status: true,
    },
    {
      id: 2,
      name: 'Steam Car Wash',
      category: 'Auto Service',
      subCategory: 'Car Wash',
      price: '$5',
      createdBy: 'Pu Chhveng',
      date: '7 July, 2024',
      status: true,
    },
    {
      id: 3,
      name: 'Steam Car Wash',
      category: 'Auto Service',
      subCategory: 'Car Wash',
      price: '$10',
      createdBy: 'Pu Chhveng',
      date: '7 July, 2024',
      status: true,
    },
  ]);

  const [filteredServices, setFilteredServices] = useState(services);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [serviceToEdit, setServiceToEdit] = useState(null);  // Add state for the service to edit
  const [isEditing, setIsEditing] = useState(false);  // Add state to toggle edit form

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

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const toggleStatus = (id) => {
    const updatedServices = services.map(service =>
      service.id === id ? { ...service, status: !service.status } : service
    );
    setServices(updatedServices);
    setFilteredServices(updatedServices.filter(service =>
      Object.values(service).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    ));
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setServices(services.filter(service => service.id !== serviceToDelete.id));
    setFilteredServices(filteredServices.filter(service => service.id !== serviceToDelete.id));
    setShowModal(false);
    setServiceToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setServiceToDelete(null);
  };

  const handleEditClick = (service) => {
    setServiceToEdit(service);
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedService) => {
    const updatedServices = services.map(service =>
      service.id === updatedService.id ? updatedService : service
    );
    setServices(updatedServices);
    setFilteredServices(updatedServices.filter(service =>
      Object.values(service).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    ));
    setIsEditing(false);
    setServiceToEdit(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setServiceToEdit(null);
  };

  const columns = [
    {
      name: 'Service',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Sub Category',
      selector: row => row.subCategory,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Create By',
      selector: row => row.createdBy,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Status',
      cell: row => (
        <label className="switch small-switch">
          <input
            type="checkbox"
            checked={row.status}
            onChange={() => toggleStatus(row.id)}
          />
          <span className="slider round small-slider"></span>
        </label>
      ),
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '50px',
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <FaEdit 
            className="text-blue-500 inline mx-2 cursor-pointer"
            onClick={() => handleEditClick(row)}  // Add onClick handler for edit
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

  return (
    <section className="container mx-auto p-4 w-[1000px]">
      <h2 className="text-2xl font-bold mb-4">{t('My_Service')}</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddService}
          className="bg-Primary text-white px-4 py-2 rounded-lg"
        >
          Add service +
        </button>
      </div>
      {isEditing && serviceToEdit ? (
        <EditServiceForm
          service={serviceToEdit}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">List Services</h3>
          <CustomDataTable
            columns={columns}
            data={filteredServices}
            pagination
            highlightOnHover
            className="min-w-full bg-white"
          />
        </div>
      )}
      <ConfirmDeleteModal 
        show={showModal} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmDelete} 
      />
    </section>
  );
};

export default MyServiceNew;
