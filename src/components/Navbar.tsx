
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Briefcase, User, Award, BookOpen, PhoneCall, Trophy } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const Navbar = ({ activeSection, scrollToSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  const navItems = [
    { label: 'Home', icon: <Home className="w-4 h-4" />, section: 'home' },
    { label: 'Projects', icon: <Briefcase className="w-4 h-4" />, section: 'projects' },
    { label: 'About', icon: <User className="w-4 h-4" />, section: 'about' },
    { label: 'Skills', icon: <BookOpen className="w-4 h-4" />, section: 'skills' },
    { label: 'Achievements', icon: <Trophy className="w-4 h-4" />, section: 'achievements' },
    { label: 'Certifications', icon: <Award className="w-4 h-4" />, section: 'certifications' },
    { label: 'Contact', icon: <PhoneCall className="w-4 h-4" />, section: 'contact' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMobile]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleNavItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-sm",
        isScrolled 
          ? "py-3 bg-background/80 shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          onClick={() => handleNavItemClick('home')}
        >
          Portfolio
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.section}
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-1.5",
                activeSection === item.section 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-primary/5"
              )}
              onClick={() => handleNavItemClick(item.section)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center">
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-2 relative z-[60]"
            onClick={toggleMenu}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div 
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav 
              className="container mx-auto px-4 flex flex-col space-y-3 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    className={cn(
                      "flex items-center justify-start gap-3 w-full",
                      activeSection === item.section 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-primary/5"
                    )}
                    onClick={() => handleNavItemClick(item.section)}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
