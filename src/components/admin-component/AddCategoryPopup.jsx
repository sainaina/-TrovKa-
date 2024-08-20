import React, { useState } from 'react';

const AddCategoryPopup = ({ onClose, onSave }) => {
    const [newCategory, setNewCategory] = useState({
        category: '',
        subCategory: '',
        date: new Date().toLocaleDateString(),
        status: true
    });

    const handleSave = () => {
        onSave(newCategory);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Category</h2>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <input
                        type="text"
                        value={newCategory.category}
                        onChange={e => setNewCategory({ ...newCategory, category: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Sub Category</label>
                    <input
                        type="text"
                        value={newCategory.subCategory}
                        onChange={e => setNewCategory({ ...newCategory, subCategory: e.target.value })}
                        className="w-full p-2 border rounded"
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

export default AddCategoryPopup;
