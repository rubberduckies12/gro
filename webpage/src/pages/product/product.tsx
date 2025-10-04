'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CpuChipIcon, ChartBarIcon, ShieldCheckIcon, SparklesIcon, DevicePhoneMobileIcon, GlobeAltIcon, StarIcon, TrophyIcon, FireIcon, HeartIcon } from '@heroicons/react/24/solid';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Product = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
              The investing platform that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">actually gets you</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg lg:text-xl text-gray-700 mb-7 sm:mb-9 max-w-3xl mx-auto leading-relaxed px-2"
            >
              Professional-grade AI. Game-like simplicity. Built for your phone, optimized for your goals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Technology */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Under the hood</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Wall Street algorithms, startup simplicity
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              We use the same quantitative models that power hedge funds—wrapped in an interface your grandma could use.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h4 className="text-xl sm:text-2xl font-bold text-black mb-8 sm:mb-12">The Math Behind Your Money:</h4>
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
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <ChartBarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h5 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Black-Scholes Model
              </h5>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Calculate option pricing and risk with precision. We use it to optimize your portfolio&apos;s risk-return profile based on your timeline.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <StarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h5 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Graham&apos;s Value Investing
              </h5>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Benjamin Graham&apos;s time-tested principles meet modern AI. Find undervalued opportunities the market hasn&apos;t priced in yet.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <CpuChipIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h5 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Monte Carlo Simulations
              </h5>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Run thousands of market scenarios to stress-test your portfolio. See how your strategy performs in bull markets, bear markets, and everything in between.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <ShieldCheckIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h5 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Modern Portfolio Theory
              </h5>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Optimize asset allocation to maximize returns for your specific risk tolerance. Not generic buckets—actual goal-based optimization.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Tech Stack */}
      <section className="py-16 sm:py-24 lg:py-32 bg-emerald-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Built for scale</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Enterprise tools, consumer experience
            </h3>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          >
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 group text-center md:col-span-2 lg:col-span-1"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500 mb-6 sm:mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                <ChartBarIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Alpaca API</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Institutional-grade trade execution, custody, and clearing. Your investments are secure, regulated, and lightning-fast.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 group text-center"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500 mb-6 sm:mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                <CpuChipIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">OpenAI Integration</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Natural language goal matching powered by GPT-4. Tell us what you want in plain English—our AI translates it into an investment strategy.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 group text-center md:col-span-2 lg:col-span-1"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500 mb-6 sm:mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                <ShieldCheckIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">FCA-Compliant Infrastructure</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Bank-level security, regulatory compliance built-in, and full transparency. Your money is protected.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Goal Training */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Goals that actually work</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Learn by doing. Get rewarded for progress.
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Setting goals is hard. Sticking to them is harder. That&apos;s why we built goal training—gamified courses that help us understand what you really want while teaching you how to get there.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* How it works */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 h-full flex flex-col"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-6">How it works:</h4>
              <div className="space-y-4 flex-1">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Interactive lessons tailored to your goals (house deposit, retirement, travel fund)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Quick daily check-ins (2 minutes max)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Adaptive questions that learn from your answers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Earn XP for every completed lesson and milestone</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Level up as you master financial concepts</span>
                </div>
              </div>
            </motion.div>

            {/* Course examples */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="space-y-6 h-full flex flex-col"
            >
              <motion.div 
                variants={snapIn}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 flex-1"
              >
                <h5 className="text-lg sm:text-xl font-bold text-black mb-2">First-Time Buyer</h5>
                <p className="text-gray-700 text-base sm:text-lg">Master the path to homeownership</p>
              </motion.div>
              
              <motion.div 
                variants={snapIn}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 flex-1"
              >
                <h5 className="text-lg sm:text-xl font-bold text-black mb-2">Retirement Ready</h5>
                <p className="text-gray-700 text-base sm:text-lg">Build your long-term wealth strategy</p>
              </motion.div>
              
              <motion.div 
                variants={snapIn}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 flex-1"
              >
                <h5 className="text-lg sm:text-xl font-bold text-black mb-2">Freedom Fund</h5>
                <p className="text-gray-700 text-base sm:text-lg">Create your escape plan from the 9-to-5</p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="max-w-4xl mx-auto space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed px-2">
              <p>
                Each course breaks down complex financial concepts into bite-sized lessons you can finish on your commute. Complete modules, earn XP, and use it to buy fractional stocks that get you closer to your goal.
              </p>
              <p className="font-semibold text-emerald-600">
                The more you engage, the smarter our AI gets at optimizing your portfolio—and the more you earn. Learning pays. Literally.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile-First Experience */}
      <section className="py-16 sm:py-24 lg:py-32 bg-emerald-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Built for your life</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              iOS. Android. Always in your pocket.
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              We didn&apos;t just make a website that works on mobile. We built a mobile-first investing platform that happens to have a web version.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Native apps */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 h-full flex flex-col min-h-[300px]"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-6">Native apps for:</h4>
              <div className="space-y-4 flex-1">
                <div className="flex items-start space-x-3">
                  <DevicePhoneMobileIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-black text-base sm:text-lg">iOS</span>
                    <span className="text-gray-700 text-base sm:text-lg"> - Optimized for iPhone with Face ID, widgets, and notifications</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DevicePhoneMobileIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-black text-base sm:text-lg">Android</span>
                    <span className="text-gray-700 text-base sm:text-lg"> - Material Design, biometric auth, seamless sync</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 h-full flex flex-col min-h-[300px]"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-6">Features you&apos;ll actually use:</h4>
              <div className="space-y-4 flex-1">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Check your progress while waiting for coffee</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Adjust goals on the fly</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Get insights delivered as push notifications</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Track trees planted in real-time</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-12 sm:mt-16 text-center"
          >
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-semibold">
              Investing shouldn&apos;t require a laptop and a quiet afternoon. It should fit between Instagram and your morning commute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tree Planting Impact */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Invest in your future and the planet&apos;s</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Every £100 invested plants a tree
            </h3>
            <div className="max-w-4xl mx-auto space-y-6 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed px-2">
              <p>
                Your money grows. The planet grows. It&apos;s that simple.
              </p>
              <p>
                For every £100 you invest through Gro, we plant one tree through our non-profit partner organization. Track your environmental impact right alongside your financial returns.
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Impact dashboard */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-6 flex items-center">
                <GlobeAltIcon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 mr-3" />
                Your impact dashboard:
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Trees planted from your investments</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">CO₂ offset calculated in real-time</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Global forest map showing where your trees grow</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Annual impact reports you can actually be proud of</span>
                </div>
              </div>
            </motion.div>

            {/* Example */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="bg-emerald-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl"
            >
              <h4 className="text-xl sm:text-2xl font-bold mb-4">Example:</h4>
              <p className="text-base sm:text-lg leading-relaxed">
                Invest £10,000 toward your house deposit? That&apos;s <span className="font-bold">100 trees planted</span>. Reach your goal and leave the planet better than you found it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gamification & Rewards */}
      <section className="py-16 sm:py-24 lg:py-32 bg-emerald-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Investing, leveled up</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Earn XP. Buy stocks. Celebrate wins.
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Hitting financial goals should feel as good as it actually is. That&apos;s why we turned investing into something you&apos;ll actually want to do every day.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Earn XP */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 md:col-span-2 lg:col-span-1"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-6 flex items-center">
                <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mr-2" />
                Earn XP by:
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Completing daily goal check-ins</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Reaching investment milestones</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Maintaining contribution streaks</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Finishing financial literacy modules</span>
                </div>
              </div>
            </motion.div>

            {/* Spend XP */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-6 flex items-center">
                <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mr-2" />
                Spend XP on:
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Fractional shares of stocks you choose</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Bonus tree plantings</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Premium portfolio insights</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-base sm:text-lg">Exclusive community features</span>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 md:col-span-2 lg:col-span-1"
            >
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-6 flex items-center">
                <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mr-2" />
                Unlock achievements:
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <TrophyIcon className="h-4 w-4 text-emerald-500" />
                    <span className="font-semibold text-black text-base sm:text-lg">Investor of the Month</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">Top performers get featured in our community and earn bonus rewards.</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <FireIcon className="h-4 w-4 text-emerald-500" />
                    <span className="font-semibold text-black text-base sm:text-lg">Streak Master</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">7 days? 30 days? 365 days? Keep your contribution streak alive and unlock lower fees.</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <HeartIcon className="h-4 w-4 text-emerald-500" />
                    <span className="font-semibold text-black text-base sm:text-lg">Goal Crusher</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">First £100 invested. First tree planted. First goal reached. Every milestone gets celebrated.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-12 sm:mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/50">
                <h5 className="text-lg sm:text-xl font-bold text-black mb-4">Community Leaderboards</h5>
                <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">
                  See how you stack up (anonymously) against other goal-setters. Friendly competition that keeps you motivated.
                </p>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  Share your wins and inspire others to start their journey.
                </p>
              </div>
              
              <div className="bg-emerald-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
                <h5 className="text-lg sm:text-xl font-bold mb-4">Ready to level up?</h5>
                <p className="leading-relaxed text-base sm:text-lg">
                  Join a community of goal-focused investors building their financial future through consistent, strategic investing.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;