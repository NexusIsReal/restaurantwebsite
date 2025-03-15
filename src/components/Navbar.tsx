'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll event to change navbar appearance and track active section
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar appearance
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section for highlighting nav links
      const sections = ['about', 'menu', 'testimonials', 'contact'];
      let currentSection = '';

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to determine link classes based on scroll state and active section
  const getLinkClass = (section: string) => {
    const baseClass = 'transition-all duration-300';
    const colorClass = scrolled 
      ? 'text-secondary hover:text-primary' 
      : 'text-white hover:text-primary';
    const activeClass = activeSection === section 
      ? 'font-medium border-b-2 border-primary pb-1' 
      : '';
    
    return `${baseClass} ${colorClass} ${activeClass}`;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link 
          href="/" 
          className={`text-xl sm:text-2xl font-bold font-serif transition-colors duration-300 ${
            scrolled ? 'text-primary' : 'text-white'
          }`}
        >
          NEXUS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link 
            href="#about" 
            className={getLinkClass('about')}
          >
            About
          </Link>
          <Link 
            href="#menu" 
            className={getLinkClass('menu')}
          >
            Menu
          </Link>
          <Link 
            href="#testimonials" 
            className={getLinkClass('testimonials')}
          >
            Testimonials
          </Link>
          <Link 
            href="#contact" 
            className={getLinkClass('contact')}
          >
            Contact
          </Link>
          <Link 
            href="#reservation" 
            className={`btn btn-primary transform transition-transform duration-300 hover:scale-105 text-sm lg:text-base`}
          >
            Reserve a Table
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden focus:outline-none transition-colors z-50 ${
            isMenuOpen ? 'text-white' : (scrolled ? 'text-secondary' : 'text-white')
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-primary bg-opacity-95 z-40 flex flex-col justify-center transition-all duration-500 md:hidden ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        <div className="container py-8 flex flex-col items-center space-y-6 text-center">
          {['about', 'menu', 'testimonials', 'contact'].map((section, index) => (
            <Link 
              key={section}
              href={`#${section}`} 
              className={`text-white text-xl font-medium hover:text-secondary transition-colors transform hover:scale-105 transition-transform ${
                activeSection === section ? 'border-b-2 border-white pb-1' : ''
              } animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={toggleMenu}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
          
          <Link 
            href="#reservation" 
            className="mt-4 btn bg-white text-primary hover:bg-opacity-90 transform hover:scale-105 transition-transform animate-fade-in-up w-3/4 max-w-xs"
            style={{ animationDelay: '0.5s' }}
            onClick={toggleMenu}
          >
            Reserve a Table
          </Link>
          
          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {['facebook', 'instagram', 'twitter'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-white hover:text-secondary transition-colors transform hover:scale-110 transition-transform"
                aria-label={social}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {social === 'facebook' && (
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  )}
                  {social === 'instagram' && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  )}
                  {social === 'twitter' && (
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 