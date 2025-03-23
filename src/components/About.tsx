
import { useEffect, useRef } from 'react';
import { Heart, Star, Zap } from 'lucide-react';
import AnimatedText from './AnimatedText';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Initial check
    
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '20+', label: 'Projects Completed' },
    { number: '20+', label: 'Happy Clients' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pastel-mint/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pastel-blue/20 rounded-full filter blur-3xl"></div>
      
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image side */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl reveal">
            <div className="absolute -inset-4 bg-gradient-to-r from-pastel-lavender via-pastel-blue to-pastel-mint opacity-30 blur-xl"></div>
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl">
              <img 
                src="public/photo.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating decorations */}
              <div className="absolute top-4 left-4 glass-effect p-3 rounded-xl backdrop-blur-md shadow-md transform -rotate-3 animate-float">
                <Heart className="text-pastel-pink w-5 h-5" />
              </div>
              
              <div className="absolute bottom-6 right-6 glass-effect p-3 rounded-xl backdrop-blur-md shadow-md transform rotate-6" style={{ animationDelay: '1s' }}>
                <Star className="text-pastel-yellow w-5 h-5 animate-pulse" />
              </div>
              
              <div className="absolute bottom-20 left-8 glass-effect p-3 rounded-xl backdrop-blur-md shadow-md transform rotate-12 animate-float" style={{ animationDelay: '2s' }}>
                <Zap className="text-pastel-blue w-5 h-5" />
              </div>
            </div>
          </div>
          
          {/* Content side */}
          <div className="reveal">
            <div className="inline-block mb-4 bg-pastel-peach/40 px-4 py-1.5 rounded-full text-sm font-medium">
              <AnimatedText text="About Me" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <AnimatedText text="Passionate designer & developer creating" tag="span" className="block" />
              <AnimatedText text="beautiful digital experiences" tag="span" className="block text-gradient" delay={200} />
            </h2>
            
            <div className="space-y-4 mb-8 text-muted-foreground">
              <p className="reveal">
                <AnimatedText 
                  text="I'm Muhammad Lutfi Kurniawan, a passionate web developer and designer with a strong focus on creating beautiful, functional, and user-friendly websites and applications."
                  delay={300}
                />
              </p>
              <p className="reveal">
                <AnimatedText 
                  text="As a student at Politeknik Negeri Sriwijaya, majoring in Informatics, I have been recognized as a Bank Indonesia Scholarship Awardee for Outstanding Students, reflecting my dedication to academic excellence and innovation."
                  delay={400}
                />
              </p>
              <p className="reveal">
                <AnimatedText 
                  text="With 3+ years of experience, I specialize in front-end development using modern technologies like React, Livewire, and Tailwind CSS. I thrive on creative projects, bringing ideas to life through clean code and thoughtful design, ensuring seamless user experiences and aesthetic appeal. 🚀🎨"
                  delay={500}
                />
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center reveal" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-1">
                    <AnimatedText text={stat.number} delay={600 + (index * 100)} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <AnimatedText text={stat.label} delay={700 + (index * 100)} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="reveal" style={{ animationDelay: '800ms' }}>
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 rounded-full bg-pastel-blue/80 text-primary-foreground font-medium hover:bg-pastel-blue transition-all hover:shadow-lg hover:shadow-pastel-blue/20 hover:-translate-y-1 active:translate-y-0"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
