import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaMapMarkerAlt, FaClock, FaRegImage, FaTag, FaInfoCircle, FaRegEdit, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchCategoryTypes, selectCategories, selectCategoryTypes } from '../../redux/feature/category/cateSlice';
import { fetchLocations, selectLocations } from '../../redux/feature/location/locationSlice';
import { fetchProviderServices, updateService, uploadImage, selectServices } from '../../redux/feature/service/providerServiceSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function UpdateServicePage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const categoryTypes = useSelector(selectCategoryTypes);
  const categories = useSelector(selectCategories);
  const locations = useSelector(selectLocations);
  const { t } = useTranslation();

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [formData, setFormData] = useState({
    serviceName: '',
    servicePrice: '',
    location: '',
    category: '',
    subCategory: '',
    description: '',
    serviceImage: null,
    startDay: '',
    endDay: '',
    startTime: '',
    endTime: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchCategoryTypes());
    dispatch(fetchCategories());
    dispatch(fetchLocations());
    dispatch(fetchProviderServices());
  }, [dispatch]);

  useEffect(() => {
    const service = services.find(service => service.id === parseInt(serviceId));
    if (service) {
      setFormData({
        serviceName: service.name,
        servicePrice: service.price,
        location: service.location.id,
        category: service.category.category_type,
        subCategory: service.category.id,
        description: service.description,
        serviceImage: service.image,
        startDay: service.working_days.split('-')[0],
        endDay: service.working_days.split('-')[1],
        startTime: service.start_time,
        endTime: service.end_time
      });
      setImagePreview(service.image);
    }
  }, [services, serviceId]);

  useEffect(() => {
    if (formData.category) {
      const filtered = categories.filter(cat => cat.category_type === parseInt(formData.category));
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.category, categories]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.serviceName) newErrors.serviceName = 'Service name is required';
    if (!formData.servicePrice) newErrors.servicePrice = 'Service price is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.subCategory) newErrors.subCategory = 'Sub-category is required';
    if (!formData.startDay) newErrors.startDay = 'Start day is required';
    if (!formData.endDay) newErrors.endDay = 'End day is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const working_days = `${formData.startDay}-${formData.endDay}`;

    console.log('Form Data:', formData); // Added console log to inspect form data

    try {
      let imageUrl = formData.serviceImage;
      if (formData.serviceImage && typeof formData.serviceImage !== 'string') {
        const resultAction = await dispatch(uploadImage(formData.serviceImage));
        if (uploadImage.fulfilled.match(resultAction)) {
          imageUrl = resultAction.payload;
        } else {
          throw new Error(resultAction.payload || 'Failed to upload image');
        }
      }

      const serviceData = {
        name: formData.serviceName,
        price: formData.servicePrice,
        description: formData.description,
        category_id: formData.subCategory,
        category_type: formData.category,
        working_days,
        start_time: formData.startTime,
        end_time: formData.endTime,
        location_id: formData.location,
        image: imageUrl,
      };

      const resultAction = await dispatch(updateService({ serviceId, serviceData }));
      if (updateService.fulfilled.match(resultAction)) {
        setSuccessMessage('Service updated successfully');
        setTimeout(() => navigate('/my-service'), 500); // Redirect after 2 second
      } else {
        throw new Error(resultAction.payload || 'Failed to update service');
      }
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  const handleCancel = () => {
    navigate('/my-service');
  };

  const handleCancelImage = () => {
    setFormData({ ...formData, serviceImage: null });
    setImagePreview(null);
  };


  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-gray-100 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 m-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">{t('Update_Service')}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="serviceName" className="flex items-center">
              <FaRegEdit className="mr-2 text-gray-400" /> {t('Service_Name')}
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.serviceName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.serviceName && <div className="text-red-500 text-sm">{errors.serviceName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="servicePrice" className="flex items-center">
              <FaDollarSign className="mr-2 text-gray-400" /> {t('Service_Price')}
            </label>
            <input
              type="number"
              id="servicePrice"
              name="servicePrice"
              value={formData.servicePrice}
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.servicePrice ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.servicePrice && <div className="text-red-500 text-sm">{errors.servicePrice}</div>}
          </div>
          <div>
            <label className="block mb-2 font-medium">{t('Location')}</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-none dark:bg-gray-900 outline-none"
              >
                <option value="">{t('Select')}</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {`${location.province}, ${location.district}, ${location.commune}, ${location.village}, ${location.postal_code}`}
                  </option>
                ))}
              </select>
            </div>
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="category" className="flex items-center">
              <FaTag className="mr-2 text-gray-400" /> {t('Category')}
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">{t('Select')}</option>
              {categoryTypes.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="subCategory" className="flex items-center">
              <FaInfoCircle className="mr-2 text-gray-400" /> {t('Sub_Category')}
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.subCategory ? 'border-red-500' : 'border-gray-300'}`}
            >

<option value="">{t('Select')}</option>
              {filteredSubCategories.map(subCategory => (
                <option key={subCategory.id} value={subCategory.id}>{subCategory.name}{subCategory.category_name}</option>
              ))}
            </select>
            {errors.subCategory && <div className="text-red-500 text-sm">{errors.subCategory}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description" className="flex items-center">
              <FaInfoCircle className="mr-2 text-gray-400" /> {t('Description')}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="serviceImage" className="flex items-center">
              <FaRegImage className="mr-2 text-gray-400" /> {t('Service_Image')}
            </label>
            <input
              type="file"
              id="serviceImage"
              name="serviceImage"
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.serviceImage ? 'border-red-500' : 'border-gray-300'}`}
            />
            {imagePreview && (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="mt-2 h-48 object-contain" />
                <button type="button" onClick={handleCancelImage} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                  {t('Cancel_Image')}
                </button>
              </div>
            )}
            {errors.serviceImage && <div className="text-red-500 text-sm">{errors.serviceImage}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="startDay" className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-400" /> {t('Start_Day')}
            </label>
            <select
              id="startDay"
              name="startDay"
              value={formData.startDay}
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.startDay ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">{t('Select')}</option>
              {weekdays.map((day, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>
            {errors.startDay && <div className="text-red-500 text-sm">{errors.startDay}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="endDay" className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-400" />  {t('End_Day')}
            </label>
            <select
              id="endDay"
              name="endDay"
              value={formData.endDay}
              onChange={handleChange}
              className={`form-control w-full dark:bg-gray-900 p-2 border rounded ${errors.endDay ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">{t('Select')}</option>
              {weekdays.map((day, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>
            {errors.endDay && <div className="text-red-500 text-sm">{errors.endDay}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="startTime" className="flex items-center">
              <FaClock className="mr-2 text-gray-400" /> {t('Start_Time')}
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"

              value={formData.startTime}
              onChange={handleChange}
              className={`form-control dark:bg-gray-900 w-full p-2 border rounded ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.startTime && <div className="text-red-500 text-sm">{errors.startTime}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="endTime" className="flex items-center">
              <FaClock className="mr-2 text-gray-400" /> {t('End_Time')}
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className={`form-control dark:bg-gray-900 w-full p-2 border rounded ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.endTime && <div className="text-red-500 text-sm">{errors.endTime}</div>}
          </div>
          {errors.form && <div className="text-red-500 text-center mb-4">{errors.form}</div>}
          {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
          <div className="flex justify-center space-x-4">
            <button type="submit" className="bg-Primary text-white px-6 py-2 rounded hover:bg-blue-800 transition duration-200">
              {t('Submit')}
            </button>
            <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-400 transition duration-200">
              {t('Cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
