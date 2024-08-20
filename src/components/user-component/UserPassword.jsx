import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const UserPassword = () => {
  const { t } = useTranslation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required(t('Required')),
    newPassword: Yup.string()
      .required(t('Required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], (t('Pw_must_match')))
      .required(t('Required')),
  });

  return (
    <div className="flex items-center justify-center w-full px-4">
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-300">{t('Change_Pw')}</h2>

            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="currentPassword">
                {t('Current_Pw')}
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  id="currentPassword"
                  className="w-full pl-10 pr-10 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-900"
                />
                <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="newPassword">
                {t('New_Pw')}
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  id="newPassword"
                  className="w-full pl-10 pr-10 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-900"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="mb-6 relative">
              <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="confirmPassword">
                {t('Cf_Password')}
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full pl-10 pr-10 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-900"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-Secondary text-white py-2 px-4 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring"
            >
              {t('Update')}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserPassword;
