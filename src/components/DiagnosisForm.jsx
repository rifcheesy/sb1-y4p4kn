import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function DiagnosisForm({ onClose }) {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResult('Analysis complete: Spring tension issue detected. Professional adjustment recommended.');
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4"
    >
      {!image ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <PhotoIcon className="h-12 w-12 mx-auto text-gray-400" />
          <label className="block mt-2">
            <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
              Upload a photo
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div>
          <img src={image} alt="Garage door" className="w-full rounded-lg" />
          {!result && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:bg-green-300"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Image'}
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Diagnosis Result:</h3>
          <p>{result}</p>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}