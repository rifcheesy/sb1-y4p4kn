import React, { useState } from 'react';

export function ClientProfile({ onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mockUser = {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    memberSince: '2023'
  };

  const mockAppointments = [
    { date: '2023-12-01', time: '10:00 AM', status: 'Scheduled', service: 'Spring Replacement', cost: '$150' },
    { date: '2023-11-15', time: '2:30 PM', status: 'Completed', service: 'Door Balance Check', cost: '$85' }
  ];

  const mockBilling = [
    { date: '2023-11-15', description: 'Door Balance Check', amount: 85, status: 'Paid' },
    { date: '2023-10-20', description: 'Spring Replacement', amount: 150, status: 'Paid' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Client Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                Login
              </button>
              <button type="button" onClick={onClose} className="w-full bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Client Portal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              activeTab === 'appointments' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            My Services
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              activeTab === 'billing' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Billing
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Welcome back, {mockUser.name}!</h3>
              <p className="text-sm text-gray-600">Member since {mockUser.memberSince}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <p className="text-sm text-gray-600">{mockUser.email}</p>
                <p className="text-sm text-gray-600">{mockUser.phone}</p>
                <p className="text-sm text-gray-600">{mockUser.address}</p>
                <button className="text-blue-500 text-sm mt-2">Edit</button>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-500">Schedule Service</button>
                  <button className="w-full text-left text-sm text-blue-500">Request Emergency Service</button>
                  <button className="w-full text-left text-sm text-blue-500">View Service History</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">My Services</h3>
              <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Schedule New Service
              </button>
            </div>
            
            {mockAppointments.map((appointment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{appointment.service}</p>
                    <p className="text-sm text-gray-600">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-600">Cost: {appointment.cost}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    appointment.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Billing History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockBilling.map((bill, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{bill.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{bill.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">${bill.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}