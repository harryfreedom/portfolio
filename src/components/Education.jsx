import { useState } from 'react';

function EducationCard({ education, darkMode }) {
  const [showCourses, setShowCourses] = useState(false);

  return (
    <div className={`
      relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 
      transform hover:-translate-y-2 hover:shadow-xl
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
    `}>
      <div className={`
        absolute top-0 left-0 w-full h-1
        ${education.id === 1 ? 'bg-blue-600' : 'bg-blue-400'}
      `}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{education.degree}</h3>
            <p className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {education.institution}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {education.duration}
            </span>
            {education.gpa && (
              <span className={`
                inline-block px-2 py-1 mt-2 text-sm rounded-md
                ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}
              `}>
                CGPA: {education.gpa}
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {education.description}
          </p>
          
          {education.courses && education.courses.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowCourses(!showCourses)}
                className={`
                  text-sm flex items-center
                  ${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-500 hover:text-blue-700'}
                `}
              >
                {showCourses ? 'Hide Courses' : 'Show Relevant Courses'}
                <svg 
                  className={`w-4 h-4 ml-1 transform transition-transform ${showCourses ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCourses && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {education.courses.map((course, idx) => (
                    <div 
                      key={idx} 
                      className={`
                        px-3 py-2 text-sm rounded-md
                        ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
                      `}
                    >
                      {course}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {education.achievements && (
            <div className="mt-4">
              <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Achievements:
              </h4>
              <ul className={`list-disc pl-5 text-sm space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {education.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education({ darkMode }) {
  const educationData = [
    {
      id: 1,
      degree: 'Integrated M.Tech in Software Engineering',
      institution: 'VIT University, Vellore',
      duration: '2020 - 2025',
      gpa: '8.0',
      description: 'Completed Integrated M.Tech in Software Engineering with focus on programming, software development, and system design.',
      courses: [
        'Data Structures & Algorithms',
        'Web Technologies',
        'Cloud Computing',
        'Database Management Systems',
        'Artificial Intelligence',
        'Machine Learning',
        'Natural Language Processing',
        'Operating System',
        'Computer Networks',
        'Software Engineering'
      ],
      achievements: [
        'Spearheaded cultural events and literary workshops, managing a team of 25+ members; increased club participation by 40% and significantly enhanced student engagement on campus.'
      ]
    },
    {
      id: 2,
      degree: 'Senior Secondary Education',
      institution: 'Aditya Junior College',
      duration: '2018 - 2020',
      gpa: '9.7',
      description: 'Completed Intermediate education with a focus on Mathematics, Physics, and Chemistry (MPC), developing strong analytical and problem-solving skills.',

    },
    {
      id: 3,
      degree: 'Secondary Education',
      institution: 'Montessori’s English Medium School',
      duration: '2017 - 2020',
      gpa: '9.3',
      description: 'Studied core subjects including Mathematics, Science, and English; built a strong academic foundation and developed discipline and time-management skills..',

    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Education
        </h2>
        <div className="w-16 h-1 mx-auto rounded-full mb-6 bg-blue-500"></div>
      </div>

      <div className="space-y-6">
        {educationData.map(education => (
          <EducationCard 
            key={education.id} 
            education={education} 
            darkMode={darkMode} 
          />
        ))}
      </div>
    </div>
  );
}