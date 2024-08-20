import React, { useEffect, useState } from 'react';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaCalendar } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../lib/secureLocalStorage';
import { selectUploadStatus, uploadImage } from '../../redux/feature/service/providerServiceSlice';
import { fetchProfile, fetchUpdateUser, selectUser } from '../../redux/feature/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const uploadStatus = useSelector(selectUploadStatus);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const token = getAccessToken(); // Retrieve access token from secure local storage
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile(accessToken));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (user && user.avatar) {
      setSelectedImage(user.avatar);
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Dispatch uploadImage action
      dispatch(uploadImage(file))
        .then((result) => {
          if (uploadImage.fulfilled.match(result)) {
            setSelectedImage(result.payload); // Update selectedImage with the uploaded image URL
          } else {
            console.error('Image upload failed:', result.payload || result.error.message);
          }
        })
        .catch((error) => {
          console.error('Image upload errors:', error);
        });
    }
  };

  const initialValues = {
    first_name: user ? user.first_name : '',
    last_name: user ? user.last_name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    dob: user ? user.dob : '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required(t('Required')),
    last_name: Yup.string().required(t('Required')),
    email: Yup.string().email(t('Invalid_email')).required(t('Required')),
    phone: Yup.string().required(t('Required')),
    dob: Yup.date().required(t('Required')),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const userData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      dob: values.dob,
      avatar: selectedImage, // Use the uploaded image URL
    };

    dispatch(fetchUpdateUser({ token: accessToken, userData }))
      .then(() => {
        // Fetch updated profile after successful update
        dispatch(fetchProfile(accessToken));
        toast.success((t('Updated_success')),{
          autoClose: 2000
        });
        setSubmitting(false);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        toast.error('Failed to update profile. Please try again.',{
          autoClose: 2000
        });
        setSubmitting(false);
      });
  };

  return (
    <div className='flex items-center justify-center p-4'>
      <ToastContainer />
      <div className='bg-white p-6 w-full max-w-lg dark:bg-gray-800 rounded-lg'>
        <h2 className='text-center text-2xl font-bold mb-6 dark:text-gray-300'>{t('Profile_Setting')}</h2>
        <div className='flex flex-col items-center mb-6'>
          <div className='relative w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer'>
            {selectedImage ? (
              <img src={selectedImage} alt="Profile" className='w-24 h-24 rounded-full object-cover' />
            ) : (
              <FaCamera className='text-gray-600 text-3xl' />
            )}
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 opacity-0 cursor-pointer'
              onChange={handleImageChange}
            />
          </div>
          <span className='text-center text-gray-700 mt-2 dark:text-gray-300'>{t('Add_Photo')}</span>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                <div className='relative flex-1'>
                  <label className='block text-gray-700 dark:text-gray-300'>{t('First_Name')}</label>
                  <FaUser className='absolute left-3 top-9 text-gray-400' />
                  <Field type='text' name='first_name' className='w-full pl-10 pr-3 py-2 border dark:bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  <ErrorMessage name='first_name' component='div' className='text-red-500 text-sm' />
                </div>
                <div className='relative flex-1'>
                  <label className='block text-gray-700 dark:text-gray-300'>{t('Last_Name')}</label>
                  <FaUser className='absolute left-3 top-9 text-gray-400' />
                  <Field type='text' name='last_name' className='w-full pl-10 pr-3 py-2 border dark:bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  <ErrorMessage name='last_name' component='div' className='text-red-500 text-sm' />
                </div>
              </div>
              <div className='relative'>
                <label className='block text-gray-700 dark:text-gray-300'>{t('Email')}</label>
                <FaEnvelope className='absolute left-3 top-9 text-gray-400' />
                <Field type='email' name='email' className='w-full pl-10 pr-3 py-2 border dark:bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <ErrorMessage name='email' component='div' className='text-red-500 text-sm' />
              </div>
              <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                <div className='relative flex-1'>
                  <label className='block text-gray-700 dark:text-gray-300'>{t('Phone')}</label>
                  <FaPhone className='absolute left-3 top-9 text-gray-400' />
                  <Field type='text' name='phone' className='w-full pl-10 pr-3 py-2 border dark:bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  <ErrorMessage name='phone' component='div' className='text-red-500 text-sm' />
                </div>
                <div className='relative flex-1'>
                  <label className='block text-gray-700 dark:text-gray-300'>{t('Date_of_Birth')}</label>
                  <FaCalendar className='absolute left-3 top-9 text-gray-400' />
                  <Field type='date' name='dob' className='w-full pl-10 pr-3 py-2 border dark:bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  <ErrorMessage name='dob' component='div' className='text-red-500 text-sm' />
                </div>
              </div>
              <div className='text-center'>
                <button type='submit' className='bg-Secondary text-white px-4 py-2 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-500' disabled={isSubmitting}>
                  {t('Save')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileSetting;
