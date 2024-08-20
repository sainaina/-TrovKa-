import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const AddUserPopup = ({ onClose, onSave }) => {
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        contact: Yup.string()
            .required('Contact is required')
            .matches(/^[0-9]+$/, 'Contact must be a number')
            .min(8, 'Contact must be at least 8 digits'),
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add User</h2>
                <Formik
                    initialValues={{ name: '', email: '', contact: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        onSave(values)
                            .then(() => {
                                setIsSuccess(true);
                                setMessage('User added successfully!');
                                resetForm();
                            })
                            .catch(() => {
                                setIsSuccess(false);
                                setMessage('Failed to add user. Please try again.');
                            });
                    }}
                >
                    {() => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <div className="relative">
                                    <Field
                                        name="name"
                                        type="text"
                                        className="w-full px-10 py-2 border rounded"
                                    />
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <div className="relative">
                                    <Field
                                        name="email"
                                        type="email"
                                        className="w-full px-10 py-2 border rounded"
                                    />
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Contact</label>
                                <div className="relative">
                                    <Field
                                        name="contact"
                                        type="text"
                                        className="w-full px-10 py-2 border rounded"
                                    />
                                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mr-4 bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-Primary text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                            {message && (
                                <div
                                    className={`mt-4 text-center ${
                                        isSuccess ? 'text-green-500' : 'text-red-500'
                                    }`}
                                >
                                    {message}
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddUserPopup;
