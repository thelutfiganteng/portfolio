
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedParticles from '@/components/AnimatedParticles';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Add scroll reveal effect
  useEffect(() => {
    // Function to check if elements should be revealed
    const scrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        } else {
          // Optional: Remove the active class if the element is no longer in view
          // Uncomment the next line to enable this behavior
          // reveal.classList.remove('active');
        }
      });
    };
    
    // Function to determine active section based on scroll position
    const determineActiveSection = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const sectionId = section.getAttribute('id') || '';
        const sectionTop = section.getBoundingClientRect().top;
        const offset = window.innerHeight * 0.3; // Activate when section is 30% in view
        
        if (sectionTop < offset && sectionTop > -section.clientHeight + offset) {
          setActiveSection(sectionId);
          
          // Add entering viewport animation
          if (!section.classList.contains('entering-viewport')) {
            section.classList.add('entering-viewport');
          }
        }
      });
    };
    
    // Combined scroll handler
    const handleScroll = () => {
      scrollReveal();
      determineActiveSection();
    };
    
    // Set page as loaded for animations
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 500);
    
    // Initial check and add scroll event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // Activate staggered children on initial load
    const staggeredElements = document.querySelectorAll('.stagger-children');
    staggeredElements.forEach(element => {
      element.classList.add('active');
    });
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced smooth scrolling to sections with animation
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Mark the section as active for highlighting in the navbar
      setActiveSection(sectionId);
      
      // Add a class to the body to prevent scroll during animation
      document.body.classList.add('is-animating');
      
      // Calculate offset to account for fixed navbar
      const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = section.offsetTop - navbarHeight;
      
      // Use smooth scrolling with animation
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Add highlight animation to the target section
      section.classList.add('section-highlight');
      
      // Remove animation classes after animation completes
      setTimeout(() => {
        document.body.classList.remove('is-animating');
        section.classList.remove('section-highlight');
      }, 1000);
    }
  };

  // Pass the active section and scroll function to Navbar
  return (
    <div className={`min-h-screen overflow-hidden transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Add particle background for visual interest */}
      <AnimatedParticles count={50} speed={0.3} />
      
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
      
      {/* Decorative animated elements */}
      <div className="fixed -z-10 top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-30 floating"></div>
      <div className="fixed -z-10 bottom-20 right-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl opacity-20 breathe"></div>
      <div className="fixed -z-10 top-1/2 left-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-10 rotate-slow"></div>
    </div>
  );
};

export default Index;
