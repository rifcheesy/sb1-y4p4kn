import React from 'react';

export function ActionButton({ icon: Icon, text, onClick, className }) {
  return (
    <button 
      onClick={onClick}
      className={`${className} p-6 rounded-lg shadow transition flex flex-col items-center justify-center w-full`}
    >
      <Icon className="h-8 w-8 mb-2" />
      <span className="text-lg font-semibold">{text}</span>
    </button>
  );
}