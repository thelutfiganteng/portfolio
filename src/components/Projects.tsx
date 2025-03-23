
import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import AnimatedText from './AnimatedText';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const projects = [
    {
      title: 'Modern E-commerce Platform with AI Agent CRM System',
      description: 'Modern e-commerce platform integrates an advanced AI-powered CRM system, revolutionizing customer engagement and business operations.',
      image: 'public/crm.jpg',
      tags: ['React', 'Node.js', 'Laravel', 'Livewire', 'AI'],
      // liveUrl: '#',
      // githubUrl: '#',
      featured: true,
    },
    {
      title: 'Portfolio Website',
      description: 'A beautiful and responsive portfolio website built with modern web technologies.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop',
      tags: ['React', 'Tailwind CSS', 'Framer Motion'],
      // liveUrl: '#',
      // githubUrl: '#',
      featured: false,
    },
    {
      title: 'Inventory Management with Stocks AI',
      description: 'AI-powered Inventory Management System optimizes stock control with real-time tracking, demand forecasting, and automated restocking.',
      image: 'public/InventoryManagement.jpg',
      tags: ['React', 'Livewire', 'AI'],
      // liveUrl: '#',
      // githubUrl: '#',
      featured: false,
    },
    {
      title: 'App Tracking Trash',
      description: 'Our smart waste tracking app leverages real-time monitoring and AI-driven analytics to optimize waste collection and management. With GPS tracking, data visualization, and smart notifications.',
      image: 'public/trackingTrash.jpg',
      tags: ['JavaScript', 'Maps API', 'CSS'],
      // liveUrl: '#',
      // githubUrl: '#',
      featured: false,
    },
    {
      title: 'Management Loan System and Tracking Dokument with IOT',
      description: 'Our Management Loan System integrates IoT-powered document tracking to streamline loan processing, enhance security, and improve efficiency. With real-time tracking, automated workflows, and smart notifications.',
      image: 'public/loanManagement.jpg',
      tags: ['React Native', 'API Integration', 'IOT'],
      // liveUrl: '#',
      // githubUrl: '#',
      featured: false,
    },
    {
      title: 'Modern Design Institution System Management',
      description: 'With an intuitive UI/UX, AI-driven analytics, and cloud-based infrastructure, institutions can enhance operational efficiency, automate administrative tasks, and provide a seamless learning experience.',
      image: 'public/redesign.jpg',
      tags: ['React', 'CSS', 'Node JS'],
      // liveUrl: '#',
      // githubUrl: '#',
      featured: false,
    },
    {
      title: 'Jersey Design',
      description: 'Custom jersey design service combines creativity, innovation, and high-quality materials to deliver unique and performance-driven apparel.',
      image: 'public/DesignJersey.png',
      tags: ['Adobe Photoshop', 'Illustration', 'Canva'],
      // liveUrl: '#',
      // githubUrl: '#',
      featured: true,
    },
  ];

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

  return (
    <section id="projects" className="py-20 md:py-32 bg-gradient-to-b from-background to-pastel-lavender/10" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16 reveal">
          <div className="inline-block mb-4 bg-pastel-blue/30 px-4 py-1.5 rounded-full text-sm font-medium">
            <AnimatedText text="My Recent Work" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Featured Projects" tag="span" />
          </h2>
          
          <p className="max-w-2xl mx-auto text-muted-foreground">
            <AnimatedText
              text="A showcase of my best work across web development, design, and creative coding."
              delay={200}
            />
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              // liveUrl={project.liveUrl}
              // githubUrl={project.githubUrl}
              featured={project.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
