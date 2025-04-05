
import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Github, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoVideoUrl?: string;
  featured?: boolean;
  index: number;
  onWatchDemo?: (videoUrl: string, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  demoVideoUrl,
  featured = false,
  index,
  onWatchDemo,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic delay based on index
  const delay = 100 + (index * 150);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  const handleWatchDemo = () => {
    if (demoVideoUrl && onWatchDemo) {
      onWatchDemo(demoVideoUrl, title);
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative rounded-2xl overflow-hidden transition-all duration-700 ease-out',
        featured ? 'col-span-1 md:col-span-2' : 'col-span-1',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/50 z-10"></div>
      <div 
        className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20"
      ></div>
      
      <div 
        className="relative w-full h-72 md:h-80 transition-all duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-8 transition-all duration-300">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3 transition-all duration-500 ease-out">
          {tags.map((tag, i) => (
            <span 
              key={i}
              className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                transform: `translateY(${isHovered ? '0' : '10px'})`,
                opacity: isHovered ? 1 : 0,
                transitionDelay: `${i * 50}ms`,
                transition: 'all 0.3s ease-out',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title and description */}
        <h3 
          className="text-xl md:text-2xl font-bold text-white mb-2 transition-all duration-300 ease-out transform group-hover:-translate-y-1"
        >
          {title}
        </h3>
        
        <p 
          className="text-sm text-white/80 mb-4 max-w-md transition-all duration-300 ease-out transform"
          style={{
            maxHeight: isHovered ? '100px' : '0',
            opacity: isHovered ? 1 : 0,
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
        
        {/* Buttons */}
        <div 
          className="flex items-center gap-3 transform transition-all duration-300 ease-out"
          style={{
            transform: `translateY(${isHovered ? '0' : '20px'})`,
            opacity: isHovered ? 1 : 0,
          }}
        >
          {demoVideoUrl && (
            <button
              onClick={handleWatchDemo}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Play size={16} /> Watch Demo
            </button>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-white text-black hover:bg-opacity-90 transition-all"
            >
              Live Demo <ArrowUpRight size={16} />
            </a>
          )}
          
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
            >
              <Github size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
