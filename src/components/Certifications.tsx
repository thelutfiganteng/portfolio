
import { useState, useEffect } from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CertificationModal from './CertificationModal';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  badgeColor: string;
  category: string;
  image: string;
  link?: string;
}

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const certifications: Certification[] = [
    {
      id: 1,
      title: "Mobile Developer",
      issuer: "Kominfo",
      date: "2023",
      description: "Professional certification in mobile application development focusing on industry-standard practices and methodologies.",
      badgeColor: "bg-pastel-blue",
      category: "Technology",
      image: "public/redesign.jpg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    },
    {
      id: 2,
      title: "Content Creator",
      issuer: "Bank Indonesia",
      date: "2024",
      description: "Certification in content creation, covering strategic planning, production, and distribution across digital platforms.",
      badgeColor: "bg-pastel-pink",
      category: "Media",
      image: "/placeholder.svg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    },
    {
      id: 3,
      title: "Accounting",
      issuer: "BNSP",
      date: "2022",
      description: "Professional certification in financial accounting, covering financial reporting, analysis, and management techniques.",
      badgeColor: "bg-pastel-mint",
      category: "Finance",
      image: "/placeholder.svg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    },
    {
      id: 4,
      title: "AWS Cloud Computing",
      issuer: "Dicoding",
      date: "2023",
      description: "Earning a Cloud Computing Certification demonstrates expertise in cloud architecture, security, deployment, and management across platforms.",
      badgeColor: "bg-pastel-lavender",
      category: "Technology",
      image: "/placeholder.svg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    },
    {
      id: 5,
      title: "Digital Entrepreneurship",
      issuer: "Kominfo",
      date: "2024",
      description: "The Digital Entrepreneurship Certification validates expertise in online business strategies, digital marketing, e-commerce, and innovation-driven entrepreneurship.",
      badgeColor: "bg-pastel-orange",
      category: "Technology",
      image: "/placeholder.svg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    }
  ];

  const handleOpenModal = (cert: Certification) => {
    setSelectedCertification(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCertification(null), 300); // Clear data after animation completes
  };

  useEffect(() => {
    const handleReveal = () => {
      const element = document.getElementById('certifications');
      if (element) {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Initial check
    
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  return (
    <section 
      id="certifications" 
      className="py-20 md:py-32 bg-gradient-to-b from-background to-pastel-peach/10"
    >
      <div className="section-container">
        <div className="text-center mb-16 reveal">
          <div className="inline-block mb-4 bg-pastel-peach/40 px-4 py-1.5 rounded-full text-sm font-medium">
            <AnimatedText text="Certifications" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Professional Credentials" tag="span" />
          </h2>
          
          <p className="max-w-2xl mx-auto text-muted-foreground">
            <AnimatedText
              text="Industry-recognized certifications that validate my expertise and professional knowledge."
              delay={200}
            />
          </p>
        </div>
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {certifications.map((cert, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="border-none shadow-xl hover:shadow-2xl transition-all dark:bg-card/60 backdrop-blur-sm hover:scale-105 h-full">
                      <CardContent className="flex flex-col p-6 h-full">
                        <div className={`${cert.badgeColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                        <div className="text-sm text-muted-foreground mb-3">
                          {cert.issuer} • {cert.date}
                        </div>
                        <p className="text-muted-foreground flex-grow">{cert.description}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-4 self-end"
                          onClick={() => handleOpenModal(cert)}
                        >
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static transform-none mx-1" />
              <CarouselNext className="static transform-none mx-1" />
            </div>
          </Carousel>
          
          <div className="flex justify-center mt-10 reveal">
            <Link to="/achievements">
              <Button 
                variant="outline" 
                size="lg" 
                className="group animate-pulse hover:animate-none bg-card/50 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary transition-all duration-300"
              >
                See All Achievements
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Award icon decoration */}
        <div className="absolute -left-20 top-1/2 text-pastel-peach/10 animate-float hidden lg:block">
          <Award size={180} strokeWidth={0.5} />
        </div>
      </div>

      {/* Certification Modal */}
      <CertificationModal 
        certification={selectedCertification}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Certifications;
