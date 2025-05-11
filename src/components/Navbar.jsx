import { useState, useEffect } from 'react';

export default function Navbar({ activeSection, darkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' }
  ];

  return (
    <nav className={`w-full ${isScrolled 
      ? `${darkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'} shadow-md` 
      : 'bg-transparent'} backdrop-blur-sm transition-all duration-300 py-4 px-6`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Harry</span> Freedom
        </div>
        
        <div className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${
                activeSection === item.id
                  ? `${darkMode ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600'} border-b-2`
                  : `${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} border-b-2 border-transparent`
              } transition-colors duration-300 px-1 pb-1`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
            ≡
          </button>
        </div>
      </div>
    </nav>
  );
}