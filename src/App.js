import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { SunIcon, MoonIcon } from 'lucide-react';

// Import the 3D background component with React.lazy for performance
const BackgroundScene = React.lazy(() => import('./components/BackgroundScene'));

// Loading fallback component while the 3D background loads
const BackgroundFallback = ({ darkMode }) => (
  <div 
    className={`fixed top-0 left-0 w-full h-full z-0 transition-colors duration-700 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-blue-950' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}
    aria-hidden="true"
  />
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'education', 'projects'];
      let current = 'hero';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Simulate loading to avoid layout shifts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen w-full relative ${
      darkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'
    } transition-colors duration-300`}>
      {/* 3D Background */}
      <Suspense fallback={<BackgroundFallback darkMode={darkMode} />}>
        {isLoaded && <BackgroundScene darkMode={darkMode} />}
      </Suspense>
      
      {/* Content with higher z-index */}
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50">
          <Navbar activeSection={activeSection} darkMode={darkMode} />
          <button 
            onClick={toggleDarkMode} 
            className={`fixed top-15 right-4 p-2 rounded-full bg-opacity-70 backdrop-blur-sm z-50 transition-colors ${
              darkMode ? 'bg-gray-800/40 hover:bg-gray-700/60' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </header>
        
        <main>
          <section id="hero">
            <Hero darkMode={darkMode} />
          </section>
          
          <section id="about" className="py-16">
            <About darkMode={darkMode} />
          </section>
          
          <section id="skills" className="py-16">
            <Skills darkMode={darkMode} />
          </section>
          
          <section id="experience" className="py-16">
            <Experience darkMode={darkMode} />
          </section>
          
          <section id="education" className="py-16">
            <Education darkMode={darkMode} />
          </section>
          
          <section id="projects" className="py-16">
            <Projects darkMode={darkMode} />
          </section>
        </main>
        
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}