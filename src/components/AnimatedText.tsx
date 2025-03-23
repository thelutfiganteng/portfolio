
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animation?: 'fade' | 'type' | 'bounce' | 'wave' | 'highlight';
  typeSpeed?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  once = true,
  tag = 'span',
  animation = 'fade',
  typeSpeed = 50
}) => {
  const textRef = useRef<HTMLElement | null>(null);
  const Tag = tag;

  // For typing animation
  const [displayText, setDisplayText] = React.useState(animation === 'type' ? '' : text);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    // Typing animation effect
    if (animation === 'type' && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typeSpeed);
      
      return () => clearTimeout(timeout);
    }
  }, [animation, currentIndex, text, typeSpeed]);

  useEffect(() => {
    // Observer for fade/regular animation
    if (animation !== 'type' && animation !== 'wave' && animation !== 'highlight') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('animate-fade-in', 'opacity-100');
              }, delay);
              
              if (once) {
                observer.unobserve(entry.target);
              }
            } else if (!once) {
              entry.target.classList.remove('animate-fade-in', 'opacity-100');
              entry.target.classList.add('opacity-0');
            }
          });
        },
        { threshold: 0.1 }
      );

      if (textRef.current) {
        observer.observe(textRef.current);
      }

      return () => {
        if (textRef.current) {
          observer.unobserve(textRef.current);
        }
      };
    }
  }, [delay, once, animation]);

  // Framer motion variants
  const waveVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay / 1000,
        staggerChildren: 0.08
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { 
        delay: delay / 1000,
        staggerChildren: 0.05 
      }
    }
  };
  
  const highlightLetterVariants = {
    hidden: { opacity: 0, y: 0, scale: 1 },
    visible: (i: number) => ({
      opacity: 1,
      scale: [1, 1.2, 1],
      color: ['inherit', '#E0D0FF', 'inherit'],
      transition: { 
        duration: 0.5,
        delay: i * 0.05,
        type: "spring", 
        damping: 10
      }
    })
  };

  if (animation === 'wave') {
    return (
      <motion.div
        variants={waveVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className={className}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`${index}-${char}`}
            variants={letterVariants}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === 'highlight') {
    return (
      <motion.div
        variants={highlightVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className={className}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`${index}-${char}`}
            variants={highlightLetterVariants}
            custom={index}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === 'type') {
    return (
      <Tag
        ref={textRef as React.RefObject<any>}
        className={cn('', className)}
        style={{ animationDelay: `${delay}ms` }}
      >
        {displayText}
        <span className="animate-pulse">|</span>
      </Tag>
    );
  }

  if (animation === 'bounce') {
    return (
      <Tag
        ref={textRef as React.RefObject<any>}
        className={cn('opacity-0', className)}
        style={{ animationDelay: `${delay}ms` }}
      >
        {text.split('').map((char, index) => (
          <span 
            key={index} 
            className="inline-block hover:animate-bounce"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              transitionDelay: `${index * 0.05}s`
            }}
          >
            {char}
          </span>
        ))}
      </Tag>
    );
  }

  // Default fade animation
  return (
    <Tag
      ref={textRef as React.RefObject<any>}
      className={cn('opacity-0', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </Tag>
  );
};

export default AnimatedText;
