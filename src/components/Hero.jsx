import { useState, useEffect } from 'react';
import img from '../Images/IMG_3183.jpg';

export default function Hero({ darkMode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle background component
  const ParticleBackground = () => {
    const particles = Array(50).fill().map((_, i) => {
      const size = Math.random() * 6 + 2;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      const offsetX = (mousePosition.x - 0.5) * (i % 5) * 10;
      const offsetY = (mousePosition.y - 0.5) * (i % 5) * 10;

      return (
        <div
          key={i}
          className={`absolute rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-300'} bg-opacity-20`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `calc(${initialX}% + ${offsetX}px)`,
            top: `calc(${initialY}% + ${offsetY}px)`,
            animation: `float ${5 + i % 5}s infinite ease-in-out ${i * 0.1}s`
          }}
        />
      );
    });

    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(15px) translateX(15px); }
          }
        `}</style>
      </div>
    );
  };

  // Scroll to section helper
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="text-left max-w-xl order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Hi, I'm <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Harry Freedom</span>
          </h1>

          <h2 className={`text-xl md:text-2xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Full Stack Developer & AI/ML Enthusiast
          </h2>

          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            I build powerful web applications and explore the frontiers of artificial intelligence.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#about"
              className={`${darkMode 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'} 
                py-3 px-8 rounded-full transition-colors duration-300 shadow-md text-lg font-medium`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
            >
              About Me
            </a>
            <a
              href="#footer"
              className={`${darkMode 
                ? 'bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white' 
                : 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'} 
                py-3 px-8 rounded-full transition-colors duration-300 text-lg font-medium`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo('footer');
              }}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative order-1 lg:order-2">
          <div className={`relative rounded-full p-1 ${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-50"></div>
            <div className={`relative rounded-full p-1 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <img 
                src={img} 
                alt="Harry Freedom" 
                className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover shadow-xl"
              />
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute w-20 h-20 -top-6 -right-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
          <div className="absolute w-12 h-12 -bottom-4 -left-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-30"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => scrollTo('about')}
      >
        <svg 
          width="30" 
          height="30" 
          viewBox="0 0 24 24" 
          fill="none" 
          className={darkMode ? "text-white" : "text-gray-700"}
        >
          <path 
            d="M7 13L12 18L17 13" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M7 7L12 12L17 7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
