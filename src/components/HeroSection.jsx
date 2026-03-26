import { useState, useEffect } from 'react';
import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';

const roles = ["Data Science", "Frontend Developer", "Digital Marketing"];

const line1Anim = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const line2Anim = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.8 } },
};

const line3Anim = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 1.6 } },
};

const line4Anim = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 2.2 } },
};

// Raw typewriter effect
const letterAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.05,
      ease: "linear"
    },
  },
};

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // normalized -1 to 1 parallax
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 }); // raw coordinates for cursor glow
  const [isMouseInside, setIsMouseInside] = useState(false);

  // Role Switcher Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRawMouse({ x, y });
    setMousePos({
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * 2 - 1
    });
  };

  return (
    <SectionWrapper
      id="home"
      bgColor="var(--color-burgundy)"
      className="min-h-screen relative overflow-hidden bg-burgundy flex items-center justify-center pt-24 pb-20 sm:pb-32"
    >
      <div
        className="absolute inset-0 w-full h-full z-10"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >

        {/* Cursor Glow Particle Trail */}
        <motion.div
          className="pointer-events-none absolute w-[400px] h-[400px] bg-beige/10 rounded-full blur-[100px] mix-blend-screen z-0"
          animate={{
            x: rawMouse.x - 200,
            y: rawMouse.y - 200,
            opacity: isMouseInside ? 1 : 0
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        />

        {/* Decorative Repeating Background Text - DEEP LAYER (PARALLAX EFFECT) */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.05] select-none py-12 z-0"
          animate={{ x: mousePos.x * -15, y: mousePos.y * -15 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="whitespace-nowrap flex -ml-24">
              <h1 className="text-[150px] md:text-[250px] font-serif font-bold text-transparent stroke-text leading-none ml-8">
                PORTFOLIO PORTFOLIO
              </h1>
            </div>
          ))}
        </motion.div>

        <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center px-4 lg:px-8 xl:px-12 pointer-events-none">

          {/* Text Column - FOREGROUND LAYER */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center pointer-events-auto mt-2 md:mt-0 xl:pl-8 z-10">
            <RevealWrapper delay={0.1}>
              <p className="text-2xl md:text-3xl font-serif italic text-beige/80 mb-2 relative z-20 ml-6 md:ml-12 lg:ml-16 xl:ml-20">PortFolio </p>
            </RevealWrapper>

            <div className="relative inline-block w-fit ml-2 lg:ml-10 xl:ml-14">

              {/* Stroke "Shadow" Header animating letter by letter synced with primary */}
              <h1
                className="absolute top-0 left-0 text-[55px] sm:text-[75px] md:text-[95px] lg:text-[105px] xl:text-[115px] font-serif font-bold tracking-tighter text-transparent leading-[0.85] uppercase select-none pointer-events-none transform translate-x-2 -translate-y-2 md:translate-x-3 md:-translate-y-3 opacity-50 flex flex-col"
                style={{ WebkitTextStroke: '1px var(--color-beige)' }}
                aria-hidden="true"
              >
                <motion.div variants={line1Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-1">
                  {"ANN".split('').map((char, index) => (
                    <motion.span key={`s1-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div variants={line2Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-1">
                  {"MARIYA".split('').map((char, index) => (
                    <motion.span key={`s2-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div variants={line3Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-1">
                  {"ROSE".split('').map((char, index) => (
                    <motion.span key={`s3-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div variants={line4Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-3">
                  {"PEREIRA".split('').map((char, index) => (
                    <motion.span key={`s4-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </h1>

              {/* Primary Solid Header animating letter by letter */}
              <h1 className="relative z-10 text-[55px] sm:text-[75px] md:text-[95px] lg:text-[105px] xl:text-[115px] font-serif font-bold text-beige tracking-tighter mb-4 md:mb-6 leading-[0.85] drop-shadow-2xl flex flex-col">
                <motion.div variants={line1Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-1">
                  {"ANN".split('').map((char, index) => (
                    <motion.span key={`p1-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div variants={line2Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-1">
                  {"MARIYA".split('').map((char, index) => (
                    <motion.span key={`p2-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div variants={line3Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-1">
                  {"ROSE".split('').map((char, index) => (
                    <motion.span key={`p3-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div variants={line4Anim} initial="hidden" animate="visible" className="flex overflow-visible pb-3 relative">
                  {"PEREIRA".split('').map((char, index) => (
                    <motion.span key={`p4-${index}`} variants={letterAnim} className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}>
                      {char}
                    </motion.span>
                  ))}
                  {/* Blinking Cursor at the end of the last line */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: 3.6, duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-[3px] md:w-1.5 h-[0.7em] bg-beige ml-4 mt-2"
                  />
                </motion.div>
              </h1>
            </div>

            <RevealWrapper delay={3.0} yOffset={20}>
              {/* Animated Role Switcher */}
              <div className="h-12 md:h-14 flex flex-col justify-center mb-2 mt-6 overflow-hidden relative w-[320px] ml-6 md:ml-12 lg:ml-16 xl:ml-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRole}
                    initial={{ y: 20, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -20, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="absolute"
                  >
                    <span className="bg-olive/10 px-6 md:px-8 py-2 rounded-full border border-olive/30 text-beige shadow-sm font-semibold inline-block font-serif text-xl md:text-2xl whitespace-nowrap">
                      {roles[currentRole]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={3.2} yOffset={20}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mt-0 ml-2 lg:ml-10 xl:ml-14">
                <a href="#projects" className="bg-beige text-dark px-8 py-3.5 rounded-[40px] font-serif font-bold text-lg tracking-wide whitespace-nowrap hover:scale-105 transition-transform duration-300 inline-block shadow-[0_0_40px_rgba(245,240,230,0.15)] pointer-events-auto">
                  View Work
                </a>

                {/* Changed exactly as requested: view cv link */}
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-beige text-beige px-6 md:px-8 py-[13px] rounded-[40px] font-serif font-bold text-lg tracking-wide whitespace-nowrap hover:bg-beige hover:text-dark transition-all duration-300 inline-block pointer-events-auto">
                  View CV
                </a>

                {/* Hire Me Button */}
                <a href="#contact" className="bg-[#5c0d0d] border border-beige/30 text-beige px-8 py-3.5 rounded-[40px] font-serif font-bold text-lg tracking-wide whitespace-nowrap transition-transform duration-300 inline-block pointer-events-auto animate-[pulse_2.5s_ease-in-out_infinite] shadow-[0_0_15px_rgba(245,240,230,0.3)] hover:scale-105 hover:bg-[#851616]">
                  Hire Me
                </a>
              </div>
            </RevealWrapper>
          </div>

          {/* Social Divider - Centered Vertical Column (Desktop Only) */}
          <div className="hidden lg:flex order-1 lg:order-2 lg:col-span-1 flex-col items-center justify-center opacity-80 pointer-events-auto h-full py-16">
            <div className="w-[1px] flex-grow bg-gradient-to-b from-transparent to-beige/40 mb-6"></div>

            <div className="flex flex-col gap-6 items-center">
              <a href="https://www.linkedin.com/in/ann-mariya-rose-pereira/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-beige/40 text-beige hover:bg-beige hover:text-burgundy flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,240,230,0.5)] group" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/annmariyarosepereira" target="_blank" rel="noopener noreferrer" className="w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-beige/40 text-beige hover:bg-beige hover:text-burgundy flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,240,230,0.5)] group" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a href="mailto:annmariyarosepereira@gmail.com" className="w-11 h-11 xl:w-12 xl:h-12 rounded-full border border-beige/40 text-beige hover:bg-beige hover:text-burgundy flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,240,230,0.5)] group" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>

            <div className="w-[1px] flex-grow bg-gradient-to-t from-transparent to-beige/40 mt-6"></div>
          </div>

          {/* Image Column - MIDDLE LAYER */}
          <div className="order-1 lg:order-3 flex justify-center lg:justify-start lg:col-span-4 relative pointer-events-auto mt-12 md:mt-0 xl:pl-4">
            <RevealWrapper delay={0.4} scale={0.9} className="relative z-10 w-full max-w-[260px] lg:max-w-[360px]">
              {/* The cut-out portrait background wrapper */}
              <div className="aspect-[4/5] rounded-[20px] lg:rounded-[40px] overflow-hidden bg-gradient-to-b from-beige/5 to-transparent relative shadow-2xl border border-beige/10 group hover:bg-beige/20 hover:rotate-2 hover:shadow-[0_20px_60px_rgba(245,240,230,0.15)] transition-all duration-700">
                <img
                  src="/hero-portrait.png"
                  alt="Portrait"
                  className="w-full h-full object-cover object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-burgundy/10 mix-blend-color-burn pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
              </div>
            </RevealWrapper>

            {/* Decorative Star - FLOATING LAYER */}
            <RevealWrapper delay={0.6} className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-20 z-20">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-beige animate-[spin_20s_linear_infinite] drop-shadow-xl">
                <path d="M50 0L53.5 46.5L100 50L53.5 53.5L50 100L46.5 53.5L0 50L46.5 46.5L50 0Z" fill="currentColor" />
              </svg>
            </RevealWrapper>
          </div>

        </div>
      </div>

      {/* Hero Stats Ticker Strip */}
      <div className="absolute bottom-0 left-0 w-full border-t border-beige/10 py-3 bg-burgundy/90 backdrop-blur-md overflow-hidden flex whitespace-nowrap z-40 pointer-events-auto">
        <motion.div
          className="flex gap-16 items-center text-beige font-serif italic text-sm md:text-base tracking-widest uppercase pl-16 pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {/* We map twice to ensure seamless infinite looping */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center shrink-0">
              <span className="font-semibold text-beige">5+ Projects</span>
              <span className="w-1.5 h-1.5 rounded-full bg-olive/50 ring-2 ring-olive/20"></span>
              <span className="font-semibold text-beige"> 1 Year Experience</span>
              <span className="w-1.5 h-1.5 rounded-full bg-olive/50 ring-2 ring-olive/20"></span>
              <span className="font-semibold text-beige">5 Tools Mastered</span>
              <span className="w-1.5 h-1.5 rounded-full bg-olive/50 ring-2 ring-olive/20"></span>
              <span className="font-semibold text-beige">Available for Hire</span>
              <span className="w-1.5 h-1.5 rounded-full bg-olive/50 ring-2 ring-olive/20"></span>
            </div>
          ))}
        </motion.div>
      </div>

    </SectionWrapper>
  );
}
