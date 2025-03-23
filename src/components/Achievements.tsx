
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Trophy, Medal, Award, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedText from './AnimatedText';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: 'trophy' | 'medal' | 'award' | 'star' | 'sparkles';
  color: string;
}

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Awarde Bank Indonesia Scholarship 2024",
      organization: "Bank Indonesia",
      year: "2024",
      description: "This prestigious scholarship recognizes individuals with strong analytical skills, financial literacy, and a dedication to economic empowerment.",
      icon: 'star',
      color: 'from-purple-400 to-pink-600',
    },
    {
      id: 2,
      title: "3rd Place ASEAN Business Plan Competition",
      organization: "International Esforia 2023",
      year: "2023",
      description: "Winning 3rd place in the ASEAN Business Plan Competition reflects strong strategic planning, market analysis, and innovative business solutions on a regional scale.",
      icon: 'trophy',
      color: 'from-blue-400 to-indigo-600',
    },
    {
      id: 3,
      title: "Core Team UI/UX Google Developer on Campus",
      organization: "Google",
      year: "2025",
      description: "This position showcases expertise in design thinking, usability testing, and front-end collaboration, contributing to the growth of the tech community on campus.",
      icon: 'sparkles',
      color: 'from-yellow-300 to-amber-500',
    },
  ];

  const renderIcon = (iconName: string, className: string = "w-8 h-8") => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className={className} />;
      case 'medal':
        return <Medal className={className} />;
      case 'award':
        return <Award className={className} />;
      case 'star':
        return <Star className={className} />;
      case 'sparkles':
        return <Sparkles className={className} />;
      default:
        return <Trophy className={className} />;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-pastel-peach/5 to-pastel-mint/10"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pastel-lavender blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-pastel-peach blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-pastel-mint blur-3xl"></div>
      </div>

      {/* Floating trophies background */}
      <div className="absolute inset-0 z-0 opacity-5">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-foreground"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
              opacity: 0.3 + Math.random() * 0.7
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [Math.random() * 360, Math.random() * 360],
              opacity: [0.3 + Math.random() * 0.7, 0.3 + Math.random() * 0.7]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {renderIcon(['trophy', 'medal', 'award', 'star', 'sparkles'][Math.floor(Math.random() * 5)], `w-${Math.floor(6 + Math.random() * 10)} h-${Math.floor(6 + Math.random() * 10)}`)}
          </motion.div>
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16 reveal">
          <motion.div 
            className="inline-block mb-4 bg-gradient-to-r from-pastel-yellow/40 to-pastel-peach/40 px-4 py-1.5 rounded-full text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatedText text="Recognition & Awards" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pastel-mint to-pastel-blue bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedText text="My Achievements" tag="span" />
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatedText
              text="Celebrating milestones and recognition that showcase my dedication to excellence."
              delay={200}
            />
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setHoveredCard(achievement.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div 
                className={`h-full rounded-2xl p-6 bg-gradient-to-br ${achievement.color} backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden relative z-10`}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-white/20 p-3 rounded-xl mr-4">
                    {renderIcon(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-white/80">
                      <span>{achievement.organization}</span>
                      <span className="hidden sm:block mx-2">•</span>
                      <span>{achievement.year}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/90">{achievement.description}</p>
                
                <motion.div 
                  className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0"
                  animate={{ 
                    opacity: hoveredCard === achievement.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/achievements">
            <Button 
              variant="outline" 
              size="lg" 
              className="group bg-card/50 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center">
                Explore All Achievements
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
