import { useState, useRef, useEffect } from 'react';
import { Code, Globe, Brain, Cloud, Heart, Palette, Terminal, Lightbulb } from 'lucide-react';

// Animated skill card component
function SkillCard({ category, skills, darkMode, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100); // Staggered animation
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
  }, [index]);

  // 3D tilt effect for desktop
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees
    const rotateX = -((y - centerY) / centerY) * 5; // Inverted for natural feel
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Get the appropriate icon for each category
  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Programming Languages':
        return <Terminal size={24} className="stroke-current" aria-hidden="true" />;
      case 'Web Development':
        return <Globe size={24} className="stroke-current" aria-hidden="true" />;
      case 'AI/ML':
        return <Brain size={24} className="stroke-current" aria-hidden="true" />;
      case 'DevOps & Cloud':
        return <Cloud size={24} className="stroke-current" aria-hidden="true" />;
      case 'Design':
        return <Palette size={24} className="stroke-current" aria-hidden="true" />;
      case 'Soft Skills':
        return <Heart size={24} className="stroke-current" aria-hidden="true" />;
      case 'Problem Solving':
        return <Lightbulb size={24} className="stroke-current" aria-hidden="true" />;
      default:
        return <Code size={24} className="stroke-current" aria-hidden="true" />;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`
        skill-card relative h-full rounded-xl
        transition-all duration-500 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${isHovered ? 'md:scale-105 z-10' : 'z-0'}
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none
      `}
      style={{
        transform: isHovered && window.innerWidth >= 768 ? 
          `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)` : 
          isVisible ? 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); resetRotation(); }}
      role="region"
      aria-label={`${category.name} skills`}
    >
      {/* Glass Card with Skills */}
      <div 
        className={`
          w-full h-full p-5 rounded-xl
          transition-all duration-300
          border backdrop-blur-md
          ${darkMode 
            ? 'bg-gray-800/90 text-white border-gray-700 shadow-lg shadow-blue-900/20' 
            : 'bg-white/90 text-gray-800 border-gray-200 shadow-lg shadow-blue-300/20'}
          ${isHovered ? 'shadow-xl' : ''}
        `}
        tabIndex={0}
      >
        {/* Header with Icon */}
        <div className="flex items-center mb-4">
          <div className={`
            p-2 rounded-lg mr-3 flex items-center justify-center
            transition-all duration-300
            ${darkMode 
              ? `bg-gradient-to-br from-blue-800 to-indigo-900 text-blue-200
                ${isHovered ? 'shadow-md shadow-blue-900/50' : ''}` 
              : `bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600
                ${isHovered ? 'shadow-md shadow-blue-200/50' : ''}`}
            ${isHovered ? 'scale-110' : ''}
          `}>
            {getCategoryIcon(category.name)}
          </div>
          <h3 className="text-lg font-bold">{category.name}</h3>
        </div>
        
        {/* Animated gradient divider */}
        <div 
          className={`
            h-1 rounded-full mb-4 transition-all duration-500
            ${darkMode 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-500' 
              : 'bg-gradient-to-r from-blue-400 to-violet-500'}
            ${isHovered ? 'w-24' : 'w-16'}
          `}
          aria-hidden="true"
        ></div>
        
        {/* Skills List */}
        <ul className="space-y-1.5 text-sm skills-container">
          {skills.map((skill, index) => (
            <li 
              key={index} 
              className={`
                flex items-center p-1.5 rounded-md transition-all duration-200
                ${darkMode 
                  ? 'hover:bg-blue-800/40' 
                  : 'hover:bg-blue-50/80'}
              `}
            >
              <div className={`
                mr-2 flex items-center justify-center w-1.5 h-1.5 rounded-full
                ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}
              `} aria-hidden="true"></div>
              <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .skills-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        .skills-container::-webkit-scrollbar {
          width: 3px;
        }
        .skills-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .skills-container::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

// Main Skills Section
export default function Skills({ darkMode = false }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: ['Java','Python', 'JavaScript', 'TypeScript']
    },
    {
      name: 'Web Development',
      skills: ['HTML/CSS','React.js', 'Node.js','Express.js', 'REST APIs','FastAPI']
    },
    {
      name: 'AI/ML',
      skills: ['LangChain', 'Generative AI','Agentic AI','NLP', 'LLMs', 'AutoGen']
    },
    {
      name: 'DevOps & Cloud',
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins','Git & GitHub']
    },
    {
      name: 'Database',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch']
    }
  ];

  return (
    <div className={`
      w-full py-16 px-4 transition-colors duration-500
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}
    `}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`
          relative text-center mb-12 pb-4
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          transition-all duration-700 ease-out
        `}>
          <span className={`
            text-sm font-semibold uppercase tracking-wider
            ${darkMode ? 'text-blue-400' : 'text-blue-600'}
          `}>What I Can Do</span>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Skills & Expertise
          </h2>
          
          <div className="w-24 h-1 mx-auto rounded-full mb-6 bg-gradient-to-r from-blue-500 to-violet-500"></div>
          
          <p className={`
            max-w-2xl mx-auto text-lg
            ${darkMode ? 'text-gray-300' : 'text-gray-600'}
          `}>
            My technical toolkit and professional capabilities that I bring to every project.
          </p>
        </div>

        {/* Skills Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              category={category}
              skills={category.skills}
              darkMode={darkMode}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}