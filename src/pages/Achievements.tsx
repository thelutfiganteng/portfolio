import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Trophy, Medal, ArrowLeft, Calendar, Building, ExternalLink } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import CertificationModal from '@/components/CertificationModal';
import CompetitionModal from '@/components/CompetitionModal';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: string;
  image: string;
  link?: string;
}

interface Competition {
  id: number;
  title: string;
  organizer: string;
  date: string;
  position: string;
  description: string;
  category: string;
  image: string;
  team?: string[];
  link?: string;
}

const Achievements = () => {
  const [activeTab, setActiveTab] = useState('certifications');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentCertPage, setCurrentCertPage] = useState(1);
  const [currentCompPage, setCurrentCompPage] = useState(1);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  const itemsPerPage = 6;

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Mobile Developer",
      issuer: "Kominfo",
      date: "2023",
      description: "Professional certification in mobile application development focusing on industry-standard practices and methodologies.",
      category: "Technology",
      image: "/placeholder.svg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    },
    {
      id: 2,
      title: "Content Creator",
      issuer: "Bank Indonesia",
      date: "2024",
      description: "Certification in content creation, covering strategic planning, production, and distribution across digital platforms.",
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
      category: "Finance",
      image: "/placeholder.svg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    },
    {
      id: 4,
      title: "Cloud Computing",
      issuer: "Dicoding",
      date: "2023",
      description: "Earning a Cloud Computing Certification demonstrates expertise in cloud architecture, security, deployment, and management across platforms.",
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
      category: "Technology",
      image: "/placeholder.svg",
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/certifications/"
    }
  ];

  const competitions: Competition[] = [
    {
      id: 1,
      title: "1st Place National Entrepreneur Awards",
      organizer: "University Of Perbankan Nasional",
      date: "2023",
      position: "1st Place",
      description: "Achieving 1st place in the National Entrepreneur Awards is a testament to innovation, strategic business development, and impactful entrepreneurship.",
      category: "Entrepreneurship",
      image: "/placeholder.svg",
      team: ["Lutfi Kurniawan"],
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/honors/"
    },
    {
      id: 2,
      title: "3rd Place ASEAN Business Plan Competition",
      organizer: "International Esforia 2023",
      date: "2023",
      position: "3rd Place",
      description: "Winning 3rd place in the ASEAN Business Plan Competition reflects strong strategic planning, market analysis, and innovative business solutions on a regional scale.",
      category: "Entrepreneurship",
      image: "/placeholder.svg",
      team: ["Lutfi Kurniawan"],
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/honors/"
    },
    {
      id: 3,
      title: "5th Place Photography Competition",
      organizer: "Disporapar Banyuasin",
      date: "2024",
      position: "5th",
      description: "Achieving 4th place in the Photography Competition showcases creativity, technical skills, and a unique artistic vision.",
      category: "Photography",
      image: "/placeholder.svg",
      team: ["Lutfi Kurniawan"],
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/honors/"
    },
    {
      id: 4,
      title: "2nd Place Accounting Competition",
      organizer: "Ikatan Akuntansi Indonesia",
      date: "2022",
      position: "2nd",
      description: "Competing at a high level, this recognition highlights precision, problem-solving skills, and deep knowledge of accounting principles.",
      category: "Accounting",
      image: "/placeholder.svg",
      team: ["Lutfi Kurniawan"],
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/honors/"
    },
    {
      id: 5,
      title: "Top 7 National ICO Product Competition",
      organizer: "Telkom Indonesia",
      date: "2024",
      position: "7th Place",
      description: "Achieving Top 7 in the National ICO Product Competition highlights innovation, strategic planning, and technical expertise in Initial Coin Offering (ICO) product development.",
      category: "Entrepreneurship",
      image: "/placeholder.svg",
      team: ["Lutfi Kurniawan"],
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/honors/"
    },
    {
      id: 6,
      title: "Best Innovation Product",
      organizer: "GenBI Kalimantan Selatan",
      date: "2024",
      position: "Finalist",
      description: "The Best Innovation Product award recognizes outstanding creativity, technological advancement, and market impact.",
      category: "Entrepreneurship",
      image: "/placeholder.svg",
      team: ["Lutfi Kurniawan"],
      link: "https://www.linkedin.com/in/muhammad-lutfi-kurniawan-b38761248/details/honors/"
    }
  ];

  const totalCertPages = Math.ceil(certifications.length / itemsPerPage);
  const totalCompPages = Math.ceil(competitions.length / itemsPerPage);
  
  const currentCertifications = certifications.slice(
    (currentCertPage - 1) * itemsPerPage, 
    currentCertPage * itemsPerPage
  );
  
  const currentCompetitions = competitions.slice(
    (currentCompPage - 1) * itemsPerPage, 
    currentCompPage * itemsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleOpenCertModal = (cert: Certification) => {
    setSelectedCertification(cert);
    setIsCertModalOpen(true);
  };

  const handleCloseCertModal = () => {
    setIsCertModalOpen(false);
    setTimeout(() => setSelectedCertification(null), 300);
  };

  const handleOpenCompModal = (comp: Competition) => {
    setSelectedCompetition(comp);
    setIsCompModalOpen(true);
  };

  const handleCloseCompModal = () => {
    setIsCompModalOpen(false);
    setTimeout(() => setSelectedCompetition(null), 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 relative">
          <Link to="/" className="absolute -top-2 left-0">
            <Button variant="ghost" className="group flex items-center gap-2 hover:bg-transparent">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Button>
          </Link>
          
          <div className="text-center mb-8 reveal">
            <div className="inline-block mb-4 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium">
              <AnimatedText text="My Journey" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <AnimatedText text="Achievements & Awards" tag="span" />
            </h1>
            
            <p className="max-w-2xl mx-auto text-muted-foreground">
              <AnimatedText
                text="A collection of professional certifications and competition achievements throughout my career."
                delay={200}
              />
            </p>
          </div>
        </div>

        <Tabs defaultValue="certifications" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="certifications" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Certifications</span>
            </TabsTrigger>
            <TabsTrigger value="competitions" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Competitions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certifications" className={`space-y-8 transition-all duration-500 ${activeTab === 'certifications' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded && activeTab === 'certifications' ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentCertifications.map((cert) => (
                <motion.div key={cert.id} variants={itemVariants}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none shadow-md dark:bg-card/60 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {cert.category}
                        </Badge>
                        <div className="text-muted-foreground text-sm flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {cert.date}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{cert.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {cert.issuer}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {cert.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-auto group"
                        onClick={() => handleOpenCertModal(cert)}
                      >
                        View
                        <ExternalLink className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {totalCertPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentCertPage(prev => Math.max(prev - 1, 1))}
                      className={currentCertPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalCertPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        onClick={() => setCurrentCertPage(index + 1)}
                        isActive={currentCertPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentCertPage(prev => Math.min(prev + 1, totalCertPages))}
                      className={currentCertPage === totalCertPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>

          <TabsContent value="competitions" className={`space-y-8 transition-all duration-500 ${activeTab === 'competitions' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded && activeTab === 'competitions' ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentCompetitions.map((comp) => (
                <motion.div key={comp.id} variants={itemVariants}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none shadow-md dark:bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="mb-2">
                          {comp.category}
                        </Badge>
                        <HoverCard>
                          <HoverCardTrigger>
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer">
                              {comp.position}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-64">
                            <div className="flex justify-center mb-2">
                              <Trophy className="text-amber-500 w-8 h-8" />
                            </div>
                            <p className="text-center font-medium">{comp.position}</p>
                            <p className="text-center text-sm text-muted-foreground">
                              {comp.title} - {comp.date}
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <CardTitle className="line-clamp-2">{comp.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {comp.organizer} • {comp.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {comp.description}
                      </p>
                      
                      {comp.team && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Team:</p>
                          <div className="flex flex-wrap gap-1">
                            {comp.team.map((member, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-auto group"
                        onClick={() => handleOpenCompModal(comp)}
                      >
                        View Project
                        <ExternalLink className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {totalCompPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentCompPage(prev => Math.max(prev - 1, 1))}
                      className={currentCompPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalCompPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        onClick={() => setCurrentCompPage(index + 1)}
                        isActive={currentCompPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentCompPage(prev => Math.min(prev + 1, totalCompPages))}
                      className={currentCompPage === totalCompPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CertificationModal 
        certification={selectedCertification}
        isOpen={isCertModalOpen}
        onClose={handleCloseCertModal}
      />
      
      <CompetitionModal 
        competition={selectedCompetition}
        isOpen={isCompModalOpen}
        onClose={handleCloseCompModal}
      />
    </div>
  );
};

export default Achievements;
