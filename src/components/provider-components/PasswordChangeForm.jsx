import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const UserPasswordChange = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(t('Required')),
    newPassword: Yup.string().required(t('Required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t('Pw_must_match'))
      .required(t('Required')),
  });

  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log('Form values:', values);
  };

  return (
    <div className="flex items-center w-[800px] justify-center">
      <div className="p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-950 dark:text-gray-300 text-center">{t('Change_Pw')}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2 dark:text-gray-300" htmlFor="currentPassword">
                  {t('Current_Pw')}
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <Field
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
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
                    id="newPassword"
                    name="newPassword"
                    className="w-full pl-10 pr-10 py-2 border dark:bg-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
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
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full pl-10 pr-10 py-2 border dark:bg-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
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
                disabled={isSubmitting}
              >
                {t('Save')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserPasswordChange;
