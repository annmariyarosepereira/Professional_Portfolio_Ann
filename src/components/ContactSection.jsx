import { useState } from 'react';
import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';
import { motion } from 'framer-motion';

export function ContactSection() {
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 });
  const [isMouseInside, setIsMouseInside] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRawMouse({ x, y });
  };

  return (
    <SectionWrapper id="contact" bgColor="var(--color-burgundy)" className="min-h-screen relative overflow-hidden">
      <div
        className="w-full flex flex-col justify-center text-center min-h-screen relative z-10"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >

        {/* Cursor Glow Particle Trail (Global Standard) */}
        <motion.div
          className="pointer-events-none absolute w-[400px] h-[400px] bg-beige/10 rounded-full blur-[100px] mix-blend-screen z-0"
          animate={{ x: rawMouse.x - 200, y: rawMouse.y - 200, opacity: isMouseInside ? 1 : 0 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        />

        <div className="relative z-10 w-full flex flex-col justify-center text-center px-4">

          <RevealWrapper delay={0.1}>
            <a href="mailto:annmariyapereira@gmail.com" className="group block mb-12">
              {/* Preserved existing serif design rules, swapped text content */}
              <h2 className="text-[60px] md:text-[100px] lg:text-[140px] font-serif font-bold tracking-tighter text-beige leading-[0.85] group-hover:italic transition-all duration-500">
                Let's Work<br />Together.
              </h2>
            </a>
          </RevealWrapper>

          <div className="mt-8 md:mt-16 flex flex-col items-center">

            <RevealWrapper delay={0.2} yOffset={20}>
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-beige/60 font-bold mb-6 block flex items-center justify-center gap-4">
                <span className="w-8 h-px bg-beige/30"></span>
                Connect With Me
                <span className="w-8 h-px bg-beige/30"></span>
              </span>
            </RevealWrapper>

            <RevealWrapper delay={0.3} yOffset={20}>
              <a href="mailto:annmariyarosepereira@gmail.com" className="inline-block group mb-12">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-base md:text-2xl lg:text-3xl font-bold transition-all bg-beige/5 px-8 md:px-10 py-5 rounded-full border border-beige/10 group-hover:bg-beige/10 group-hover:border-beige/20 group-hover:scale-[1.02] shadow-lg duration-500">
                  <span className="font-serif italic text-beige/60 font-normal tracking-wide normal-case text-xl md:text-3xl pr-0 md:pr-4">Looking to hire?</span>
                  <span className="uppercase tracking-[0.1em] text-beige font-sans">annmariyarosepereira@gmail.com</span>
                </div>
              </a>
            </RevealWrapper>

            <RevealWrapper delay={0.4} yOffset={20}>
              <div className="flex justify-center items-center gap-6">

                {/* 1. WhatsApp */}
                <a href="https://wa.me/916235701868" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-beige/40 text-beige hover:bg-beige hover:text-burgundy flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-12 transition-transform duration-300"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </a>

                {/* 2. Email */}
                <a href="mailto:annmariyarosepereira@gmail.com" className="w-12 h-12 rounded-full border border-beige/40 text-beige hover:bg-beige hover:text-burgundy flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-12 transition-transform duration-300"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>

                {/* 3. LinkedIn */}
                <a href="https://www.linkedin.com/in/ann-mariya-rose-pereira/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-beige/40 text-beige hover:bg-beige hover:text-burgundy flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-12 transition-transform duration-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>

                {/* 4. GitHub */}
                <a href="https://github.com/annmariyarosepereira" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-beige/40 text-beige hover:bg-beige hover:text-burgundy flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-12 transition-transform duration-300"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                </a>

              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* Existing Background Decorative Spinner (Preserved) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <RevealWrapper delay={0.5}>
            <svg width="600" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-beige opacity-[0.02] animate-[spin_60s_linear_infinite]">
              <path d="M50 0L56 44L100 50L56 56L50 100L44 56L0 50L44 44L50 0Z" fill="currentColor" />
            </svg>
          </RevealWrapper>
        </div>

      </div>
    </SectionWrapper>
  );
}
