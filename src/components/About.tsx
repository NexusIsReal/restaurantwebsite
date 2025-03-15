'use client';

import { useEffect, useState, useRef } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      className="section bg-light py-12 sm:py-16 md:py-20"
      ref={sectionRef}
    >
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div 
            className={`relative transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <div 
                className="w-full h-full transform hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-primary rounded-lg hidden sm:block"></div>
          </div>
          
          {/* Content */}
          <div 
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Story</h2>
            <p className="mb-4 sm:mb-6 text-base sm:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
              nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam
              nisl nisl sit amet nisl. Sed euismod, nunc sit amet ultricies lacinia,
              nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg">
              Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl,
              eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc sit amet ultricies
              lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-primary">Finest Ingredients</h3>
                <p className="text-sm sm:text-base">We source only the freshest and highest quality ingredients.</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-primary">Expert Chefs</h3>
                <p className="text-sm sm:text-base">Our team of world-class chefs brings creativity to every dish.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 