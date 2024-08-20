import React from 'react';

const DeleteProviderConfirmation = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this provider?</p>
                <div className="flex justify-end mt-4">
                    <button type="button" onClick={onClose} className="mr-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    <button type="button" onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProviderConfirmation;
