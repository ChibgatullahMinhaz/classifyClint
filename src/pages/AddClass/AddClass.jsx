import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../../Hook/useAuth';

const AddClass = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classData = {
      ...formData,
      name: user?.displayName,
      email: user?.email,
      status: 'pending',
      createdAt: new Date()
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/classes`, classData);
      navigate('/dashboard/my-class');
    } catch (err) {
      console.error('Error adding class:', err);
      alert("Failed to add class. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded-md shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">Add a New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
