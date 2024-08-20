import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import { FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import AddServicePopup from "./AddServicePopup";
import EditServicePopup from "./EditServicePopup";
import DeleteServiceConfirmation from "./DeleteServiceConfirmation";
import {
  fetchServices,
  selectServices,
  selectServiceStatus,
} from "../../redux/feature/service/serviceSlice";
import { useTranslation } from "react-i18next";
import { selectCategoryTypes } from "../../redux/feature/category/cateSlice";

const ManageServicesComponent = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isAddServicePopupOpen, setIsAddServicePopupOpen] = useState(false);
  const [isEditServicePopupOpen, setIsEditServicePopupOpen] = useState(false);
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] =
    useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const categoryTypes = useSelector(selectCategoryTypes); 
  const getCategoryTypeName = (categoryTypeId) => {
    const categoryType = categoryTypes.find(type => type.id === categoryTypeId);
    console.log('categoryTypes:', categoryTypes);

    return categoryType ? categoryType.name : 'Unknown';
};

  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const serviceStatus = useSelector(selectServiceStatus);

  useEffect(() => {
    if (serviceStatus === "idle") {
      dispatch(fetchServices());
    }
  }, [serviceStatus, dispatch]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(services);
    } else {
      setFilteredData(
        services.filter(
          (item) =>
            item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subCategory
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.price.includes(searchQuery) ||
            item.createBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.date.includes(searchQuery)
        )
      );
    }
  }, [searchQuery, services]);

  const columns = useMemo(
    () => [
      { name: t("Service"), selector: (row) => row.name, sortable: true },
      { 
        name: t('Category'),
        selector: row => getCategoryTypeName(row.category.category_type), // Map ID to Name
        sortable: true 
    },

      {
        name: t("Sub_Category"),
        selector: (row) => row.category.category_name,
        sortable: true,
      },
      { name: t("Price"), selector: (row) => row.price, sortable: true },
      {
        name: t("Created_By"),
        selector: (row) =>
          row.created_by ? row.created_by.username : "Unknown",
        sortable: true,
      },
      {
        name: t("Date"),
        selector: (row) => new Date(row.created_at).toLocaleDateString(),
        sortable: true,
      },
      {
        // name: "Status",
        // cell: (row) => (
        //   <input
        //     type="checkbox"
        //     checked={row.status}
        //     readOnly
        //     className="toggle-input"
        //   />
        // ),
      },
      {
        name: t("Action"),
        cell: (row) => (
          <div className="flex space-x-2">
            <button
              className="text-blue-500"
              onClick={() => handleEditClick(row)}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDeleteClick(row)}
            >
              <FaTrashAlt />
            </button>
          </div>
        ),
      },
    ],
    []
  );


  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f5f5f5',
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
      },
    },
  };

  const handleEditClick = (service) => {
    setServiceToEdit(service);
    setIsEditServicePopupOpen(true);
  };

  const handleSaveEdit = (editedService) => {
    setFilteredData(
      filteredData.map((service) =>
        service.id === editedService.id ? editedService : service
      )
    );
    setIsEditServicePopupOpen(false);
    setServiceToEdit(null);
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setIsDeleteConfirmationPopupOpen(true);
  };

  const handleDeleteConfirm = () => {
    setFilteredData(
      filteredData.filter((service) => service.id !== serviceToDelete.id)
    );
    setIsDeleteConfirmationPopupOpen(false);
    setServiceToDelete(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("Service")}</h2>
      </div>
      <div className="flex justify-between mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder={t("Search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded dark:bg-gray-800"
          />
          <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          className="bg-Primary text-white  px-4 py-2 rounded flex items-center"
          onClick={() => setIsAddServicePopupOpen(true)}
        >
          <FaPlus className="mr-2" /> {t("Add_Service")}
        </button>
      </div>
      <DataTable
        className=""
        title={<div className="font-semibold">{t("List_Service")}</div>}
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        pagination
      />
      {isAddServicePopupOpen && (
        <AddServicePopup onClose={() => setIsAddServicePopupOpen(false)} />
      )}
      {isEditServicePopupOpen && serviceToEdit && (
        <EditServicePopup
          service={serviceToEdit}
          onClose={() => setIsEditServicePopupOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
      {isDeleteConfirmationPopupOpen && (
        <DeleteServiceConfirmation
          onClose={() => setIsDeleteConfirmationPopupOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ManageServicesComponent;
