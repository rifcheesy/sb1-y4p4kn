import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {currentUser?.email}</h2>
        <p className="text-gray-600">Your dashboard content goes here.</p>
      </div>
    </div>
  );
}