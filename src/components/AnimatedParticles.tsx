
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../components/ThemeProvider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  glowing?: boolean;
  pulse?: boolean;
  pulseSpeed?: number;
  pulseDirection?: boolean;
  pulseAmount?: number;
}

interface AnimatedParticlesProps {
  count?: number;
  speed?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  className?: string;
  connectParticles?: boolean;
  interactivity?: boolean;
  bounciness?: number;
  glowEffect?: boolean;
  mousePush?: boolean;
  maxConnectDistance?: number;
}

const AnimatedParticles = ({
  count = 30,
  speed = 1,
  colors = ['#646cff', '#61dafb', '#f3f3f3', '#9c1aff'],
  minSize = 1,
  maxSize = 5,
  className = '',
  connectParticles = true,
  interactivity = true,
  bounciness = 1.0,
  glowEffect = true,
  mousePush = true,
  maxConnectDistance = 150,
}: AnimatedParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef<{x: number, y: number} | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;
    
    // Adjust particle colors based on theme
    const themeColors = isDarkMode 
      ? colors 
      : colors.map(color => {
          // Make colors darker for light mode
          const darkColor = color.replace(/^#/, '');
          const r = parseInt(darkColor.slice(0, 2), 16);
          const g = parseInt(darkColor.slice(2, 4), 16);
          const b = parseInt(darkColor.slice(4, 6), 16);
          return `rgba(${r}, ${g}, ${b}, 0.7)`;
        });
    
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
      
      // Reinitialize particles on resize
      initParticles();
    };
    
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
        const size = Math.random() * (maxSize - minSize) + minSize;
        const hasGlow = glowEffect && Math.random() > 0.7;
        const shouldPulse = Math.random() > 0.5;
        
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color: randomColor,
          opacity: Math.random() * 0.5 + 0.1,
          glowing: hasGlow,
          pulse: shouldPulse,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulseDirection: Math.random() > 0.5,
          pulseAmount: Math.random() * 0.5 + 0.5
        });
      }
    };
    
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const mouseLeaveHandler = () => {
      mousePositionRef.current = null;
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach((particle, i) => {
        // Update pulse effect
        if (particle.pulse && particle.pulseSpeed && particle.pulseDirection !== undefined && particle.pulseAmount) {
          if (particle.pulseDirection) {
            particle.opacity += particle.pulseSpeed;
            if (particle.opacity >= particle.pulseAmount) {
              particle.pulseDirection = false;
            }
          } else {
            particle.opacity -= particle.pulseSpeed;
            if (particle.opacity <= 0.1) {
              particle.pulseDirection = true;
            }
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Add glow effect
        if (particle.glowing) {
          const glow = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          
          // Fix: Properly format the color with opacity
          const opacityHex = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
          glow.addColorStop(0, particle.color.includes('rgba') ? particle.color : `${particle.color}${opacityHex}`);
          glow.addColorStop(1, 'transparent');
          
          ctx.fillStyle = glow;
          ctx.fillRect(
            particle.x - particle.size * 2,
            particle.y - particle.size * 2,
            particle.size * 4,
            particle.size * 4
          );
        }
        
        // Fix: Properly format the color with opacity
        const opacityHex = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = particle.color.includes('rgba') ? particle.color : `${particle.color}${opacityHex}`;
        ctx.fill();
        
        // Connect particles
        if (connectParticles) {
          particlesRef.current.forEach((particle2, j) => {
            if (i !== j) {
              const dx = particle.x - particle2.x;
              const dy = particle.y - particle2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < maxConnectDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${isDarkMode ? '255,255,255' : '0,0,0'},${0.1 * (1 - distance / maxConnectDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.stroke();
              }
            }
          });
        }
        
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Mouse interaction
        if (interactivity && mousePositionRef.current) {
          const dx = particle.x - mousePositionRef.current.x;
          const dy = particle.y - mousePositionRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxForceDistance = 150;
          
          if (distance < maxForceDistance && mousePush) {
            const force = (maxForceDistance - distance) / maxForceDistance;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;
            
            particle.x += directionX * force * 2;
            particle.y += directionY * force * 2;
          }
        }
        
        // Bounce off edges
        if (particle.x - particle.size <= 0 || particle.x + particle.size >= width) {
          particle.speedX *= -bounciness;
          particle.x = Math.max(particle.size, Math.min(width - particle.size, particle.x));
        }
        
        if (particle.y - particle.size <= 0 || particle.y + particle.size >= height) {
          particle.speedY *= -bounciness;
          particle.y = Math.max(particle.size, Math.min(height - particle.size, particle.y));
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    // Initialize everything
    if (interactivity) {
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseleave', mouseLeaveHandler);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawParticles();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactivity) {
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseleave', mouseLeaveHandler);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speed, colors, minSize, maxSize, connectParticles, interactivity, bounciness, glowEffect, mousePush, maxConnectDistance, isDarkMode]);
  
  return (
    <div ref={containerRef} className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};

export default AnimatedParticles;
