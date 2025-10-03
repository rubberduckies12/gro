'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, ArrowTrendingUpIcon, SparklesIcon, RocketLaunchIcon, HomeIcon, EyeIcon, BoltIcon, CpuChipIcon, StarIcon } from '@heroicons/react/24/solid';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Home = () => {
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
      <section className="relative px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-32 lg:px-8 overflow-hidden">
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
              className="flex items-center justify-center -mb-4 sm:-mb-4 lg:-mb-16"
            >
              <Image 
                src="/logo.png" 
                alt="Gro Logo" 
                width={480} 
                height={480}
                className="h-32 sm:h-48 md:h-60 lg:h-80 w-auto"
                priority
              />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-black mb-6 sm:mb-8 leading-tight"
            >
              Your money,
              <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600 ${!noAnimation ? 'animate-pulse' : ''}`}>
                growing smarter
              </span>
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="text-lg sm:text-xl lg:text-2xl text-gray-800 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed font-medium px-2"
            >
              <span className="text-emerald-600 font-bold">Goals</span> • 
              <span className="text-emerald-600 font-bold mx-2">Returns</span>• 
              <span className="text-emerald-600 font-bold"> Outcomes</span>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2"
            >
              Time is money. Gro is about maximising results while minimising time and effort. In three steps—set your goals, watch your returns, and achieve your outcomes—you get more progress in less time. Success before you finish your morning coffee.
            </motion.p>
            
            {/* Coming Soon Message */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col items-center justify-center mb-12 sm:mb-16 px-2"
            >
              <motion.div
                animate={noAnimation ? {} : { scale: [1, 1.05, 1] }}
                transition={noAnimation ? {} : { duration: 2, repeat: Infinity }}
                className="inline-flex items-center rounded-2xl bg-emerald-500 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-semibold text-white shadow-2xl mb-3 sm:mb-4"
              >
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                <span>We&apos;re still Gro-ing - launching soon!</span>
              </motion.div>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center">
                What If Money Did Gro On Trees?
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">How we do it differently</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Investing that actually makes sense
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              No spreadsheets. No jargon. Just AI that learns your goals and works in the background—so your returns grow while your effort shrinks.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <motion.div 
              variants={snapIn}
              whileHover={noAnimation ? {} : { y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center md:col-span-2 lg:col-span-1"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-4 sm:mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <ArrowTrendingUpIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Goals
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Tell us what you&apos;re saving for – house deposit, dream holiday, or financial freedom. 
                Our AI creates a personalized roadmap just for you.
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
                <ChartBarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Returns
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Watch your money grow with AI-optimized portfolios. We analyze thousands of stocks 
                to find the best opportunities while you focus on living your life.
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
                <ShieldCheckIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
                Outcomes
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Reach milestones faster with less effort. Track progress in real time and celebrate each outcome along the way.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 lg:py-32 bg-emerald-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-600 mb-3 sm:mb-4">Super simple process</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              From broke to goals in 3 steps
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              No finance degree required. Set your goals, let Gro crunch the numbers, and watch your effort-to-outcome ratio flip in your favour.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              whileHover={noAnimation ? {} : { scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 group text-center md:col-span-2 lg:col-span-1"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { scale: 1.2, rotate: 10 }}
                whileTap={noAnimation ? {} : { scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500 text-white font-bold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                1
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Dream it</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                House deposit? Early retirement? That startup idea? Tell us your goals and when you want to achieve them. 
                We&apos;ll calculate exactly how much you need to invest.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover={noAnimation ? {} : { scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: noAnimation ? 0 : 0.1 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 group text-center"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { scale: 1.2, rotate: 10 }}
                whileTap={noAnimation ? {} : { scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500 text-white font-bold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                2
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">AI builds it</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Our AI analyzes thousands of stocks and creates 5 custom portfolios designed specifically for your goals. 
                Pick your favorite and you&apos;re done!
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              whileHover={noAnimation ? {} : { scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: noAnimation ? 0 : 0.2 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100 group text-center md:col-span-2 lg:col-span-1"
            >
              <motion.div 
                whileHover={noAnimation ? {} : { scale: 1.2, rotate: 10 }}
                whileTap={noAnimation ? {} : { scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500 text-white font-bold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                3
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Watch it grow</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Sit back and watch your money work harder than you do. Track progress, get insights, 
                and celebrate hitting your milestones. Your future self will thank you!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="py-16 sm:py-24 lg:py-32 bg-emerald-500 relative overflow-hidden"
      >
        {/* Background animation - Disabled on mobile */}
        <motion.div 
          animate={noAnimation ? {} : { 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={noAnimation ? {} : { duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
        />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight"
          >
            Ready to level up your wealth?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium px-2"
          >
            Join the waitlist to be first in line for effortless investing—where your results scale up while your time and effort scale down.
          </motion.p>
          
          {/* Coming Soon Message for CTA */}
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center px-2"
          >
            <div className="inline-flex items-center rounded-2xl bg-white text-emerald-500 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl font-bold shadow-2xl">
              <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
              <span>We&apos;re still Gro-ing - launching soon!</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Home;