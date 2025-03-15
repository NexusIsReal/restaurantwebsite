'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState('');
  
  const sections: Section[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      let currentSection = '';
      let minDistance = Infinity;

      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          // Find the section closest to the top of the viewport
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset for fixed header (approximately 80px)
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      <div className="space-y-4">
        {sections.map((section) => (
          <div 
            key={section.id}
            className="relative group"
          >
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-primary scale-125' 
                  : 'bg-gray-300 hover:bg-primary/50'
              }`}
              aria-label={`Scroll to ${section.label}`}
            />
            <span className="absolute left-0 top-0 transform -translate-x-full -translate-y-1/4 bg-primary text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap mr-2">
              {section.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-px h-24 bg-gray-300 mt-4"></div>
    </div>
  );
} 