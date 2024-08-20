import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { RiSearchLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import {
  fetchReviews,
  selectReviews,
  selectReviewsStatus,
} from "../../redux/feature/review/reviewSlice";
import { fetchServices, selectServices } from "../../redux/feature/service/serviceSlice";

export const ManageReviewsComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const reviewsStatus = useSelector(selectReviewsStatus);
  const services = useSelector(selectServices);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (reviewsStatus === "idle") {
      dispatch(fetchReviews());
    }
    dispatch(fetchServices());
  }, [reviewsStatus, dispatch]);

  useEffect(() => {
    const mappedReviews = reviews.map((review) => {
      const service = services.find((service) => service.id === review.service);
      return {
        ...review,
        serviceName: service?.name || "Unknown",
        providerName: service?.created_by.username || "Unknown",
      };
    });

    if (searchQuery === "") {
      setFilteredData(mappedReviews);
    } else {
      setFilteredData(
        mappedReviews.filter(
          (item) =>
            item.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.created_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.created_at.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, reviews, services]);

  const columns = [
    {
      name: (t('Date')),
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      name: (t('Providers')),
      selector: (row) => row.providerName,
      sortable: true,
    },
    { name: (t('User')), selector: (row) => row.created_by, sortable: true },
    { name: (t('Service')), selector: (row) => row.serviceName, sortable: true },
    { name: (t('Rate')), selector: (row) => row.rate_star, sortable: true },
    { name: (t('Commend')), selector: (row) => row.comment, sortable: true },
  ];

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f5f5f5",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('Reviews')} </h2>
      </div>
      <div className="flex justify-between mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder={t('Search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded dark:bg-gray-800"
            aria-label="Search"
          />
          <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <DataTable
        title={<div className="font-semibold">{t('List_Reviews')}</div>}
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        pagination
        paginationPerPage={6}
        paginationRowsPerPageOptions={[6, 12, 24]}
      />
    </div>
  );
};

export default ManageReviewsComponent;
