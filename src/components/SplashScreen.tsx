
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const logoRef = useScrollReveal({ once: true, delay: 200 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete();
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          ref={logoRef}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Main Logo */}
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/80 via-secondary/60 to-accent/70 shadow-lg flex items-center justify-center">
              <LogIn className="h-16 w-16 text-primary-foreground" />
            </div>
            
            {/* Orbiting particles */}
            <motion.div
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary/80"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ transformOrigin: "center center", translate: "-50% -50%" }}
            />
            <motion.div
              className="absolute bottom-0 -left-4 h-8 w-8 rounded-full bg-secondary/80"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              style={{ transformOrigin: "center center", translate: "-50% -50%" }}
            />
            <motion.div
              className="absolute -bottom-2 right-0 h-4 w-4 rounded-full bg-accent/80"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              style={{ transformOrigin: "center center", translate: "-50% -50%" }}
            />
          </div>
        </motion.div>
        
        {/* Text Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
        >
          Welcome to My Portfolio
        </motion.h1>
        
        {/* Progress Bar */}
        <div className="w-64 md:w-80 h-2 bg-muted rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground"
        >
          {progress === 100 ? "Ready!" : "Loading..."}
        </motion.p>
      </div>
      
      {/* Background Animations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              scale: [1, Math.random() * 0.5 + 0.8],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 3 + 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SplashScreen;
