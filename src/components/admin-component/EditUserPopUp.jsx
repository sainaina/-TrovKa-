import React from 'react';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const EditUserPopup = ({ user, onClose, onSave }) => {
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

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            contact: user.contact,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave({ ...user, ...values });
        },
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <Formik
                    initialValues={formik.initialValues}
                    validationSchema={validationSchema}
                    onSubmit={formik.handleSubmit}
                >
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
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default EditUserPopup;
