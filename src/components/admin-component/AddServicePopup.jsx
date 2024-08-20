import React, { useState } from 'react';

const AddServicePopup = ({ onClose, onSave }) => {
    const [service, setService] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState(true);

    const handleSave = () => {
        const newService = {
            id: Date.now(),
            service,
            category,
            subCategory,
            price,
            createBy: 'Current User', // Replace with the actual current user
            date: new Date().toLocaleDateString(),
            status,
        };
        onSave(newService);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Service</h2>
                <div className="mb-4">
                    <label className="block mb-2">Service</label>
                    <input
                        type="text"
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Sub Category</label>
                    <input
                        type="text"
                        value={subCategory}
                        onChange={e => setSubCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label className="block mb-2">Status</label>
                    <input
                        type="checkbox"
                        checked={status}
                        onChange={e => setStatus(e.target.checked)}
                        className="ml-2"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddServicePopup;
