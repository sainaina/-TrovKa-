import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RiSearchLine } from "react-icons/ri";
import { FaUserPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import AddUserPopup from './AddUserPopup';
import DeleteConfirmationPopup from './DeleteUserConfirmation';
import EditUserPopUp from './EditUserPopUp';
import { useTranslation } from 'react-i18next';

export const ManageUserComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false);
    const [isEditUserPopupOpen, setIsEditUserPopupOpen] = useState(false);
    const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const { t } = useTranslation();

    const data = useMemo(() => [
        { id: 1, name: 'Seam Borin', email: 'seamborin@example.com', contact: '012 13 14 15', createDate: '7 July, 2024', status: true },
        { id: 2, name: 'Sok Lida', email: 'soklida@runte.net', contact: '012 13 14 15', createDate: '7 July, 2024', status: true },
        { id: 3, name: 'Kak Runa', email: 'kakruna@yahoo.com', contact: '012 13 14 15', createDate: '7 July, 2024', status: true },
    ], []);

    const columns = useMemo(() => [
        { name: t('Name'), selector: row => row.name, sortable: true },
        { name: t('Email'), selector: row => row.email, sortable: true },
        { name: t('Contact'), selector: row => row.contact, sortable: true },
        { name: t('Created_At'), selector: row => row.createDate, sortable: true },
        // {
        //     name: 'Status', cell: row => (
        //         <input type="checkbox" checked={row.status} readOnly className="toggle-input" />
        //     )
        // },
        {
            name: t('Action'), cell: row => (
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

    const handleEditClick = (user) => {
        setUserToEdit(user);
        setIsEditUserPopupOpen(true);
    };

    const handleSaveEdit = (editedUser) => {
        setFilteredData(filteredData.map(user => user.id === editedUser.id ? editedUser : user));
        setIsEditUserPopupOpen(false);
        setUserToEdit(null);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteConfirmationPopupOpen(true);
    };

    const handleDeleteConfirm = () => {
        setFilteredData(filteredData.filter(user => user.id !== userToDelete.id));
        setIsDeleteConfirmationPopupOpen(false);
        setUserToDelete(null);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t('User')}</h2>
            </div>
            <div className="flex justify-between mb-4">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder={t('Search')}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded"
                    />
                    <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button
                    className="bg-Primary text-white px-4 py-2 rounded flex items-center"
                    onClick={() => setIsAddUserPopupOpen(true)}
                >
                    <FaUserPlus className="mr-2" /> {t('Add_User')}
                </button>
            </div>
            <DataTable
                title={<div className="font-semibold">{t('List_User')}</div>}
                columns={columns}
                data={filteredData}
                customStyles={customStyles}
                pagination
            />
            {isAddUserPopupOpen && <AddUserPopup onClose={() => setIsAddUserPopupOpen(false)} />}
            {isEditUserPopupOpen && userToEdit && (
                <EditUserPopUp
                    user={userToEdit}
                    onClose={() => setIsEditUserPopupOpen(false)}
                    onSave={handleSaveEdit}
                />
            )}
            {isDeleteConfirmationPopupOpen && (
                <DeleteConfirmationPopup
                    onClose={() => setIsDeleteConfirmationPopupOpen(false)}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default ManageUserComponent;
