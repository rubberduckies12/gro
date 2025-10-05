'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Close policies dropdown when scrolling
      setIsPoliciesOpen(false);
    };

    // Handle mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Close dropdown when clicking anywhere on the document
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element;
      // Only close if clicking outside the entire policies dropdown area
      const policiesDropdown = target.closest('[data-policies-dropdown]');
      const isClickOnDropdownItem = target.closest('a[href^="/policy"]');
      
      // Don't close if clicking on dropdown items or dropdown area
      if (!policiesDropdown && !isClickOnDropdownItem) {
        setIsPoliciesOpen(false);
      }
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsPoliciesOpen(false);
  };

  const togglePolicies = () => {
    setIsPoliciesOpen(!isPoliciesOpen);
  };

  const handlePolicyClick = () => {
    setIsPoliciesOpen(false);
  };

  const policyItems = [
    { name: 'Terms & Conditions', href: '/policy/terms' },
    { name: 'Privacy Policy', href: '/policy/privacy' },
    { name: 'Cookie Policy', href: '/policy/cookies' },
    { name: 'Financial Conduct', href: '/policy/CoC/finance' },
    { name: 'AI & Data', href: '/policy/CoC/Ai&Data' },
  ];

  // Helper function to check if link is active
  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Helper function to get nav link classes
  const getNavLinkClasses = (href: string, baseClasses: string) => {
    const isActive = isActivePage(href);
    return `${baseClasses} ${isActive ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'}`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-emerald-100/50' 
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <motion.div 
              whileHover={isMobile ? {} : { scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <Image 
                src="/logo.png" 
                alt="Gro Logo" 
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </motion.div>
            <span className="text-2xl font-bold text-black group-hover:text-emerald-600 transition-colors duration-200">
              Gro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              href="/" 
              className={getNavLinkClasses('/', 'font-medium transition-colors duration-200 relative group')}
              onClick={() => setIsPoliciesOpen(false)}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${
                isActivePage('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/product" 
              className={getNavLinkClasses('/product', 'font-medium transition-colors duration-200 relative group')}
              onClick={() => setIsPoliciesOpen(false)}
            >
              Product
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${
                isActivePage('/product') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/about" 
              className={getNavLinkClasses('/about', 'font-medium transition-colors duration-200 relative group')}
              onClick={() => setIsPoliciesOpen(false)}
            >
              About
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${
                isActivePage('/about') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            {/* Policies Dropdown */}
            <div className="relative" data-policies-dropdown>
              <button
                onClick={togglePolicies}
                className={`flex items-center space-x-1 font-medium transition-colors duration-200 relative group cursor-pointer ${
                  pathname.startsWith('/policy') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <span>Policies</span>
                <motion.div
                  animate={{ rotate: isPoliciesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </motion.div>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${
                  pathname.startsWith('/policy') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>

              {/* Desktop Dropdown Menu */}
              <AnimatePresence>
                {isPoliciesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-emerald-100/50 py-2 z-50"
                    data-policies-dropdown
                  >
                    {policyItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handlePolicyClick}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                          pathname === item.href 
                            ? 'text-emerald-600 bg-emerald-50/50' 
                            : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* CTA Button */}
            <motion.div
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <Link 
                href="/waitlist" 
                className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 transition-all duration-200 hover:shadow-xl"
                onClick={() => setIsPoliciesOpen(false)}
              >
                Join Waitlist
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden relative z-50 p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-b border-emerald-100/50 md:hidden z-40"
            >
              <nav className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex flex-col space-y-6">
                  <Link 
                    href="/" 
                    onClick={closeMenu}
                    className={`text-lg font-medium transition-colors duration-200 py-2 ${
                      isActivePage('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/product" 
                    onClick={closeMenu}
                    className={`text-lg font-medium transition-colors duration-200 py-2 ${
                      isActivePage('/product') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                    }`}
                  >
                    Product
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={closeMenu}
                    className={`text-lg font-medium transition-colors duration-200 py-2 ${
                      isActivePage('/about') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                    }`}
                  >
                    About
                  </Link>
                  
                  {/* Mobile Policies Section */}
                  <div>
                    <button
                      onClick={togglePolicies}
                      className={`flex items-center justify-between w-full text-lg font-medium transition-colors duration-200 py-2 cursor-pointer ${
                        pathname.startsWith('/policy') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                      }`}
                    >
                      <span>Policies</span>
                      <motion.div
                        animate={{ rotate: isPoliciesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDownIcon className="h-5 w-5" />
                      </motion.div>
                    </button>
                    
                    {/* Mobile Policies Dropdown */}
                    <AnimatePresence>
                      {isPoliciesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="ml-4 mt-2 space-y-3 border-l-2 border-emerald-100 pl-4"
                        >
                          {policyItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMenu}
                              className={`block text-base transition-colors duration-200 py-1 ${
                                pathname === item.href 
                                  ? 'text-emerald-600' 
                                  : 'text-gray-600 hover:text-emerald-600'
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-gray-200">
                    <Link 
                      href="/waitlist" 
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center w-full rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-emerald-600 transition-all duration-200"
                    >
                      Join Waitlist
                    </Link>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;