import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const CustomDataTable = styled(DataTable)`
  .rdt_Pagination select {
    display: none;
  }
  .rdt_TableCol {
    word-break: break-word;
  }
`;

const ProviderFavoriteCom = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [services, setServices] = useState([
    {
      id: 1,
      provider: 'Provider 1',
      name: 'Car repair',
      category: 'Auto Service',
      subCategory: 'Car repair',
    },
    {
      id: 2,
      provider: 'Provider 2',
      name: 'Steam Car Wash',
      category: 'Auto Service',
      subCategory: 'Car Wash',
    },
    {
      id: 3,
      provider: 'Provider 3',
      name: 'Steam Car Wash',
      category: 'Auto Service',
      subCategory: 'Car Wash',
    },
  ]);

  const [filteredServices, setFilteredServices] = useState(services);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDeleteClick = (service) => {
    setServices(services.filter(s => s.id !== service.id));
    setFilteredServices(filteredServices.filter(s => s.id !== service.id));
  };

  const columns = [
    {
      name: t('Providers'),
      selector: row => row.provider,
      sortable: true,
    },
    {
      name: t('Service'),
      selector: row => row.name,
      sortable: true,
    },
    {
      name: t('Category'),
      selector: row => row.category,
      sortable: true,
    },
    {
      name: t('Sub_Category'),
      selector: row => row.subCategory,
      sortable: true,
    },
    {
      name: t('Action'),
      cell: row => (
        <FaTrash 
          className="text-red-500 inline mx-2 cursor-pointer" 
          onClick={() => handleDeleteClick(row)} 
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <section className="container mx-auto p-4 max-w-full lg:max-w-[1000px]">
      <h2 className="text-2xl font-bold mb-4">{t('My_Favorite')}</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
          <input
            type="text"
            placeholder={t('Search')}
            className="border p-2 rounded dark:bg-gray-800 w-full md:w-auto"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 dark:bg-gray-800 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">{t('List_Favorite')}</h3>
        {filteredServices.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>{t('No_data_to_display')}</p>
          </div>
        ) : (
          <CustomDataTable
            columns={columns}
            data={filteredServices}
            pagination
            highlightOnHover
            className="w-full"
          />
        )}
      </div>
    </section>
  );
};

export default ProviderFavoriteCom;
