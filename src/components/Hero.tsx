'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-secondary text-white overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transform scale-105 transition-transform duration-10000 ease-in-out animate-slow-zoom"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className={`container relative z-10 text-center px-4 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Experience Culinary Excellence at <span className="text-primary">NEXUS</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
          Indulge in a symphony of flavors crafted with passion and the finest ingredients
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link 
            href="#menu" 
            className="btn btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto"
          >
            Explore Our Menu
          </Link>
          <Link 
            href="#reservation" 
            className="btn bg-white text-secondary hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto"
          >
            Reserve a Table
          </Link>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
        <a href="#about" className="block">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 sm:h-8 sm:w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </a>
      </div>
    </section>
  );
} 