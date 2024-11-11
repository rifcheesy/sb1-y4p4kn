import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ feature, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur"></div>
      <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
          <feature.icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </motion.div>
  );
}