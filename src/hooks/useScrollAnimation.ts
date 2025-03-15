'use client';

import { useState, useEffect, useRef } from 'react';

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationDelay?: number;
};

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

export function useScrollAnimation(
  direction: AnimationDirection = 'up',
  options: AnimationOptions = {}
) {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true,
    animationDelay = 0 
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we've already animated and triggerOnce is true, do nothing
        if (hasAnimated.current && triggerOnce) return;
        
        if (entry.isIntersecting) {
          // Delay the animation if specified
          if (animationDelay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              hasAnimated.current = true;
            }, animationDelay);
          } else {
            setIsVisible(true);
            hasAnimated.current = true;
          }
          
          // If triggerOnce is true, unobserve after animation
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          // If not triggerOnce, toggle visibility off when out of view
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin, triggerOnce, animationDelay]);

  return { ref, isVisible };
}

// Helper function to get animation classes based on direction
export function getAnimationClasses(direction: AnimationDirection, isVisible: boolean): string {
  const baseClasses = 'transition-all duration-1000';
  
  const directionClasses = {
    up: isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-16',
    down: isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 -translate-y-16',
    left: isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 translate-x-16',
    right: isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 -translate-x-16',
    fade: isVisible 
      ? 'opacity-100' 
      : 'opacity-0',
  };
  
  return `${baseClasses} ${directionClasses[direction]}`;
} 