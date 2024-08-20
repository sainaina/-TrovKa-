import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { postLocation, fetchLocations } from '../../redux/feature/location/locationSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function LocationModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    commune: '',
    village: '',
    postal_code: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = `${formData.province}, ${formData.district}, ${formData.commune}, ${formData.village}, ${formData.postal_code}`;
    const submissionData = {
      ...formData,
      location: location
    };

    try {
      await dispatch(postLocation(submissionData));
      await dispatch(fetchLocations()); // Fetch locations after adding a new one
      console.log('Location added successfully!');
      toast.success('Location added successfully!', { autoClose: 2000 });
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Failed to add location:', error);
      toast.error('Failed to add location', { autoClose: 2000 });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">{t('Add_Location')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t('Province')}</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t('District')}</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t('Commune')}</label>
            <input
              type="text"
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t('Village')}</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t('Postal_Code')}</label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-900"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="flex justify-center items-center px-4 py-2 mr-2 bg-gray-500 text-white rounded shadow">
              <FaTimes className="mr-2" />
              {t('Cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-Primary flex justify-center items-center text-white rounded shadow">
              <FaCheck className="mr-2" />
              {t('Submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LocationModal;
