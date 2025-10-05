'use client';
import React from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import TermsSections123 from './1-2-3';
import TermsSections456 from './4-5-6';
import TermsSections789 from './7-8-9';
import TermsSections101112 from './10-11-12';
import TermsSections131415 from './13-14-15';
import TermsSections161718 from './16-17-18';

const Terms = () => {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-6 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Terms and Conditions
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Please read these terms carefully before using the Gro platform.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100">
            
            {/* Document Header */}
            <div className="text-center mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">GRO TERMS AND CONDITIONS</h2>
              <p className="text-base sm:text-lg text-gray-600">Last Updated: 04/10/2025</p>
              <p className="text-base sm:text-lg text-gray-600">Effective Date: 04/10/2025</p>
            </div>

            {/* Terms Content */}
            <div className="prose prose-gray max-w-none space-y-8 sm:space-y-12">
              
              {/* Sections 1-3 */}
              <TermsSections123 />
              
              {/* Sections 4-6 */}
              <TermsSections456 />
              
              {/* Sections 7-9 */}
              <TermsSections789 />
              
              {/* Sections 10-12 */}
              <TermsSections101112 />
              
              {/* Sections 13-15 */}
              <TermsSections131415 />
              
              {/* Sections 16-18 */}
              <TermsSections161718 />
            
              {/* Document Footer */}
              <div className="text-center pt-8 sm:pt-12 border-t border-gray-200">
                <div className="space-y-2 mb-6">
                  <p className="text-base sm:text-lg text-gray-600">Last Updated: 04/10/2025</p>
                  <p className="text-base sm:text-lg text-gray-600">Effective Date: 04/10/2025</p>
                  <p className="text-base sm:text-lg text-gray-600">Version: 1.0</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-black mb-4">END OF TERMS AND CONDITIONS</p>
                <p className="text-sm text-gray-600">© 2025 Gro Equity Ltd. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;