'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight * 100;
      setScrollProgress(scrollPercent);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);

    // Call once to set initial state
    updateScrollProgress();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200">
      <div 
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
} 