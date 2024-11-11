import React from 'react';

export function MaintenanceStatus({ items }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Maintenance Status</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}