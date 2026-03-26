import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

const links = [
  { id: 'home', label: 'Intro', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'resume', label: 'Resume', number: '03' },
  { id: 'education', label: 'Education', number: '04' },
  { id: 'skills', label: 'Skills', number: '05' },
  { id: 'projects', label: 'Projects', number: '06' },
  { id: 'certifications', label: 'Certifications', number: '07' },
  { id: 'contact', label: 'Contact', number: '08' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentBg, setCurrentBg] = useState('var(--color-burgundy)');
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 150) {
      setShowButton(true);
    } else {
      setShowButton(false);
      setIsOpen(false);
    }
  });

  // Track the current background color set by SectionWrapper
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

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking a link
  const handleLinkClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent scroll when menu is open & track mouse for overlay
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleGlobalMouseMove = (e) => {
        setRawMouse({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
      };
    } else {
      document.body.style.overflow = '';
      setIsMouseInside(false);
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  const menuVars = {
    initial: { x: "100%" },
    animate: {
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] // Custom ease identical to creative references
      }
    },
    exit: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.05 } },
    open: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } }
  };

  const linkVars = {
    initial: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
  };

  // Determine dynamic button colors based on current section background
  let textColorClass = "text-beige";
  let iconLineClass = "bg-beige";
  let hoverBgClass = "bg-beige/10";

  if (currentBg === 'var(--color-burgundy)' || currentBg === 'var(--color-olive)') {
    textColorClass = "text-beige bg-beige/10 border border-beige/20 shadow-lg";
    iconLineClass = "bg-beige";
    hoverBgClass = "bg-beige/20";
  } else if (currentBg === 'var(--color-beige)') {
    textColorClass = "text-burgundy bg-burgundy/5 border border-burgundy/10 shadow-lg";
    iconLineClass = "bg-burgundy";
    hoverBgClass = "bg-burgundy/10";
  }

  return (
    <>
      <AnimatePresence>
        {showButton && !isOpen && (
          <>
            {/* Hamburger Button (Top Right) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed top-12 right-10 z-[90]"
            >
              <Magnetic>
                <button
                  onClick={toggleMenu}
                  className={`relative w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-md transition-all duration-500 group focus:outline-none ${textColorClass}`}
                  aria-label="Open menu"
                >
                  {/* Magnetic Background Hover Surface (Subtle) */}
                  <div className={`absolute inset-0 rounded-full transition-transform duration-500 scale-0 group-hover:scale-100 ${hoverBgClass} shadow-xl pointer-events-none`}></div>

                  {/* Hamburger Lines (Shane Sayers-style morph) */}
                  <span className={`block w-6 h-px rounded-full z-10 border-0 ${iconLineClass}`} style={{ transition: 'all 0.3s ease-in-out', transformOrigin: 'center' }}></span>
                  <span className={`block w-6 h-px rounded-full z-10 border-0 ${iconLineClass}`} style={{ transition: 'all 0.3s ease-in-out', transformOrigin: 'center' }}></span>

                  {/* CSS Hover Overrides */}
                  <style>{`
                     button.group:hover span:nth-of-type(1) {
                       transform: rotate(5deg) scaleX(1.1) translateY(1px);
                     }
                     button.group:hover span:nth-of-type(2) {
                       transform: rotate(-5deg) scaleX(1.1) translateY(-1px);
                     }
                   `}</style>

                  {/* Orbit Hover Animation SVG */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-110">
                    <motion.svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute"
                    >
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="0 1"
                        animate={{
                          strokeDasharray: ["0, 300", "300, 300"],
                          rotate: [0, 90, 0]
                        }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          repeat: Infinity
                        }}
                      />
                    </motion.svg>
                  </div>
                </button>
              </Magnetic>
            </motion.div>

            {/* Scroll to Top Button (Bottom Right) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed bottom-12 right-10 z-[90]"
            >
              <Magnetic>
                <button
                  onClick={() => handleLinkClick('home')}
                  className={`relative w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-md transition-all duration-500 group focus:outline-none ${textColorClass}`}
                  aria-label="Scroll to top"
                >
                  {/* Magnetic Background Hover Surface (Subtle) */}
                  <div className={`absolute inset-0 rounded-full transition-transform duration-500 scale-0 group-hover:scale-100 ${hoverBgClass} shadow-xl pointer-events-none`}></div>

                  {/* Up Arrow */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>

                  {/* Orbit Hover Animation SVG */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-110">
                    <motion.svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute"
                    >
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="0 1"
                        animate={{
                          strokeDasharray: ["0, 300", "300, 300"],
                          rotate: [0, 90, 0]
                        }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          repeat: Infinity
                        }}
                      />
                    </motion.svg>
                  </div>
                </button>
              </Magnetic>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[100] w-full md:w-[450px] bg-beige shadow-2xl flex flex-col pt-20 md:pt-24 pb-12 px-8 md:px-12 overflow-y-auto overflow-x-hidden"
            onMouseEnter={() => setIsMouseInside(true)}
            onMouseLeave={() => setIsMouseInside(false)}
          >
            {/* Cursor Glow Particle Trail (Overlay specific) */}
            <motion.div
              className="pointer-events-none fixed w-[400px] h-[400px] bg-burgundy/15 rounded-full blur-[100px] mix-blend-multiply z-0"
              animate={{ x: rawMouse.x - 200, y: rawMouse.y - 200, opacity: isMouseInside ? 1 : 0 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            />

            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-burgundy/10 rounded-full flex items-center justify-center transition-all duration-300 group overflow-hidden z-20 shrink-0"
            >
              <div className="absolute inset-0 scale-0 group-hover:scale-100 bg-burgundy transition-transform duration-300 ease-in-out rounded-full" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-burgundy group-hover:text-beige transition-all duration-300 ease-in-out group-hover:rotate-90 group-hover:scale-110">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col gap-4 md:gap-6 mt-12 relative z-10"
            >
              {links.map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div variants={linkVars}>
                    <button
                      onClick={() => handleLinkClick(link.id)}
                      className="group flex items-baseline gap-4 md:gap-6 w-full text-left"
                    >
                      <span className="text-xs md:text-sm font-bold text-burgundy/50 group-hover:text-burgundy transition-colors shrink-0">{link.number}</span>
                      <span className="text-3xl md:text-5xl font-serif font-bold text-dark group-hover:text-burgundy uppercase tracking-tighter transition-colors truncate">{link.label}</span>
                    </button>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            <div className="mt-auto pt-12 flex gap-4 relative z-10">
              {/* Email */}
              <a href="mailto:annmariyarosepereira@gmail.com" className="w-12 h-12 rounded-full border border-dark/20 text-dark flex items-center justify-center hover:bg-burgundy hover:text-beige hover:border-burgundy transition-all duration-300 group shadow-sm z-10" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/ann-mariya-rose-pereira/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-dark/20 text-dark flex items-center justify-center hover:bg-burgundy hover:text-beige hover:border-burgundy transition-all duration-300 group shadow-sm z-10" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com/annmariyarosepereira" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-dark/20 text-dark flex items-center justify-center hover:bg-burgundy hover:text-beige hover:border-burgundy transition-all duration-300 group shadow-sm z-10" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 z-[90] bg-dark/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
