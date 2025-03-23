import { useState, useEffect, useRef } from 'react';
import { Code, Pencil, Layout, Database, Globe, Smartphone } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  bgColor: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState<boolean[]>([]);
  
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: <Layout className="w-5 h-5" />,
      bgColor: 'bg-pastel-lavender',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Livewire', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'JavaScript', level: 90 },
      ],
    },
    {
      title: 'Backend',
      icon: <Database className="w-5 h-5" />,
      bgColor: 'bg-pastel-mint',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Laravel', level: 85 },
        { name: 'MongoDB', level: 75 },
        { name: 'SQL', level: 70 },
        // { name: 'GraphQL', level: 65 },
      ],
    },
    {
      title: 'Design',
      icon: <Pencil className="w-5 h-5" />,
      bgColor: 'bg-pastel-pink',
      skills: [
        { name: 'Figma', level: 90 },
        { name: 'UI/UX', level: 95 },
        { name: 'Adobe Photoshop', level: 95 },
        { name: 'Prototyping', level: 90 },
        { name: 'Illustration', level: 85 },
      ],
    },
    {
      title: 'Mobile',
      icon: <Smartphone className="w-5 h-5" />,
      bgColor: 'bg-pastel-peach',
      skills: [
        { name: 'React Native', level: 85 },
        { name: 'Flutter', level: 60 },
        { name: 'App Design', level: 80 },
        { name: 'iOS/Android', level: 70 },
        { name: 'Mobile UX', level: 85 },
      ],
    },
    {
      title: 'Other',
      icon: <Globe className="w-5 h-5" />,
      bgColor: 'bg-pastel-blue',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Artificial Intelligence ', level: 90 },
        { name: 'Marketing', level: 85 },
        { name: 'Accounting', level: 90 },
        { name: 'SEO', level: 85 },
        { name: 'Business Communication', level: 85 },
      ],
    },
  ];

  useEffect(() => {
    setAnimatedSkills(Array(skillCategories[activeTab].skills.length).fill(false));
    
    const timer = setTimeout(() => {
      skillCategories[activeTab].skills.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 100);
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
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
    handleReveal();
    
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  return (
    <section 
      id="skills" 
      className="py-20 md:py-32 bg-gradient-to-b from-pastel-lavender/10 to-background"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="text-center mb-16 reveal">
          <div className="inline-block mb-4 bg-pastel-mint/40 px-4 py-1.5 rounded-full text-sm font-medium">
            <AnimatedText text="My Skills" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <AnimatedText text="Professional Skillset" tag="span" />
          </h2>
          
          <p className="max-w-2xl mx-auto text-muted-foreground">
            <AnimatedText
              text="A comprehensive overview of my technical abilities and expertise in various domains."
              delay={200}
            />
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 reveal">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all',
                activeTab === index 
                  ? `${category.bgColor} text-white shadow-lg` 
                  : 'bg-white/50 hover:bg-white/80 text-foreground shadow'
              )}
            >
              {category.icon}
              <span>{category.title}</span>
            </button>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl reveal">
          <div className="space-y-6">
            {skillCategories[activeTab].skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm">{skill.level}%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      'h-full rounded-full transition-all duration-1000 ease-out',
                      skillCategories[activeTab].bgColor
                    )}
                    style={{ 
                      width: animatedSkills[index] ? `${skill.level}%` : '0%',
                      opacity: animatedSkills[index] ? 1 : 0,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute -right-20 bottom-20 text-pastel-lavender/10 animate-spin-slow hidden lg:block">
          <Code size={240} strokeWidth={0.5} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
