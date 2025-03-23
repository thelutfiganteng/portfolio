
import { Github, Instagram, Linkedin, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    // { icon: <Github className="w-5 h-5" />, url: 'https://github.com' },
    { icon: <MessageCircle className="w-5 h-5" />, url: 'https://wa.me/628983064613' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/lulutfii/' },
    { icon: <ExternalLink className="w-5 h-5" />, url: 'https://www.tiktok.com/@bahashome' },
  ];

  return (
    <footer className="py-10 md:py-16 bg-gradient-to-b from-background to-pastel-lavender/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-2xl font-semibold tracking-tight mb-3">
              <span className="text-gradient">Portfolio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#home" className="text-sm hover:text-primary-foreground transition-colors cursor-highlight">Home</a>
              <a href="#projects" className="text-sm hover:text-primary-foreground transition-colors cursor-highlight">Projects</a>
              <a href="#about" className="text-sm hover:text-primary-foreground transition-colors cursor-highlight">About</a>
              <a href="#skills" className="text-sm hover:text-primary-foreground transition-colors cursor-highlight">Skills</a>
              <a href="#contact" className="text-sm hover:text-primary-foreground transition-colors cursor-highlight">Contact</a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-foreground hover:bg-pastel-lavender/50 hover:text-white transition-all"
                aria-label={`Social link ${index + 1}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200/30 mt-8 pt-8 text-center text-xs text-muted-foreground">
          <p>Designed and built with passion and attention to detail.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
