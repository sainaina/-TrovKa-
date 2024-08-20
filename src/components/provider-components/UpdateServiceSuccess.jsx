import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const UpdateServiceSuccess = ({ isOpen, onRequestClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2 className="text-xl font-bold mb-4">Update Successful</h2>
      <p>{message}</p>
      <div className="flex justify-end mt-4 space-x-4">
        <button onClick={onRequestClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default UpdateServiceSuccess;
