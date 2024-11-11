import React, { useState } from 'react';

export function TechnicianProfile({ onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mockTechnician = {
    name: 'Mike Johnson',
    id: 'TECH-001',
    specialization: 'Master Technician',
    certification: 'Certified Garage Door Professional',
    rating: 4.8,
    completedJobs: 328
  };

  const mockSchedule = [
    { 
      time: '9:00 AM', 
      client: 'John Doe', 
      address: '123 Main St', 
      service: 'Spring Replacement',
      phone: '(555) 123-4567',
      status: 'Pending',
      priority: 'High',
      notes: 'Customer reported loud noise during operation'
    },
    { 
      time: '2:00 PM', 
      client: 'Jane Smith', 
      address: '456 Oak Ave', 
      service: 'Door Balance Check',
      phone: '(555) 987-6543',
      status: 'En Route',
      priority: 'Medium',
      notes: 'Follow-up from previous repair'
    }
  ];

  const mockInventory = [
    { item: 'Torsion Springs', quantity: 5, status: 'In Stock', location: 'Van Storage A1' },
    { item: 'Rollers', quantity: 20, status: 'Low Stock', location: 'Van Storage B2' },
    { item: 'Belt Drive Opener', quantity: 2, status: 'In Stock', location: 'Van Storage C1' },
    { item: 'Remote Controls', quantity: 8, status: 'In Stock', location: 'Van Storage D3' }
  ];

  const mockPerformance = {
    weeklyJobs: 15,
    completionRate: '95%',
    avgResponseTime: '28 mins',
    customerSatisfaction: '4.8/5'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Technician Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Technician ID</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" required />
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
          <h2 className="text-2xl font-bold">Technician Portal</h2>
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
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              activeTab === 'schedule' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              activeTab === 'inventory' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              activeTab === 'performance' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Performance
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{mockTechnician.name}</h3>
                  <p className="text-sm text-gray-600">ID: {mockTechnician.id}</p>
                  <p className="text-sm text-gray-600">{mockTechnician.specialization}</p>
                  <p className="text-sm text-gray-600">{mockTechnician.certification}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{mockTechnician.rating}</div>
                  <p className="text-sm text-gray-600">{mockTechnician.completedJobs} Jobs Completed</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Next Appointment</h4>
                {mockSchedule[0] && (
                  <div>
                    <p className="text-sm font-medium">{mockSchedule[0].time} - {mockSchedule[0].service}</p>
                    <p className="text-sm text-gray-600">{mockSchedule[0].client}</p>
                    <p className="text-sm text-gray-600">{mockSchedule[0].address}</p>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-500">Update Job Status</button>
                  <button className="w-full text-left text-sm text-blue-500">Report Emergency</button>
                  <button className="w-full text-left text-sm text-blue-500">Request Parts</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
              <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Full Calendar
              </button>
            </div>
            
            {mockSchedule.map((appointment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">{appointment.time}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      appointment.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.priority} Priority
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{appointment.service}</p>
                      <p className="text-sm text-gray-600">{appointment.client}</p>
                      <p className="text-sm text-gray-600">{appointment.address}</p>
                      <p className="text-sm text-gray-600">Phone: {appointment.phone}</p>
                    </div>
                    <span className={`px-2 h-fit py-1 rounded text-sm ${
                      appointment.status === 'En Route' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    Notes: {appointment.notes}
                  </p>
                  <div className="flex gap-2">
                    <button className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Start Job
                    </button>
                    <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Navigate
                    </button>
                    <button className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Van Inventory</h3>
              <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Request Restock
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockInventory.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.item}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'Low Stock' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-sm text-blue-500 hover:text-blue-700">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Performance Metrics</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Weekly Jobs</p>
                <p className="text-2xl font-bold text-blue-600">{mockPerformance.weeklyJobs}</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-green-600">{mockPerformance.completionRate}</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-yellow-600">{mockPerformance.avgResponseTime}</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Customer Rating</p>
                <p className="text-2xl font-bold text-purple-600">{mockPerformance.customerSatisfaction}</p>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-4">Recent Customer Feedback</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm">Great service, very professional!</p>
                    <p className="text-xs text-gray-500">- John D. (2 days ago)</p>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}