import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaMapMarkerAlt, FaClock, FaRegImage, FaCalendarAlt, FaTag, FaInfoCircle, FaRegEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { Metadata } from "../../lib/Metadata";

const EditService = ({ services, setServices }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        serviceName: '',
        servicePrice: '',
        province: '',
        district: '',
        village: '',
        commune: '',
        postalCode: '',
        category_id: '',
        subCategory: '',
        description: '',
        serviceImage: null,
        startDay: '',
        endDay: '',
        startTime: '',
        endTime: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (id) {
            const service = services.find(service => service.id === parseInt(id));
            if (service) {
                setFormData({
                    ...service,
                    serviceImage: null, // Reset the image for editing
                });

                if (service.serviceImage && typeof service.serviceImage === 'string') {
                    setImagePreview(service.serviceImage); // If the image is a URL, set the preview
                }
            } else {
                navigate('/not-found');
            }
        }
    }, [id, services, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData({
                ...formData,
                serviceImage: file
            });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedService = {
            ...formData,
            serviceImage: formData.serviceImage instanceof File ? formData.serviceImage : services.find(service => service.id === parseInt(id)).serviceImage
        };

        if (id) {
            const updatedServices = services.map(service =>
                service.id === parseInt(id) ? updatedService : service
            );
            setServices(updatedServices);
        } else {
            const newService = {
                ...updatedService,
                id: services.length + 1
            };
            setServices([...services, newService]);
        }
        navigate('/my-services');
    };

    return (
        <div>
            <Metadata
                title="Edit Service | TrovKa"
                description="Welcome to Service-TrovKa"
                author="SainaIna"
                keywords="services, trovka, home"
                thumbnail="./src/assets/logo/Trovka-icon.png"
            />
            <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4 text-center">{id ? 'Edit Service' : 'Add Service'}</h2>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Service Name</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaRegEdit className="mr-2 text-gray-400" />
                            <input
                                type="text"
                                name="serviceName"
                                value={formData.serviceName}
                                onChange={handleChange}
                                className="w-full border-none outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-2 font-medium">Service Price</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaDollarSign className="mr-2 text-gray-400" />
                                <input
                                    type="text"
                                    name="servicePrice"
                                    value={formData.servicePrice}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Province</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                <input
                                    type="text"
                                    name="province"
                                    value={formData.province}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">District</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Village</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                <input
                                    type="text"
                                    name="village"
                                    value={formData.village}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Commune</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                <input
                                    type="text"
                                    name="commune"
                                    value={formData.commune}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Postal Code</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Category</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaTag className="mr-2 text-gray-400" />
                            <select
                                name="category"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full border-none outline-none"
                            >
                                <option value="">Select category</option>
                                <option value="Auto Service">Auto Service</option>
                                <option value="Education">Education</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Home Service">Home Service</option>
                                <option value="Restaurant">Restaurant</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Sub Category</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaTag className="mr-2 text-gray-400" />
                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleChange}
                                className="w-full border-none outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Description</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaInfoCircle className="mr-2 text-gray-400" />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border-none outline-none h-24"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Service Image</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaRegImage className="mr-2 text-gray-400" />
                            <input
                                type="file"
                                name="serviceImage"
                                onChange={handleChange}
                                className="w-full border-none outline-none"
                            />
                        </div>
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Service preview" className="w-full h-64 object-cover rounded-lg" />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-2 font-medium">Start Day</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaCalendarAlt className="mr-2 text-gray-400" />
                                <select
                                    name="startDay"
                                    value={formData.startDay}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                >
                                    <option value="">Select start day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">End Day</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaCalendarAlt className="mr-2 text-gray-400" />
                                <select
                                    name="endDay"
                                    value={formData.endDay}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                >
                                    <option value="">Select end day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Start Time</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaClock className="mr-2 text-gray-400" />
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">End Time</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaClock className="mr-2 text-gray-400" />
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    className="w-full border-none outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded flex items-center">
                            <FaCheck className="mr-2" /> Submit
                        </button>
                        <button type="button" onClick={() => navigate('/my-services')} className="px-4 py-2 bg-gray-500 text-white rounded flex items-center">
                            <FaTimes className="mr-2" /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditService;
