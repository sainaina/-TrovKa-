import React, { useState, useEffect } from 'react';

const EditServiceForm = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState(service);

  useEffect(() => {
    setFormData(service);
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Service Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Sub Category</label>
        <input
          type="text"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-lg">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditServiceForm;
