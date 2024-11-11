import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { appointments, services } from '../services/api';

export function ServiceForm({ onClose }) {
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    notes: '',
  });
  const [availableServices, setAvailableServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await services.getAll();
        setAvailableServices(response.data);
      } catch (error) {
        setError('Failed to load services');
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      await appointments.create({
        serviceId: parseInt(formData.serviceId),
        date: dateTime.toISOString(),
        notes: formData.notes
      });
      alert('Service scheduled successfully!');
      onClose();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to schedule service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Service Type</label>
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
        >
          <option value="">Select a service</option>
          {availableServices.map(service => (
            <option key={service.id} value={service.id}>
              {service.type} (${service.price})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          placeholder="Please describe any specific issues or requirements..."
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule Service'}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="flex-1 bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}