'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  const policyItems = [
    { name: 'Terms & Conditions', href: '/policies/terms' },
    { name: 'Privacy Policy', href: '/policies/privacy' },
    { name: 'Cookie Policy', href: '/policies/cookies' },
    { name: 'Financial Conduct', href: '/policies/financial-conduct' },
    { name: 'AI & Data', href: '/policies/ai-data' },
  ];

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Product', href: '/product' },
    { name: 'About', href: '/about' },
    { name: 'Join Waitlist', href: '/waitlist' },
  ];

  // Helper function to check if link is active
  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Helper function to get nav link classes
  const getNavLinkClasses = (href: string) => {
    const isActive = isActivePage(href);
    return `transition-colors duration-150 text-sm sm:text-base lg:text-lg ${
      isActive 
        ? 'text-emerald-400 font-medium' 
        : 'text-gray-400 hover:text-emerald-400'
    }`;
  };

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2">
            <div className="mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-white">Gro</span>
            </div>
            <p className="text-gray-400 max-w-md text-base sm:text-lg leading-relaxed">
              Goals • Returns • Outcomes. The investing app that actually gets you. 
              Building wealth for the next generation, one goal at a time.
            </p>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Navigation</h3>
            <ul className="space-y-3 sm:space-y-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={getNavLinkClasses(item.href)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Policies</h3>
            <ul className="space-y-3 sm:space-y-4">
              {policyItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`transition-colors duration-150 text-sm sm:text-base lg:text-lg ${
                      pathname === item.href 
                        ? 'text-emerald-400 font-medium' 
                        : 'text-gray-400 hover:text-emerald-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-6 sm:pt-8">
          <p className="text-center text-gray-400 text-sm sm:text-base lg:text-lg">
            &copy; 2025 Gro Equity Ltd. All rights reserved. Made with love for the future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;