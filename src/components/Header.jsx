import React, { useState } from 'react';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { SignInPage } from './SignInPage';

export function Header({ onClientProfile, onTechnicianProfile }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInType, setSignInType] = useState('client');

  const handleSignIn = (type) => {
    setSignInType(type);
    setShowSignIn(true);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Garage Door AI</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleSignIn('client')}
            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <UserIcon className="h-5 w-5" />
            <span>Sign In</span>
          </button>
          
          <button
            onClick={() => handleSignIn('technician')}
            className="flex items-center gap-2 border border-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>Technician Portal</span>
          </button>
        </div>
      </div>

      {showSignIn && (
        <SignInPage 
          onClose={() => setShowSignIn(false)} 
          userType={signInType}
        />
      )}
    </header>
  );
}