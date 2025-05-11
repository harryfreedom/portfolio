import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, ChevronUp, ExternalLink } from "lucide-react";

export default function Footer({ darkMode }) {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  // Show scroll-to-top button only when footer is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactLinks = [
    { name: '+917337574840', icon: <Phone size={20} /> },
    { name: 'harryfreedomvadlamudi@gmail.com', icon: <Mail size={20} /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/harryfreedom', icon: <Linkedin size={20} /> },
    { name: 'GitHub', url: 'https://github.com/harryfreedom', icon: <Github size={20} /> }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer
      id="footer"
      ref={footerRef}
      className={`relative overflow-hidden pt-16 pb-12 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-blue-500"></div>
        <div className="absolute top-1/4 right-1/3 w-48 h-48 rounded-full bg-purple-500"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-teal-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Top section */}
        <div className={`backdrop-blur-md rounded-xl shadow-lg mb-16 p-8 ${
          darkMode
            ? 'bg-gray-800/60 shadow-gray-900/20'
            : 'bg-white/70 shadow-gray-200/50'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">Harry Freedom</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Web developer focused on creating beautiful, functional, and accessible digital experiences.
              </p>
              <div className="flex space-x-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    aria-label={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transform transition-all duration-300 p-2 rounded-full hover:scale-110 hover:-translate-y-1 ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white'
                        : 'bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white'
                    }`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xl font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`group flex items-center transition-all duration-300 ${
                        darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                      }`}
                    >
                      <span className="relative overflow-hidden">
                        <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
                          {link.name}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-current"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <ul className="space-y-3">
                {contactLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center transition-all duration-300 ${
                        darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <span className="mr-3 transform transition-all duration-300 group-hover:scale-110">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                      <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm mb-4 md:mb-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            &copy; {currentYear} Harry Freedom. All rights reserved.
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Designed with <span className="text-red-500 animate-pulse">♥</span> by Harry Freedom
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed z-50 right-8 bottom-8 p-3 rounded-full shadow-lg transition-all duration-500 transform ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        } ${
          darkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-white hover:bg-blue-500 hover:text-white text-blue-600'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
}
