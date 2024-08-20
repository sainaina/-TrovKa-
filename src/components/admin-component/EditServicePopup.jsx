import React, { useState, useEffect } from 'react';

const EditServicePopup = ({ service, onClose, onSave }) => {
    const [editedService, setEditedService] = useState({ ...service });

    useEffect(() => {
        setEditedService({ ...service });
    }, [service]);

    const handleSave = () => {
        onSave(editedService);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Edit Service</h2>
                <div className="mb-4">
                    <label className="block mb-2">Service</label>
                    <input
                        type="text"
                        value={editedService.name}
                        onChange={e => setEditedService({ ...editedService, service: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <input
                        type="text"
                        value={editedService.categoryType}
                        onChange={e => setEditedService({ ...editedService, category: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Sub Category</label>
                    <input
                        type="text"
                        value={editedService.category}
                        onChange={e => setEditedService({ ...editedService, subCategory: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Price</label>
                    <input
                        type="text"
                        value={editedService.price}
                        onChange={e => setEditedService({ ...editedService, price: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label className="block mb-2">Status</label>
                    <input
                        type="checkbox"
                        checked={editedService.status}
                        onChange={e => setEditedService({ ...editedService, status: e.target.checked })}
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

export default EditServicePopup;
