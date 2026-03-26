import { useState, useRef, useEffect } from 'react';
import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';
import { motion, useInView, animate } from 'framer-motion';

const resumeItems = [
  {
    type: "TRAINING",
    title: "From Data to Decisions : Data Science",
    org: "Skill Development LPU",
    date: "Jun 2025 - Aug 2025",
    points: [
      "Gained hands-on experience in Python-based data analytics, including data preprocessing, EDA, statistical modeling, feature engineering, and machine learning.",
      "Worked with MySQL, Excel, and Power BI for data handling, cleaning, query-based analysis, and building interactive dashboards with KPIs."
    ],
    tech: ["Python", "Pandas", "Scikit-learn", "MySQL", "Power BI"]
  },

  {
    type: "INTERNSHIP",
    title: "Emerging Technologies (AI & Cloud)",
    org: "Edunet Foundation & AICTE",
    date: "July 2025 - Aug 2025",
    points: [
      "Successfully completed a 4-week Internship on Emerging Technologies (AI & Cloud) leveraging the IBM Cloud platform.",
      "Gained practical understanding of AI and Cloud technologies in collaboration with IBM SkillsBuild."
    ],
    tech: ["Artificial Intelligence", "IBM Cloud", "Emerging Tech"]
  },
  {
    type: "HACKATHON",
    title: "Code Off Duty - Web Hackathon",
    org: "Sagar Chouksey",
    date: "March 2024 - April 2024",
    points: [
      "Secured a top-10 rank among 200+ teams by delivering an efficient solution in a 24-hour hackathon environment.",
      "Demonstrated exceptional skills, creativity, and teamwork in developing innovative solutions."
    ],
    tech: ["Hackathon", "Problem Solving", "Web Development"]
  }
];

const skillsList = [
  { name: "Python", val: 90 },
  { name: "MySQL", val: 85 },
  { name: "Power BI", val: 80 },
  { name: "Pandas", val: 85 },
  { name: "Figma", val: 75 },
  { name: "HTML/CSS", val: 95 },
  { name: "Excel", val: 90 },
  { name: "Digital Marketing", val: 80 }
];

function AnimatedNumber({ value, inView }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: "easeInOut",
        onUpdate: (v) => {
          if (nodeRef.current) nodeRef.current.textContent = Math.round(v) + "%";
        }
      });
      return () => controls.stop();
    }
  }, [value, inView]);

  return <span ref={nodeRef}>0%</span>;
}

export function ResumeSection() {
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

  const skillsRef = useRef(null);
  const isSkillsInView = useInView(skillsRef, { margin: "-100px" });

  return (
    <SectionWrapper id="resume" bgColor="var(--color-olive)">
      <div
        className="w-full relative min-h-screen"
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

        {/* Decorative Ghost Text - BACKGROUND LAYER */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-between py-12 md:py-24">
          <motion.div
            className="whitespace-nowrap -ml-12 md:-ml-24 opacity-[0.06]"
            animate={{ x: mousePos.x * -20, y: mousePos.y * -10 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              EXPERIENCE
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap self-end -mr-12 md:-mr-24 opacity-[0.04]"
            animate={{ x: mousePos.x * 25, y: mousePos.y * 15 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              SKILLS
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap -ml-6 md:-ml-12 opacity-[0.06]"
            animate={{ x: mousePos.x * -15, y: mousePos.y * -20 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
          >
            <h1 className="text-[100px] md:text-[180px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              RESUME
            </h1>
          </motion.div>
        </div>

        {/* FOREGROUND CONTENT */}
        <div className="relative z-10 w-full pt-16">
          <div className="flex flex-col items-center text-center mb-16">
            <RevealWrapper delay={0.1}>
              <h2 className="text-[60px] md:text-[100px] font-serif font-bold tracking-tighter text-beige mb-4 leading-none text-transparent stroke-text opacity-50">
                RESUME
              </h2>
              <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter text-beige -mt-8 md:-mt-16 relative z-10">
                My Experience
              </h2>
            </RevealWrapper>

            {/* Interactive Contact Badges */}
            <RevealWrapper delay={0.2} yOffset={20}>
              <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mt-16 md:mt-24 mb-10 max-w-5xl mx-auto px-4">
                <a href="mailto:annmariyarosepereira@gmail.com" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-beige/20 bg-beige/5 hover:bg-beige transition-all duration-300 transform hover:-translate-y-1 shadow-lg cursor-pointer">
                  <svg className="w-4 h-4 text-beige/80 group-hover:text-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-sans font-medium text-sm text-beige group-hover:text-dark transition-colors">annmariyarosepereira@gmail.com</span>
                </a>

                <a href="tel:+916235701868" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-beige/20 bg-beige/5 hover:bg-beige transition-all duration-300 transform hover:-translate-y-1 shadow-lg cursor-pointer">
                  <svg className="w-4 h-4 text-beige/80 group-hover:text-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-sans font-medium text-sm text-beige group-hover:text-dark transition-colors">+91-6235701868</span>
                </a>

                <a href="https://www.linkedin.com/in/ann-mariya-rose-pereira/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-beige/20 bg-beige/5 hover:bg-beige transition-all duration-300 transform hover:-translate-y-1 shadow-lg cursor-pointer">
                  <svg className="w-4 h-4 text-beige/80 group-hover:text-dark transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="font-sans font-medium text-sm text-beige group-hover:text-dark transition-colors">LinkedIn</span>
                </a>

                <a href="https://github.com/annmariyarosepereira" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-beige/20 bg-beige/5 hover:bg-beige transition-all duration-300 transform hover:-translate-y-1 shadow-lg cursor-pointer">
                  <svg className="w-4 h-4 text-beige/80 group-hover:text-dark transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-sans font-medium text-sm text-beige group-hover:text-dark transition-colors">GitHub</span>
                </a>
              </div>
            </RevealWrapper>
          </div>

          <div className="max-w-5xl mx-auto pl-4 md:pl-0">
            <div className="relative border-l border-beige/20 ml-6 md:ml-[150px] space-y-8 pb-4">
              {resumeItems.map((item, idx) => (
                <RevealWrapper key={idx} delay={0.2 + (idx * 0.1)} yOffset={20}>
                  <div className="relative pl-12 md:pl-24 group">
                    {/* Custom 4-point Star Timeline Connector */}
                    <div className="absolute -left-6 top-0 w-12 h-12 flex items-center justify-center bg-olive text-beige/50 group-hover:text-beige hover:scale-110 transition-all duration-500">
                      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0L56 44L100 50L56 56L50 100L44 56L0 50L44 44L50 0Z" fill="currentColor" />
                      </svg>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">
                      <div className="md:w-1/4 shrink-0 -mt-2">
                        <span className="text-3xl font-serif italic text-beige/80">{item.date}</span>
                      </div>

                      <div className="md:w-3/4">
                        <span className="text-sm font-bold tracking-widest uppercase text-beige/40 block mb-2">{item.type}</span>
                        <h3 className="text-3xl font-serif font-bold text-beige mb-2">{item.title}</h3>
                        <p className="text-beige/60 font-medium text-lg mb-6">{item.org}</p>

                        <ul className="space-y-3 mb-4">
                          {item.points.map((point, i) => (
                            <li key={i} className="text-beige/70 leading-relaxed text-base flex gap-4">
                              <span className="text-beige/30 mt-1 shrink-0">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {item.tech && (
                          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-beige/10">
                            <span className="text-xs font-bold tracking-widest uppercase text-beige/40 mr-2">Tech:</span>
                            {item.tech.map((techItem, i) => (
                              <span key={i} className="px-3 py-1 bg-beige/5 border border-beige/10 rounded-full text-xs font-serif italic text-beige/80">
                                {techItem}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>

            {/* Animated Skills Bars */}


            {/* CV Action Buttons */}
            <RevealWrapper delay={0.5} yOffset={20} className="flex justify-center mt-12 pb-16 relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                {/* View CV Button */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-beige text-beige px-10 py-5 rounded-full font-serif font-bold text-lg tracking-wide hover:bg-beige hover:text-dark hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(245,240,230,0.3)] transition-all duration-300 inline-flex items-center gap-3 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View CV
                </a>

                {/* Download CV Button */}
                <a
                  href="/resume.pdf"
                  download="Resume.pdf"
                  className="bg-beige border border-beige text-dark px-10 py-5 rounded-full font-serif font-bold text-lg tracking-wide hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(245,240,230,0.3)] transition-all duration-300 inline-flex items-center gap-3 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
