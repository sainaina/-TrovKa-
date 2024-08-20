import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RiSearchLine } from "react-icons/ri";
import { FaUserPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import AddProviderPopup from './AddProviderPopup';
import EditProviderPopUp from './EditProviderPopUp';
import DeleteProviderConfirmation from './DeleteProviderConfirmation';
import { useTranslation } from 'react-i18next';

export const ManageProviderComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isAddProviderPopupOpen, setIsAddProviderPopupOpen] = useState(false); 
    const [isEditProviderPopupOpen, setIsEditProviderPopupOpen] = useState(false); 
    const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = useState(false);
    const [providerToEdit, setProviderToEdit] = useState(null); 
    const [providerToDelete, setProviderToDelete] = useState(null); 
    const { t} = useTranslation();

    const data = useMemo(() => [
        { id: 1, name: 'Seam Borin', email: 'seamborin@example.com', contact: '012 13 14 15', createDate: '7 July, 2024', status: true },
        { id: 2, name: 'Sok Lida', email: 'soklida@runte.net', contact: '012 13 14 15', createDate: '7 July, 2024', status: true },
        { id: 3, name: 'Kak Runa', email: 'kakruna@yahoo.com', contact: '012 13 14 15', createDate: '7 July, 2024', status: true },
    ], []);

    const columns = useMemo(() => [
        { name: (t('Name')), selector: row => row.name, sortable: true },
        { name: (t('Email')), selector: row => row.email, sortable: true },
        { name: (t("Contact")), selector: row => row.contact, sortable: true },
        { name: (t('Created_At')), selector: row => row.createDate, sortable: true },
        // {
        //     name: 'Status', cell: row => (
        //         <input type="checkbox" checked={row.status} readOnly className="toggle-input" />
        //     )
        // },
        {
            name: (t('Action')), cell: row => (
                <div className="flex space-x-2">
                    <button className="text-blue-500" onClick={() => handleEditClick(row)}><FaEdit /></button>
                    <button className="text-red-500" onClick={() => handleDeleteClick(row)}><FaTrashAlt /></button>
                </div>
            )
        }
    ], []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredData(data);
        } else {
            setFilteredData(
                data.filter(item =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.contact.includes(searchQuery)
                )
            );
        }
    }, [searchQuery, data]);

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                // backgroundColor: '#f5f5f5',
            },
        },
        headCells: {
            style: {
                fontWeight: 'bold',
            },
        },
    };

    const handleEditClick = (provider) => {
        setProviderToEdit(provider); 
        setIsEditProviderPopupOpen(true); 
    };

    const handleSaveEdit = (editedProvider) => {
        setFilteredData(filteredData.map(provider => provider.id === editedProvider.id ? editedProvider : provider)); 
        setIsEditProviderPopupOpen(false); 
        setProviderToEdit(null); 
    };

    const handleDeleteClick = (provider) => {
        setProviderToDelete(provider); 
        setIsDeleteConfirmationPopupOpen(true);
    };

    const handleDeleteConfirm = () => {
        setFilteredData(filteredData.filter(provider => provider.id !== providerToDelete.id));
        setIsDeleteConfirmationPopupOpen(false);
        setProviderToDelete(null); 
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center  mb-6">
                <h2 className="text-2xl font-bold">{t('Providers')}</h2>
            </div>
            <div className="flex justify-between mb-4">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder={t('Search')}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button
                    className="bg-Primary text-white px-4 py-2 rounded flex items-center"
                    onClick={() => setIsAddProviderPopupOpen(true)} 
                >
                    <FaUserPlus className="mr-2" /> {t('Add_Provider')}
                </button>
            </div>
            <DataTable
                title={<div className="font-semibold ">{t('List_Provider')} </div>}
                columns={columns}
                data={filteredData}
                customStyles={customStyles}
                pagination
            />
            {isAddProviderPopupOpen && <AddProviderPopup onClose={() => setIsAddProviderPopupOpen(false)} />} 
            {isEditProviderPopupOpen && providerToEdit && ( 
                <EditProviderPopUp
                    provider={providerToEdit} 
                    onClose={() => setIsEditProviderPopupOpen(false)} 
                    onSave={handleSaveEdit}
                />
            )}
            {isDeleteConfirmationPopupOpen && (
                <DeleteProviderConfirmation
                    onClose={() => setIsDeleteConfirmationPopupOpen(false)}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default ManageProviderComponent;
