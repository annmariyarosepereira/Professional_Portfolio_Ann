import { useState } from 'react';
import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';
import { motion } from 'framer-motion';

export function AboutSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // normalized -1 to 1 parallax
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 }); // raw coordinates for cursor glow
  const [isMouseInside, setIsMouseInside] = useState(false);

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
    <SectionWrapper id="about" bgColor="var(--color-beige)">
      <div
        className="w-full relative min-h-screen"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >

        {/* Cursor Glow Particle Trail */}
        <motion.div
          className="pointer-events-none absolute w-[400px] h-[400px] bg-burgundy/15 rounded-full blur-[100px] mix-blend-multiply z-0"
          animate={{
            x: rawMouse.x - 200,
            y: rawMouse.y - 200,
            opacity: isMouseInside ? 1 : 0
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        />

        {/* Decorative Ghost Text - BACKGROUND LAYER */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-between py-12 md:py-24">
          <motion.div
            className="whitespace-nowrap -ml-12 md:-ml-24 opacity-[0.05]"
            animate={{ x: mousePos.x * -20, y: mousePos.y * -10 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-dark)' }}>
              DATA SCIENCE
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap self-end -mr-12 md:-mr-24 opacity-[0.04]"
            animate={{ x: mousePos.x * 25, y: mousePos.y * 15 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-dark)' }}>
              DESIGN
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap -ml-6 md:-ml-12 opacity-[0.05]"
            animate={{ x: mousePos.x * -15, y: mousePos.y * -20 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
          >
            <h1 className="text-[100px] md:text-[180px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-dark)' }}>
              DIGITAL MARKETER
            </h1>
          </motion.div>
        </div>

        {/* FOREGROUND CONTENT */}
        <div className="relative z-10 w-full">
          <div className="flex flex-col items-center text-center pb-16 border-b border-dark/10 mb-16">
            <RevealWrapper delay={0.1}>
              <h2 className="text-[100px] md:text-[140px] font-serif font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px var(--color-dark)' }}>
                ABOUT
              </h2>
              <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter text-dark -mt-12 md:-mt-20 relative z-10 italic">
                The Developer And Analyst
              </h2>
            </RevealWrapper>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

            {/* Quick Facts Sidebar */}
            <div className="lg:col-span-4 space-y-12 pr-0 lg:pr-8 border-r-0 lg:border-r border-dark/10">
              <RevealWrapper delay={0.2} yOffset={20}>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-dark/40 mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-dark/20"></span>
                    Quick Facts
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4 items-center">
                      <span className="text-2xl font-serif italic text-burgundy">01</span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-dark/50 block">Location</span>
                        <span className="text-dark font-serif font-bold text-lg">Kerala, India</span>
                      </div>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-2xl font-serif italic text-burgundy">02</span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-dark/50 block">Education</span>
                        <span className="text-dark font-serif font-bold text-lg">Pursuing B.Tech in CS</span>
                      </div>
                    </li>

                  </ul>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={0.3} yOffset={20}>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-dark/40 mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-dark/20"></span>
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 border border-dark/20 rounded-full text-sm font-serif italic font-bold text-dark">Designing</span>
                    <span className="px-4 py-2 border border-dark/20 rounded-full text-sm font-serif italic font-bold text-dark">Marketing</span>
                    <span className="px-4 py-2 border border-dark/20 rounded-full text-sm font-serif italic font-bold text-dark">Data Science</span>
                  </div>
                </div>
              </RevealWrapper>
            </div>

            {/* Main Content Areas */}
            <div className="lg:col-span-8 space-y-8">
              <RevealWrapper delay={0.3} yOffset={20}>
                <div>
                  <h3 className="text-3xl md:text-5xl font-serif font-semibold mb-6 text-dark tracking-tight">
                    Beyond Code
                  </h3>

                  <div className="space-y-4 text-[15px] md:text-[17px] text-dark/70 leading-relaxed tracking-wide font-normal max-w-[650px]">
                    <p>
                      I build digital solutions that combine data, functionality, and user experience into something practical and impactful.
                    </p>

                    <p>
                      Currently pursuing Computer Science with a specialization in Data Science, I focus on extracting insights from data and translating them into meaningful applications. My work extends beyond analysis into building responsive interfaces and systems that make data accessible and impactful.
                    </p>

                    <p>
                      With experience in frontend development and digital marketing, I approach problems from both a technical and user perspective ensuring solutions are not only efficient but also intuitive and engaging.
                    </p>

                    <p>
                      I prioritize clean code, scalability, and practical implementation while continuously refining my skills to grow into a well-rounded software engineer.
                    </p>
                  </div>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={0.4} yOffset={20}>
              </RevealWrapper>
            </div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
