import { useState } from 'react';

// Timeline Item Component
function TimelineItem({ experience, isLast, darkMode, expanded, toggleExpanded }) {
  return (
    <div className="relative pb-8">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-blue-400"></div>
      )}
      
      <div className="relative flex items-start">
        {/* Timeline dot */}
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 text-white shadow-md">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Content */}
        <div className="ml-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {experience.role}
              </h3>
              <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm font-semibold`}>
                {experience.duration}
              </span>
            </div>
            
            <p className={`text-base font-medium mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {experience.company}
            </p>
            
            <button 
              onClick={() => toggleExpanded(experience.id)}
              className={`text-sm mt-2 flex items-center ${
                darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-500 hover:text-blue-700'
              }`}
            >
              {expanded === experience.id ? 'Show Less' : 'Show More'} 
              <svg 
                className={`w-4 h-4 ml-1 transform transition-transform ${expanded === experience.id ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expanded === experience.id && (
              <div className={`mt-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {experience.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                
                {experience.technologies && (
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Technologies used:</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className={`px-2 py-1 text-xs rounded-full ${
                            darkMode 
                              ? 'bg-blue-900 text-blue-200' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience({ darkMode }) {
  const [expandedId, setExpandedId] = useState(null);
  
  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const experiences = [
    {
      id: 1,
      role: 'AI/ML Intern',
      company: 'Genpact',
      duration: 'August 2024 - February 2025',
      description: [
        'Engineered a unified Authentication solution by developing a custom Okta Auth JS SDK, enabling seamless integration across React, Angular, and Vue frameworks, Reduced authentication implementation time by 60% and standardized security protocols, eliminating cross-framework code redundancy.',
        'Created a LangChain-based RAG (Retrieval-Augmented Generation) system to efficiently query and retrieve information from large document datasets.',
        'Spearheaded an AI-driven FAQ portal using JHipster (Angular/Spring Boot), PostgreSQL; implemented RAG with LLMs using LangChain framework to auto-answer queries via semantic search on vector databases, reducing query resolution time by 75% and accelerating development by 40%',
        'Configured the PM2 process manager in cluster mode to horizontally scale a NodeJS applications for efficient load balancing, reducing server response times by 45% and achieving 99.8% uptime under peak load.',
        'Collaborated with cross-functional teams to identify AI implementation opportunities and develop POCs.'
      ],
      technologies: ['Python', 'JavaScript', 'ReactJS', 'NodeJS', 'JHipster', 'FastAPI',' MongoDB','PostgreSQL','LangChain','RAG','Autogen', 'Docker', 'Microsoft Azure', 'Git & GitHub']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Work Experience
        </h2>
        <div className="w-16 h-1 mx-auto rounded-full mb-6 bg-blue-500"></div>
        <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          My professional journey and key accomplishments
        </p>
      </div>

      <div className="relative pt-6">
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            experience={experience}
            isLast={index === experiences.length - 1}
            darkMode={darkMode}
            expanded={expandedId}
            toggleExpanded={toggleExpanded}
          />
        ))}
      </div>
    </div>
  );
}