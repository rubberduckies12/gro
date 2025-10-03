'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, ArrowTrendingUpIcon, SparklesIcon, RocketLaunchIcon, HomeIcon, EyeIcon, BoltIcon, CpuChipIcon, StarIcon } from '@heroicons/react/24/solid';
import { motion, Variants } from 'framer-motion';

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const snapIn: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
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
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 lg:px-8 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"
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
              className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200/50 px-6 py-3 text-sm font-medium text-emerald-800 mb-8 backdrop-blur-sm"
            >
              <SparklesIcon className="w-4 h-4 mr-2 text-emerald-500" />
              <span className="mr-2">AI-powered investing made effortless</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl font-extrabold tracking-tight text-black sm:text-7xl lg:text-8xl mb-8"
            >
              Your money,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600 animate-pulse">
                growing smarter
              </span>
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="text-2xl text-gray-800 mb-6 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              <span className="text-emerald-600 font-bold">Goals</span> • 
              <span className="text-emerald-600 font-bold mx-2">Returns</span>• 
              <span className="text-emerald-600 font-bold"> Outcomes</span>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Time is money. Gro is about maximising results while minimising time and effort. In three steps—set your goals, watch your returns, and achieve your outcomes—you get more progress in less time. Success before you finish your morning coffee.
            </motion.p>
            
            {/* COMMENTED OUT BUTTONS - UNCOMMENT TO RESTORE
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Link href="/get-started" className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-10 py-5 text-lg font-semibold text-white shadow-2xl hover:bg-emerald-600 hover:shadow-emerald-500/25 transition-all duration-200 group">
                  <span>Start Growing</span>
                  <RocketLaunchIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <Link href="/demo" className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-300 bg-white/80 backdrop-blur-sm px-10 py-5 text-lg font-semibold text-gray-700 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200">
                  <span>See the magic</span>
                  <SparklesIcon className="w-6 h-6 ml-3" />
                </Link>
              </motion.div>
            </motion.div>
            */}

            {/* Coming Soon Message */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col items-center justify-center mb-16"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center rounded-2xl bg-emerald-500 px-10 py-5 text-lg font-semibold text-white shadow-2xl mb-4"
              >
                <SparklesIcon className="w-6 h-6 mr-3" />
                <span>Coming Soon</span>
              </motion.div>
              <p className="text-gray-600 text-lg">
                What If Money Did Gro On Trees?
              </p>
            </motion.div>

            {/* COMMENTED OUT STATS - UNCOMMENT TO RESTORE
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">47%</div>
                <div className="text-sm text-gray-600">Avg. annual returns</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10k+</div>
                <div className="text-sm text-gray-600">Gen Z investors</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">£2M+</div>
                <div className="text-sm text-gray-600">Wealth created</div>
              </motion.div>
            </motion.div>
            */}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-lg font-semibold text-emerald-600 mb-4">How we do it differently</h2>
            <h3 className="text-5xl font-bold text-black mb-8">
              Investing that actually makes sense
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              No spreadsheets. No jargon. Just AI that learns your goals and works in the background—so your returns grow while your effort shrinks.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            <motion.div 
              variants={snapIn}
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <ArrowTrendingUpIcon className="h-10 w-10 text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-black mb-4">
                Goals
              </h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                Tell us what you&apos;re saving for – house deposit, dream holiday, or financial freedom. 
                Our AI creates a personalized roadmap just for you.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <ChartBarIcon className="h-10 w-10 text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-black mb-4">
                Returns
              </h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                Watch your money grow with AI-optimized portfolios. We analyze thousands of stocks 
                to find the best opportunities while you focus on living your life.
              </p>
            </motion.div>
            
            <motion.div 
              variants={snapIn}
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-emerald-100/50 text-center"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500 mb-6 shadow-lg group-hover:shadow-emerald-500/50"
              >
                <ShieldCheckIcon className="h-10 w-10 text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-black mb-4">
                Outcomes
              </h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                Reach milestones faster with less effort. Track progress in real time and celebrate each outcome along the way.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-emerald-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-lg font-semibold text-emerald-600 mb-4">Super simple process</h2>
            <h3 className="text-5xl font-bold text-black mb-8">
              From broke to goals in 3 steps
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              No finance degree required. Set your goals, let Gro crunch the numbers, and watch your effort-to-outcome ratio flip in your favour.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-white rounded-3xl p-10 shadow-xl border border-gray-100 group text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white font-bold text-2xl mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                1
              </motion.div>
              <h4 className="text-2xl font-bold text-black mb-6">Dream it</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                House deposit? Early retirement? That startup idea? Tell us your goals and when you want to achieve them. 
                We&apos;ll calculate exactly how much you need to invest.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="relative bg-white rounded-3xl p-10 shadow-xl border border-gray-100 group text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white font-bold text-2xl mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                2
              </motion.div>
              <h4 className="text-2xl font-bold text-black mb-6">AI builds it</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our AI analyzes thousands of stocks and creates 5 custom portfolios designed specifically for your goals. 
                Pick your favorite and you&apos;re done!
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              className="relative bg-white rounded-3xl p-10 shadow-xl border border-gray-100 group text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white font-bold text-2xl mb-8 shadow-lg group-hover:shadow-emerald-500/50 mx-auto"
              >
                3
              </motion.div>
              <h4 className="text-2xl font-bold text-black mb-6">Watch it grow</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
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
        className="py-32 bg-emerald-500 relative overflow-hidden"
      >
        {/* Background animation */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
        />
        
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl font-bold text-white mb-8"
          >
            Ready to level up your wealth?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium"
          >
            Join the waitlist to be first in line for effortless investing—where your results scale up while your time and effort scale down.
          </motion.p>
          
          {/* COMMENTED OUT CTA BUTTONS - UNCOMMENT TO RESTORE
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div
              variants={fadeInLeft}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <Link href="/get-started" className="inline-flex items-center justify-center rounded-2xl bg-white text-gray-900 px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-200 group">
                <span>Start Your Journey</span>
                <StarIcon className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <Link href="/portfolios" className="inline-flex items-center justify-center rounded-2xl border-2 border-white text-white px-10 py-5 text-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-200">
                <span>See Examples</span>
                <EyeIcon className="w-6 h-6 ml-3" />
              </Link>
            </motion.div>
          </motion.div>
          */}

          {/* Coming Soon Message for CTA */}
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center"
          >
            <div className="inline-flex items-center rounded-2xl bg-white text-emerald-500 px-10 py-5 text-xl font-bold shadow-2xl">
              <SparklesIcon className="w-6 h-6 mr-3" />
              <span>Launching Soon</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-2xl">G</span>
                </motion.div>
                <span className="text-3xl font-bold text-white">Gro</span>
              </div>
              <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                Goals • Returns • Outcomes. The investing app that actually gets you. 
                Building wealth for the next generation, one goal at a time.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Platform</h3>
              <ul className="space-y-4">
                <li><Link href="/portfolios" className="text-gray-400 hover:text-emerald-400 transition-colors duration-150 text-lg">Portfolios</Link></li>
                <li><Link href="/goals" className="text-gray-400 hover:text-emerald-400 transition-colors duration-150 text-lg">Goals</Link></li>
                <li><Link href="/analytics" className="text-gray-400 hover:text-emerald-400 transition-colors duration-150 text-lg">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors duration-150 text-lg">About</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-emerald-400 transition-colors duration-150 text-lg">Security</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-emerald-400 transition-colors duration-150 text-lg">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8">
            <p className="text-center text-gray-400 text-lg">
              &copy; 2025 Gro. All rights reserved. Made with love for the future.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;