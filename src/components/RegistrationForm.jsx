import React, { useState } from 'react';

export function RegistrationForm({ userType }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    ...(userType === 'technician' && {
      certification: '',
      specialization: '',
      experience: ''
    })
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < getTotalSteps()) {
      setStep(step + 1);
    } else {
      try {
        // Here you would make an API call to register the user
        console.log('Registration data:', formData);
        alert('Account created successfully! Welcome aboard!');
      } catch (error) {
        alert('Registration failed. Please try again.');
      }
    }
  };

  const getTotalSteps = () => userType === 'technician' ? 3 : 2;

  const renderProgressBar = () => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {[...Array(getTotalSteps())].map((_, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step > index + 1 ? 'bg-green-500' : 
              step === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
            } text-white font-bold`}>
              {index + 1}
            </div>
            {index < getTotalSteps() - 1 && (
              <div className={`h-1 w-16 ${
                step > index + 1 ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-600">
        Step {step} of {getTotalSteps()}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Choose a secure password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters long
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Professional Certification</label>
        <input
          type="text"
          name="certification"
          value={formData.certification}
          onChange={handleChange}
          placeholder="Enter your certification"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specialization</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
        >
          <option value="">Select your specialization</option>
          <option value="residential">Residential Garage Doors</option>
          <option value="commercial">Commercial Garage Doors</option>
          <option value="automatic">Automatic Door Systems</option>
          <option value="security">Security Systems</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Years of experience"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
          required
          min="0"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto">
      {renderProgressBar()}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && userType === 'technician' && renderStep3()}
        </div>

        <div className="flex gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            {step === getTotalSteps() ? 'Create Account' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}