'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChevronRightIcon, CheckIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

const JoinWaitlist = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [joinResult, setJoinResult] = useState(null);

  const steps = [
    { id: 1, title: 'Your Name', icon: UserIcon },
    { id: 2, title: 'Email', icon: EnvelopeIcon },
    { id: 3, title: 'Success!', icon: SparklesIcon }
  ];

  // Trigger confetti on success
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/register-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          source: 'website'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setJoinResult(data.data);
        setCurrentStep(3);
        setTimeout(() => {
          triggerConfetti();
        }, 500);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError('Please enter both your first and last name.');
        return;
      }
      setError('');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.email.trim()) {
        setError('Please enter your email address.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address.');
        return;
      }
      setError('');
      handleSubmit();
    }
  };

  // Handle back step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full max-w-md mx-auto"
      >
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 
                      isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 
                      'bg-white border-gray-300 text-gray-400'}
                  `}>
                    {isCompleted ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          layout
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  What's your name?
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Let's start with the basics
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your first name"
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  onClick={handleNext}
                  className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  What's your email?
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  We'll use this to keep you updated on your progress
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your email address"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex-1 bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ChevronRightIcon className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && joinResult && (
              <motion.div
                key="step3"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckIcon className="h-8 w-8 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to the future! 🎉
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Thanks for joining us, {formData.firstName}! You're in great company.
                </p>

                <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">
                        #{joinResult.position}
                      </div>
                      <div className="text-sm text-gray-600">Your position</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {joinResult.totalUsers}
                      </div>
                      <div className="text-sm text-gray-600">Total waitlisters</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600 mb-8">
                  <p>• We'll email you updates on your position</p>
                  <p>• Get early access when we launch</p>
                  <p>• No spam, just the good stuff</p>
                </div>

                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                >
                  Back to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already joined? <a href="/waitlist/check" className="text-emerald-600 hover:text-emerald-700 font-medium">Check your position</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinWaitlist;