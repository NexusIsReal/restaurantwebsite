'use client';

import { useEffect, useState, useRef } from 'react';

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Critic',
      quote: 'The culinary experience at NEXUS is unmatched. Every dish tells a story of passion and creativity.',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      quote: "I've been coming here for years and the quality and service have always been exceptional. Truly a gem in the city.",
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Food Blogger',
      quote: 'From the ambiance to the flavors, everything at NEXUS is carefully crafted to provide an unforgettable dining experience.',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

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
      id="testimonials" 
      className="section bg-secondary text-white py-12 sm:py-16 md:py-20"
      ref={sectionRef}
    >
      <div className="container px-4 sm:px-6 mx-auto">
        <div 
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">What Our Guests Say</h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied guests
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg hover:bg-white/20 transition-all duration-500 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
              }}
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-3 sm:mr-4 object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg sm:text-xl">{testimonial.name}</h3>
                  <p className="text-primary text-sm sm:text-base">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-sm sm:text-base">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 