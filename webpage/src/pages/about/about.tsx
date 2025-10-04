'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, ArrowTrendingUpIcon, SparklesIcon, RocketLaunchIcon, HomeIcon, EyeIcon, BoltIcon, CpuChipIcon, StarIcon, UserGroupIcon, BeakerIcon, MapIcon, CalendarIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion, Variants, useReducedMotion, AnimatePresence } from 'framer-motion';
import Header from '../../components/header';
import Footer from '../../components/footer';

const About = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // 0-3 for 4 stages
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable all animations on mobile
  const noAnimation = shouldReduceMotion || isMobile;

  // Growth stages configuration
  const growthStages = [
    {
      id: 0,
      name: 'Seed',
      description: 'Building the foundation',
      months: '1-3',
      growthPercentage: 25,
      emoji: '🌱',
      treeImage: '/treeimag/1.png', // seed
      features: [
        "Mobile app developed",
        "Beta launch and tests", 
        "FCA innovation pathway"
      ]
    },
    {
      id: 1,
      name: 'Sprout',
      description: 'Early growth and validation',
      months: '4-6',
      growthPercentage: 50,
      emoji: '🌿',
      treeImage: '/treeimag/2.png', // sprout
      features: [
        "FCA approval received",
        "£100,000 AUM",
        "1,000 trees planted",
        "Average portfolio growth of 11% per year"
      ]
    },
    {
      id: 2,
      name: 'Growth',
      description: 'Scaling and partnerships',
      months: '7-9',
      growthPercentage: 75,
      emoji: '🌳',
      treeImage: '/treeimag/3.png', // growth
      features: [
        "£1,000,000 AUM",
        "10,000 trees planted",
        "Average portfolio growth of 12%",
        "Education program launched"
      ]
    },
    {
      id: 3,
      name: 'Tree',
      description: 'Maturity and expansion',
      months: '10-12',
      growthPercentage: 100,
      emoji: '🌲',
      treeImage: '/treeimag/4.png', // tree
      features: [
        "£100,000,000 AUM",
        "1,000,000 trees planted",
        "Global leader in online finance education",
        "Crypto exchange launched on Ethereum Virtual Machine",
        "Leading reforestation charity set up globally"
      ]
    }
  ];

  // Navigation functions
  const goToPreviousStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const goToNextStage = () => {
    if (currentStage < growthStages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const goToStage = (stageIndex: number) => {
    setCurrentStage(stageIndex);
  };

  // Tree Visualization Component with Images
  const TreeVisualization = ({ stage }: { stage: number }) => {
    const currentStageData = growthStages[stage];

    return (
      <div className="relative flex items-center justify-center h-full w-full bg-white rounded-xl overflow-hidden">
        {/* Main Tree Image */}
        <motion.div
          key={stage}
          initial={{ scale: 0, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            type: "spring",
            damping: 15,
            stiffness: 200
          }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
        >
          <Image
            src={currentStageData.treeImage}
            alt={`${currentStageData.name} tree stage`}
            fill
            className="object-contain filter drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* Stage indicator overlay */}
        <div className="absolute top-4 right-4">
          <motion.div
            key={stage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2"
          >
            <span>{currentStageData.emoji}</span>
            <span>{currentStageData.name}</span>
          </motion.div>
        </div>
      </div>
    );
  };

  // Animation variants - disabled on mobile
  const fadeInUp: Variants = {
    hidden: { opacity: noAnimation ? 1 : 0, y: noAnimation ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: noAnimation ? 0 : 0.4, 
        ease: [0.4, 0, 0.2, 1] 
      }
    }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: noAnimation ? 1 : 0, x: noAnimation ? 0 : -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: noAnimation ? 0 : 0.4, 
        ease: [0.4, 0, 0.2, 1] 
      }
    }
  };

  const fadeInRight: Variants = {
    hidden: { opacity: noAnimation ? 1 : 0, x: noAnimation ? 0 : 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: noAnimation ? 0 : 0.4, 
        ease: [0.4, 0, 0.2, 1] 
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: noAnimation ? 0 : 0.1,
        delayChildren: noAnimation ? 0 : 0.1
      }
    }
  };

  const snapIn: Variants = {
    hidden: { opacity: noAnimation ? 1 : 0, scale: noAnimation ? 1 : 0.8, y: noAnimation ? 0 : 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: noAnimation ? { duration: 0 } : { 
        duration: 0.35, 
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <p className="text-gray-600">Loading your future...</p>
        </div>
      </div>
    );
  }

  const currentStageData = growthStages[currentStage];

  return (
    <div className="min-h-screen bg-emerald-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-6 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 lg:px-8 overflow-hidden">
        {/* Background decorations - Disabled on mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={noAnimation ? {} : { rotate: 360 }}
            transition={noAnimation ? {} : { 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-emerald-200/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={noAnimation ? {} : { rotate: -360 }}
            transition={noAnimation ? {} : { 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-emerald-300/20 rounded-full blur-3xl"
          />
        </div>

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div 
              variants={snapIn}
              className="flex items-center justify-center -mb-2 sm:-mb-2 lg:-mb-16"
            >
              <Image 
                src="/logo.png" 
                alt="Gro Logo" 
                width={480} 
                height={480}
                className="h-28 sm:h-36 md:h-44 lg:h-56 w-auto"
                priority
              />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-black mb-5 sm:mb-7 leading-tight"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">Gro</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg lg:text-xl text-gray-700 mb-7 sm:mb-9 max-w-3xl mx-auto leading-relaxed px-2"
            >
              We&apos;re making investing simple, intelligent, and impactful. Your goals deserve better than spreadsheets.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Our Mission</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Investing that works for you
            </h3>
            <div className="max-w-4xl mx-auto space-y-6 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed px-2">
              <p>
                Traditional investing is broken. It&apos;s complex, expensive, and designed for people who already have money. Generic robo-advisors pretend to care about your goals but really just shuffle you into risk buckets.
              </p>
              <p>
                We&apos;re different. Gro uses AI to build portfolios optimized for your actual goals—house deposit, retirement, that startup idea—not just your age and risk tolerance.
              </p>
              <p className="font-semibold text-emerald-600">
                Start with £10. Get professional-grade portfolio optimization. Achieve your goals faster. That&apos;s the Gro difference.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <ArrowTrendingUpIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Goal-Optimized
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Portfolios built for your timeline and specific objectives, not generic risk profiles.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <CpuChipIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                AI-Powered
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Analyze thousands of scenarios to find the optimal path to your financial goals.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <SparklesIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Planet-Positive
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Every £100 you invest plants a tree. Financial growth meets environmental impact.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <EyeIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Transparent
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                See exactly how AI makes decisions. No black boxes. No hidden fees.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="py-16 sm:py-24 lg:py-32 bg-emerald-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Our Growth Journey</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Watch Gro grow with time
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Like a tree, our platform grows stronger and more capable through distinct stages.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Tree Visualization */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 h-full flex flex-col"
            >
              <div className="flex-1">
                <TreeVisualization stage={currentStage} />
              </div>
              
              {/* Growth phase indicator */}
              <div className="text-center mt-6">
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full"
                >
                  <span className="text-2xl">{currentStageData.emoji}</span>
                  <span className="text-emerald-800 font-semibold">
                    {currentStageData.name} Stage - {currentStageData.description}
                  </span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Navigation & Features */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="space-y-8 h-full flex flex-col"
            >
              {/* Stage Navigation */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 flex-1">
                {/* Stage Progress Bar */}
                <div className="mb-6">
                  {/* Progress Bar */}
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden mb-4 relative">
                    <motion.div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: currentStage === 0 ? "0%" : 
                               currentStage === 1 ? "33.33%" :
                               currentStage === 2 ? "66.67%" : "100%"
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Stage Labels */}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Seed</span>
                    <span>Sprout</span>
                    <span>Growth</span>
                    <span>Tree</span>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={goToPreviousStage}
                    disabled={currentStage === 0}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentStage === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-emerald-600 hover:bg-emerald-50 hover:scale-105'
                    }`}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="font-medium">Previous</span>
                  </button>

                  <div className="text-center">
                    <div className="text-lg font-bold text-black flex items-center space-x-2">
                      <span>{currentStageData.emoji}</span>
                      <span>{currentStageData.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={goToNextStage}
                    disabled={currentStage === growthStages.length - 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentStage === growthStages.length - 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-emerald-600 hover:bg-emerald-50 hover:scale-105'
                    }`}
                  >
                    <span className="font-medium">Next</span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Feature Releases */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStage}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 flex-1 flex flex-col min-h-[400px]"
                >
                  <h4 className="text-xl font-bold text-black mb-4 flex items-center justify-center">
                    <span className="text-2xl mr-3">{currentStageData.emoji}</span>
                    {currentStageData.name} Stage
                  </h4>
                  <div className="text-center mb-6">
                    <p className="text-gray-700 text-lg">
                      {currentStageData.description}
                    </p>
                  </div>
                  
                  {/* Key Milestones */}
                  <div className="flex-1 flex flex-col">
                    <h5 className="text-lg font-semibold text-black text-center mb-4">Key Milestones</h5>
                    <div className="space-y-3 flex-1">
                      {currentStageData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="flex items-start space-x-3 justify-center"
                        >
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed text-center">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Founders */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Our Founders</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Built by people who get it
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              We&apos;re not Wall Street suits. We&apos;re builders who saw a problem and decided to fix it.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16"
          >
            <motion.a
              href="https://www.linkedin.com/in/tommy-rowe-3a720b338"
              target="_blank"
              rel="noopener noreferrer"
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center cursor-pointer block"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <span className="text-white font-bold text-xl sm:text-2xl">TR</span>
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-2">
                Tommy Rowe
              </h4>
              <p className="text-emerald-600 font-semibold mb-3 sm:mb-4">The Builder</p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Engineer, student, investor—and the one writing the code. Tommy saw friends drowning in spreadsheets and overpriced advisors, so he built Gro to fix it. Combines technical chops with a simple belief: investing shouldn&apos;t require a finance degree.
              </p>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/chris-thomson-552024382"
              target="_blank"
              rel="noopener noreferrer"
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center cursor-pointer block"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <span className="text-white font-bold text-xl sm:text-2xl">CT</span>
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-2">
                Chris Thomson
              </h4>
              <p className="text-emerald-600 font-semibold mb-3 sm:mb-4">The Numbers Guy</p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Handles the investment mathematics, manages finances, and ensures business efficiency. Chris makes sure the AI actually works and the numbers add up—so your portfolio is optimized, not just automated.
              </p>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/tony-love-abb21596"
              target="_blank"
              rel="noopener noreferrer"
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center cursor-pointer block"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <span className="text-white font-bold text-xl sm:text-2xl">TL</span>
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-2">
                Tony Love
              </h4>
              <p className="text-emerald-600 font-semibold mb-3 sm:mb-4">The Growth Driver</p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Focused on getting Gro into the hands of people who need it most. Tony shapes strategy, partnerships, and everything that helps us scale from startup to the investing platform everyone uses.
              </p>
            </motion.a>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center"
          >
            <h4 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">What drives us:</h4>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
              We believe everyone deserves access to the same sophisticated investment strategies that hedge funds use—without the complexity or the price tag. Your £10 should work as hard as someone else&apos;s £10,000.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;