
import { ArrowDown, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-24 pb-16 px-6"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-pastel-lavender/30 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pastel-blue/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-pastel-mint/30 rounded-full filter blur-3xl animate-pulse"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 right-1/4 animate-spin-slow opacity-70">
        <Star size={24} className="text-pastel-yellow" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float opacity-70" style={{ animationDelay: '1.5s' }}>
        <Star size={18} className="text-pastel-pink" />
      </div>

      <div className={`container mx-auto max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center stagger-animation">
          <div className="inline-block mb-4 bg-pastel-lavender/30 px-4 py-1.5 rounded-full text-sm font-medium animate-fade-in">
            <AnimatedText text="Welcome to my creative portfolio" delay={300} />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            <AnimatedText 
              text="Passionately crafting" 
              tag="span" 
              className="block" 
              delay={500} 
            />
            <AnimatedText 
              text="beautiful digital experiences with a fully digital approach" 
              tag="span" 
              className="block text-gradient" 
              delay={700} 
            />
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in">
            <AnimatedText 
              text="I create modern websites and applications, maximizing the power of Artificial Intelligence to drive business growth and success."
              delay={900}
            />
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '1100ms' }}>
            <button 
              onClick={scrollToProjects}
              className="px-8 py-3 rounded-full bg-pastel-lavender text-primary-foreground font-medium transition-all hover:shadow-lg hover:shadow-pastel-lavender/30 hover:-translate-y-1 active:translate-y-0 overflow-hidden group relative"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
            
            <a 
              href="#contact" 
              className="px-8 py-3 rounded-full border-2 border-pastel-lavender/50 font-medium hover:border-pastel-lavender transition-all hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown size={24} className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
