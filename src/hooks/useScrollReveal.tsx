
import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  delay = 0,
  className = 'active',
  direction = 'up',
  distance = 30
}: ScrollRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Set initial styles for transition
    if (direction) {
      let transform = '';
      switch (direction) {
        case 'up':
          transform = `translateY(${distance}px)`;
          break;
        case 'down':
          transform = `translateY(-${distance}px)`;
          break;
        case 'left':
          transform = `translateX(${distance}px)`;
          break;
        case 'right':
          transform = `translateX(-${distance}px)`;
          break;
        default:
          transform = `translateY(${distance}px)`;
      }
      
      element.style.opacity = '0';
      element.style.transform = transform;
      element.style.transition = `opacity 0.8s ease-out, transform 0.8s ease-out`;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add(className);
              element.style.opacity = '1';
              element.style.transform = 'translate(0)';
            }, delay);
            
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            element.classList.remove(className);
            if (direction) {
              element.style.opacity = '0';
              
              let transform = '';
              switch (direction) {
                case 'up':
                  transform = `translateY(${distance}px)`;
                  break;
                case 'down':
                  transform = `translateY(-${distance}px)`;
                  break;
                case 'left':
                  transform = `translateX(${distance}px)`;
                  break;
                case 'right':
                  transform = `translateX(-${distance}px)`;
                  break;
                default:
                  transform = `translateY(${distance}px)`;
              }
              
              element.style.transform = transform;
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [className, delay, once, rootMargin, threshold, direction, distance]);
  
  return ref;
};

export default useScrollReveal;
