import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaMapMarkerAlt, FaClock, FaRegImage, FaTag, FaInfoCircle, FaRegEdit, FaCalendarAlt, FaPlus, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchCategoryTypes, selectCategories, selectCategoryTypes } from '../../redux/feature/category/cateSlice';
import { fetchLocations, selectLocations } from '../../redux/feature/location/locationSlice';
import LocationModal from '../../components/modal/LocationModal';
import { postService, uploadImage, selectUploadStatus, selectUploadedImageUrl } from '../../redux/feature/service/providerServiceSlice';
import { Metadata } from '../../lib/Metadata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function AddServicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryTypes = useSelector(selectCategoryTypes);
  const categories = useSelector(selectCategories);
  const locations = useSelector(selectLocations);
  const uploadStatus = useSelector(selectUploadStatus);
  const uploadedImageUrl = useSelector(selectUploadedImageUrl);
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
  }, [dispatch]);

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
    if (!formData.serviceName) newErrors.serviceName = (t('Required'));
    if (!formData.servicePrice) newErrors.servicePrice = (t('Required'));
    if (!formData.location) newErrors.location = (t('Required'));
    if (!formData.category) newErrors.category = (t('Required'));
    if (!formData.subCategory) newErrors.subCategory = (t('Required'));
    if (!formData.startDay) newErrors.startDay = (t('Required'));
    if (!formData.endDay) newErrors.endDay = (t('Required'));
    if (!formData.startTime) newErrors.startTime = (t('Required'));
    if (!formData.endTime) newErrors.endTime = (t('Required'));
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const working_days = `${formData.startDay}-${formData.endDay}`;
  
    try {
      let imageUrl = null;
      if (formData.serviceImage) {
        const resultAction = await dispatch(uploadImage(formData.serviceImage));
        if (uploadImage.fulfilled.match(resultAction)) {
          imageUrl = resultAction.payload;
        } else {
          throw new Error(resultAction.payload || t('Failed to upload image'));
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
        // created_by: 'user_id_here', // Replace with the actual user ID if necessary
      };
  
      const resultAction = await dispatch(postService(serviceData));
      
      if (postService.fulfilled.match(resultAction)) {
        toast.success(t('Service_added_successfully'), { autoClose: 2000 });
  
        setTimeout(() => {
          navigate('/my-service');
        }, 2000);
  
        setFormData({
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
        setImagePreview(null);
      } else {
        const errorMessage = resultAction.payload || t('Failed to add service');
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Failed to add service:', error.message);
      toast.error(t('Failed to add service'), { autoClose: 2000 });
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go to the previous page
  };

  const filteredEndDays = weekdays.slice(weekdays.indexOf(formData.startDay) + 1);

  const openLocationModal = () => {
    setLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setLocationModalOpen(false);
  };

  return (
    <div>
      <div>
        <Metadata
          title="Add Service | TrovKa"
          description="Welcome to Service-TrovKa"
          author="SainaIna"
          keywords="services, trovka, home"
          thumbnail="./src/assets/logo/Trovka-icon.png"
        />
      </div>

      
      <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg mb-20 bg-white dark:bg-gray-800">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-300">{t('Add_Service')}</h2>

          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-gray-300">{t('Service_Name')}</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaRegEdit className="mr-2 text-gray-400" />
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className="w-full border-none outline-none dark:bg-gray-800"
              />
            </div>
            {errors.serviceName && <p className="text-red-500 text-sm">{errors.serviceName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('Service_Price')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaDollarSign className="mr-2 text-gray-400" />
                <input
                  type="text"
                  name="servicePrice"
                  value={formData.servicePrice}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                />
              </div>
              {errors.servicePrice && <p className="text-red-500 text-sm">{errors.servicePrice}</p>}
            </div>


            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('Location')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                >
                  <option value="">{t('Select')}</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {`${location.province}, ${location.district}, ${location.commune}, ${location.village}, ${location.postal_code}`}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={openLocationModal} className="ml-2 px-3 py-2 bg-Primary text-white rounded">
                  <FaPlus />
                </button>
              </div>
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('Category')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaTag className="mr-2 text-gray-400" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                >
                  <option value="">{t('Select')}</option>
                  {categoryTypes.map((categoryType) => (
                    <option key={categoryType.id} value={categoryType.id}>
                      {categoryType.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('Sub_Category')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaTag className="mr-2 text-gray-400" />
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                >
                  <option value="">{t('Select')}</option>
                  {filteredSubCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.category_name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-gray-300">{t('Description')}</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaInfoCircle className="mr-2 text-gray-400" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border-none outline-none dark:bg-gray-800"
              ></textarea>
            </div>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>


          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-gray-300">{t('Service_Image')}</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaRegImage className="mr-2 text-gray-400" />
              <input
                type="file"
                name="serviceImage"
                onChange={handleChange}
                className="w-full border-none outline-none dark:bg-gray-800"
              />
            </div>
            {errors.serviceImage && <p className="text-red-500 text-sm">{errors.serviceImage}</p>}
          </div>

          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Service Preview" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('Start_Day')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                <select
                  name="startDay"
                  value={formData.startDay}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                >
                  <option value="">{t('Select')}</option>
                  {weekdays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              {errors.startDay && <p className="text-red-500 text-sm">{errors.startDay}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('End_Day')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                <select
                  name="endDay"
                  value={formData.endDay}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                >
                  <option value="">{t('Select')}</option>
                  {filteredEndDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              {errors.endDay && <p className="text-red-500 text-sm">{errors.endDay}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('Start_Time')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaClock className="mr-2 text-gray-400" />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                />
              </div>
              {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
            </div>


            <div>
              <label className="block mb-2 font-medium dark:text-gray-300">{t('End_Time')}</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaClock className="mr-2 text-gray-400" />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full border-none outline-none dark:bg-gray-800"
                />
              </div>
              {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white rounded">
              {t('Cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-Primary text-white rounded">
              {t('Add_Service')}
            </button>
          </div>
        </form>
      </div>

      <LocationModal isOpen={isLocationModalOpen} onClose={closeLocationModal} />
    </div>
  );
}

export default AddServicePage;
