import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdClose } from "react-icons/io";

function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, form);
      toast.success('Feedback submitted successfully!');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => navigate('/'), 2000); // Redirect after toast
    } catch (err) {
      toast.error('Error submitting feedback');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="relative max-w-md mx-auto mt-6 p-10 bg-white rounded shadow-md">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2   !text-black right-1 text-gray-500 hover:text-red-600 !text-[20px] focus:outline-none"
        title="Close"
      >
        <IoMdClose/>
      </button>

      <h2 className="text-[25px] mb-6 text-center ">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder="Your Feedback"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full !bg-[#fb541b] text-white !py-2 rounded  transition"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Feedback;
