// Modal.js
import React from 'react';

const SaveProfileSuccess = ({ show, onClose, title, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='bg-white p-6 rounded-lg shadow-lg z-10'>
        <h2 className='text-xl font-bold mb-4'>{title}</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className='mt-4 bg-Secondary text-white px-4 py-2 rounded-md'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SaveProfileSuccess;
