import React from 'react';
import { motion } from 'framer-motion';

export default function CTAButton({ onClick, primary, children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition duration-200 ${
        primary
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
          : 'bg-white text-blue-600'
      }`}
    >
      {children}
    </motion.button>
  );
}