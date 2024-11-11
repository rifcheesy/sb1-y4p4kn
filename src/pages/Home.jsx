import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  ClockIcon,
  CameraIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import FeatureCard from '../components/FeatureCard';
import ServiceModal from '../components/ServiceModal';
import CTAButton from '../components/CTAButton';
import { ServiceForm } from '../components/ServiceForm';
import { DiagnosisForm } from '../components/DiagnosisForm';
import { ClientProfile } from '../components/ClientProfile';

export default function Home() {
  const { currentUser } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const features = [
    {
      icon: WrenchScrewdriverIcon,
      title: 'Expert Service',
      description: 'Professional technicians with years of experience',
      color: 'from-blue-500 to-cyan-500',
      action: 'schedule'
    },
    {
      icon: ShieldCheckIcon,
      title: 'AI Diagnostics',
      description: 'Advanced AI-powered garage door diagnostics',
      color: 'from-purple-500 to-pink-500',
      action: 'diagnosis'
    },
    {
      icon: ClockIcon,
      title: '24/7 Support',
      description: 'Emergency service available around the clock',
      color: 'from-green-500 to-emerald-500',
      action: 'support'
    }
  ];

  const handleFeatureClick = (action) => {
    if (!currentUser) {
      setActiveModal('login');
      return;
    }
    setActiveModal(action);
  };

  const handleGetStarted = () => {
    setActiveModal('login');
  };

  const handleLearnMore = () => {
    const featuresSection = document.querySelector('#features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'schedule':
        return <ServiceForm onClose={() => setActiveModal(null)} />;
      case 'diagnosis':
        return <DiagnosisForm onClose={() => setActiveModal(null)} />;
      case 'support':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <PhoneIcon className="h-6 w-6 text-blue-500" />
              <div>
                <h4 className="font-semibold">Emergency Hotline</h4>
                <p className="text-sm text-gray-600">1-800-GARAGE-HELP</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="font-semibold">Live Chat Support</h4>
                <button className="text-sm text-green-600 font-medium">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        );
      case 'login':
        return <ClientProfile onClose={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6"
        >
          Smart Garage Solutions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Experience the future of garage door maintenance with AI-powered diagnostics and expert service
        </motion.p>
        
        {!currentUser && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CTAButton onClick={handleGetStarted} primary>
              Get Started
            </CTAButton>
            <CTAButton onClick={handleLearnMore}>
              Learn More
            </CTAButton>
          </motion.div>
        )}
      </motion.div>

      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              onClick={() => handleFeatureClick(feature.action)}
            />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5000+', label: 'Repairs Completed' },
              { value: '24/7', label: 'Emergency Service' },
              { value: '98%', label: 'Customer Satisfaction' },
              { value: '15+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 8), duration: 0.8 }}
                className="text-white"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <ServiceModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal === 'login' ? 'Sign In' : 'Service Details'}
      >
        {renderModalContent()}
      </ServiceModal>
    </div>
  );
}