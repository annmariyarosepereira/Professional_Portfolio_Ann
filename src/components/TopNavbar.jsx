import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function TopNavbar() {
  const [currentBg, setCurrentBg] = useState('var(--color-burgundy)');
  const [activeSection, setActiveSection] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 150) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  });

  // Track the current background color set by SectionWrapper for dynamic text color
  useEffect(() => {
    // Initial check
    const initialBg = document.documentElement.style.getPropertyValue('--bg-color');
    if (initialBg) setCurrentBg(initialBg.trim());

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const bgColor = document.documentElement.style.getPropertyValue('--bg-color');
          if (bgColor) {
            setCurrentBg(bgColor.trim());
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  // Track active section for highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check which section is closest to the top-middle of the screen
        if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
          current = section.getAttribute('id');
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine dynamic text color based on the actual background behind the sticky navbar
  // As per user request:
  // - bg is beige -> icon/text is burgundy
  // - bg is olive green -> icon/text is beige
  // - bg is burgundy -> icon/text is beige
  let textColorClass = "text-beige";
  if (currentBg === 'var(--color-beige)') {
    textColorClass = "text-burgundy";
  } else if (currentBg === 'var(--color-olive)' || currentBg === 'var(--color-burgundy)') {
    textColorClass = "text-beige";
  }

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 flex items-center justify-between transition-colors duration-500 rounded-b-3xl`}
        >
      {/* Subtle backdrop blur effect */}
      <div className="absolute inset-0 bg-transparent/5 backdrop-blur-md pointer-events-none rounded-b-3xl border-b border-dark/5"></div>

      {/* Logo Area */}
      <div className="relative z-10 flex items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className={`font-serif text-2xl md:text-3xl font-bold tracking-tighter ${textColorClass} hover:opacity-80 transition-opacity`}>
          PORTFOLIO.
        </a>
      </div>

      {/* Desktop Links Area */}
      <div className="relative z-10 hidden md:flex items-center gap-2">
        {links.map((link) => {
          const isActive = activeSection === link.id;
          
          return (
            <a 
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="relative px-5 py-2 group"
            >
              <span className={`relative z-10 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? textColorClass : textColorClass + '/60 group-hover:' + textColorClass}`}>
                {link.label}
              </span>
              
              {/* The Orbit Hover Animation SVG */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <motion.svg 
                   width="100%" 
                   height="100%" 
                   viewBox="0 0 100 40" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg"
                   className={`absolute ${textColorClass}`}
                   preserveAspectRatio="none"
                 >
                   <motion.ellipse 
                     cx="50" 
                     cy="20" 
                     rx="48" 
                     ry="18" 
                     stroke="currentColor" 
                     strokeWidth="1"
                     strokeDasharray="0 1"
                     animate={{
                       strokeDasharray: ["0, 300", "300, 300"],
                       rotate: [0, 5, -5, 0]
                     }}
                     transition={{
                       duration: 0.6,
                       ease: "easeInOut"
                     }}
                   />
                 </motion.svg>
              </div>

              {/* Active Indicator (Small dot) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${currentBg === 'var(--color-beige)' ? 'bg-burgundy' : 'bg-beige'}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </div>
    </motion.nav>
      )}
    </AnimatePresence>
  );
}
