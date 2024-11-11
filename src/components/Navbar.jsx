import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SignInPage from './SignInPage';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [userType, setUserType] = useState('client');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Garage Door AI
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setUserType('client');
                    setShowSignIn(true);
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Client Sign In
                </button>
                <button
                  onClick={() => {
                    setUserType('technician');
                    setShowSignIn(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Technician Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSignIn && (
        <SignInPage
          onClose={() => setShowSignIn(false)}
          userType={userType}
        />
      )}
    </nav>
  );
}