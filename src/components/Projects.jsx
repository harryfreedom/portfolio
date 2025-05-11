import { useState } from 'react';
import img1 from '../Images/project1.jpg';
import img2 from '../Images/project2.png';
import img3 from '../Images/project3.png';
import img4 from '../Images/project4.png';
import img5 from '../Images/project5.png';
import img6 from '../Images/project6.png';

function ProjectCard({ project, darkMode }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        relative rounded-lg overflow-hidden shadow-lg 
        transition-all duration-300 transform 
        ${isHovered ? 'scale-105' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image || "/api/placeholder/400/300"} 
          alt={project.title} 
          className={`
            w-full h-full object-cover
            transition-all duration-500 
            ${isHovered ? 'scale-110 brightness-75' : ''}
          `}
        />
        
        {/* Overlay with buttons that appear on hover */}
        <div className={`
          absolute inset-0 flex items-center justify-center gap-4
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`
                px-4 py-2 rounded-md font-medium text-sm
                bg-blue-600 text-white hover:bg-blue-700
                transition-colors duration-300
              `}
            >
              Live Demo
            </a>
          )}
          
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`
                px-4 py-2 rounded-md font-medium text-sm
                ${darkMode ? 
                  'bg-gray-800 text-white hover:bg-gray-700' : 
                  'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                transition-colors duration-300
              `}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
      
      {/* Project Info */}
      <div className={`
        p-5
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
      `}>
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span 
              key={idx} 
              className={`
                px-2 py-1 text-xs rounded-full
                ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}
              `}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ darkMode }) {
  const [showAll, setShowAll] = useState(false);
  
  const projects = [
    {
      id: 1,
      title: "AI Document Processing System",
      description: "An intelligent system that extracts, categorizes, and summarizes information from various document types using NLP and computer vision.",
      image: img1,
      demoUrl: "https://www.youtube.com/",
      githubUrl: "https://github.com/harryFreedom/ai-doc-processor",
      technologies: ["Python", "PyTorch", "FastAPI", "React", "LangChain"]
    },
    {
      id: 2,
      title: "Personal Finance Dashboard",
      description: "A comprehensive financial tracking application with data visualization, expense categorization, and budget planning features.",
      image: img2,
      demoUrl: "https://www.youtube.com/",
      githubUrl: "https://github.com/harryFreedom/finance-dashboard",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "Chart.js"]
    },
    {
      id: 3,
      title: "Smart Task Scheduler",
      description: "An AI-powered task management system that uses machine learning to optimize scheduling based on user habits and priorities.",
      image: img3,
      demoUrl: "https://www.youtube.com/",
      githubUrl: "https://github.com/harryFreedom/smart-scheduler",
      technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"]
    },
    {
      id: 4,
      title: "E-commerce Platform",
      description: "A full-featured online shopping platform with product catalog, shopping cart, payment integration, and admin dashboard.",
      image: img4,
      demoUrl: "https://www.youtube.com/",
      githubUrl: "https://github.com/harryFreedom/ecommerce-platform",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"]
    },
    {
      id: 5,
      title: "Social Media Analytics Tool",
      description: "A tool that analyzes social media engagement metrics and provides actionable insights through interactive visualizations.",
      image: img5,
      demoUrl: "https://www.youtube.com/",
      githubUrl: "https://github.com/harryFreedom/social-analytics",
      technologies: ["Python", "React", "D3.js", "Flask", "Redis"]
    },
    {
      id: 6,
      title: "RAG-based Q&A System",
      description: "A Retrieval-Augmented Generation system that answers questions based on specific document collections with high accuracy.",
      image: img6,
      demoUrl: "https://www.youtube.com/",
      githubUrl: "https://github.com/harryFreedom/rag-qa-system",
      technologies: ["Python", "LangChain", "LlamaIndex", "React", "MongoDB"]
    }
  ];

  // Show only 3 projects initially, or all if showAll is true
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Featured Projects
        </h2>
        <div className="w-16 h-1 mx-auto rounded-full mb-6 bg-blue-500"></div>
        <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Highlighting some of my recent work. Hover over a project to see details and links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            darkMode={darkMode} 
          />
        ))}
      </div>
      
      {projects.length > 3 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`
              px-6 py-3 rounded-md font-medium
              transition-colors duration-300
              ${darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'}
            `}
          >
            {showAll ? 'Show Less' : 'See More Projects'}
          </button>
        </div>
      )}
    </div>
  );
}