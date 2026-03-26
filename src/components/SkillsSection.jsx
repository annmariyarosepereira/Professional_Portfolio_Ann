import { useState, useRef, useEffect } from 'react';
import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';
import { motion, useInView } from 'framer-motion';

const langData = [
  { name: 'C', progress: '80%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'C++', progress: '85%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', progress: '85%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Python', progress: '85%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'JavaScript', progress: '85%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' }
];

const radar1 = [
  { name: 'Power BI', progress: '90%' },
  { name: 'MySQL', progress: '80%' },
  { name: 'Excel', progress: '95%' },
  { name: 'ML', progress: '70%' },
  { name: 'Pandas', progress: '85%' }
];

const radar2 = [
  { name: 'EDA', progress: '80%' },
  { name: 'Regression', progress: '75%' },
  { name: 'Visualization', progress: '90%' },
  { name: 'Statistics', progress: '65%' },
  { name: 'Feature Eng.', progress: '70%' }
];

const frontendSkills = [
  { name: 'HTML & CSS', progress: '95%' },
  { name: 'JavaScript', progress: '85%' },
  { name: 'React JS', progress: '90%' }
];

const marketingSkills = [
  { name: 'SEO Opt.', progress: '85%' },
  { name: 'Social Media', progress: '90%' },
  { name: 'Google Analytics', progress: '80%' }
];

function getPolygonPoints(values, radius, cx, cy) {
  return values.map((val, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / 5);
    const r = (val / 100) * radius;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}

function LangCard({ lang }) {
  return (
    <div className="relative w-[72px] h-[80px] rounded-xl border border-dark/10 flex flex-col items-center justify-center bg-beige overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[3px] shadow-sm hover:shadow-[0_10px_20px_rgba(107,21,21,0.15)] cursor-pointer group">
      <div className="absolute top-full left-0 w-full h-full bg-burgundy transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full z-0"></div>
      <img src={lang.icon} className="w-8 h-8 z-10 transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110 group-hover:-rotate-3" alt={lang.name} />
      <span className="mt-2 text-[0.75rem] font-serif font-bold text-dark z-10 transition-colors duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-beige">{lang.name}</span>
    </div>
  );
}

function RadarChart({ skills, title }) {
  const values = skills.map(s => parseInt(s.progress));
  const cx = 100, cy = 100, radius = 70;
  const targetPoints = getPolygonPoints(values, radius, cx, cy);
  const startPoints = Array(5).fill(`${cx},${cy}`).join(' ');

  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-50px" });

  const rings = [0.33, 0.66, 1].map(scale => {
    const r = radius * scale;
    const points = Array.from({length: 5}).map((_, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI / 5);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
    // tailwind stroke class for exact consistency
    return <polygon key={scale} points={points} fill="none" className="stroke-dark/10" strokeWidth="1.5" />;
  });
  
  const axes = Array.from({length: 5}).map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / 5);
    return <line key={i} x1={cx} y1={cy} x2={cx + radius * Math.cos(angle)} y2={cy + radius * Math.sin(angle)} className="stroke-dark/10" strokeWidth="1.5" />;
  });

  return (
    <div className="flex flex-col items-center bg-beige p-6 rounded-2xl border border-dark/10 w-full max-w-[350px] shadow-sm" ref={ref}>
       <h4 className="font-serif font-bold text-[1.1rem] text-dark mb-4 text-center">{title}</h4>
       <svg width="200" height="200" viewBox="0 0 200 200">
         <g>{rings}{axes}</g>
         <motion.polygon 
           initial={{ points: startPoints }}
           animate={{ points: inView ? targetPoints : startPoints }}
           transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
           fill="rgba(107,21,21,0.15)" stroke="var(--color-burgundy)" strokeWidth="2" strokeLinejoin="round"
         />
       </svg>
       <div className="flex flex-wrap justify-center gap-2 mt-6">
         {skills.map((s, i) => (
           <span key={i} className="border border-burgundy text-burgundy rounded-full px-3 py-1 text-[0.7rem] font-bold font-sans tracking-widest uppercase">
             {s.name} {s.progress}
           </span>
         ))}
       </div>
    </div>
  );
}

function CircularRing({ skill }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-50px" });
  const pct = parseInt(skill.progress, 10);
  const CIRCUMFERENCE = 2 * Math.PI * 22;

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (inView) {
      let startTime;
      const animateCount = (currTime) => {
        if (!startTime) startTime = currTime;
        const progress = Math.min((currTime - startTime) / 1600, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeOut * pct));
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);
    } else {
      setCount(0);
    }
  }, [inView, pct]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative w-[52px] h-[52px] flex items-center justify-center">
        <svg width="52" height="52" viewBox="0 0 52 52" className="absolute -rotate-90">
          <circle cx="26" cy="26" r="22" fill="none" className="stroke-dark/5" strokeWidth="3" />
          <circle 
            cx="26" cy="26" r="22" fill="none" stroke="var(--color-burgundy)" strokeWidth="3"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={inView ? CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE : CIRCUMFERENCE}
            className="transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-serif text-[0.85rem] font-bold text-dark z-10">{count}%</span>
      </div>
      <span className="font-serif text-[0.9rem] font-bold text-dark text-center w-[90px] leading-tight">{skill.name}</span>
    </div>
  );
}

export function SkillsSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 }); 
  const [isMouseInside, setIsMouseInside] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRawMouse({ x, y });
    setMousePos({ x: (x / rect.width) * 2 - 1, y: (y / rect.height) * 2 - 1 });
  };

  return (
    <SectionWrapper id="skills" bgColor="var(--color-beige)">
      <div 
        className="w-full relative min-h-screen"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >
        {/* Glow Trail */}
        <motion.div
           className="pointer-events-none absolute w-[400px] h-[400px] bg-burgundy/15 rounded-full blur-[100px] mix-blend-multiply z-0"
           animate={{ x: rawMouse.x - 200, y: rawMouse.y - 200, opacity: isMouseInside ? 1 : 0 }}
           transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        />

        {/* Parallax Ghost Text Words */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-between py-12 md:py-24">
          <motion.div
            className="whitespace-nowrap -ml-12 md:-ml-24 opacity-[0.05]"
            animate={{ x: mousePos.x * -20, y: mousePos.y * -10 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-dark)' }}>
              SKILLS
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap self-end -mr-12 md:-mr-24 opacity-[0.05]"
            animate={{ x: mousePos.x * 25, y: mousePos.y * 15 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-dark)' }}>
              ARSENAL
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap -ml-6 md:-ml-12 opacity-[0.05]"
            animate={{ x: mousePos.x * -15, y: mousePos.y * -20 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
          >
            <h1 className="text-[100px] md:text-[200px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-dark)' }}>
              EXPERTISE
            </h1>
          </motion.div>
        </div>

        <div className="w-full max-w-6xl mx-auto py-12 md:py-8 pl-4 lg:pl-0 relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
             <RevealWrapper delay={0.1}>
               <h2 className="text-[60px] md:text-[100px] font-serif font-bold tracking-tighter text-transparent leading-none opacity-40" style={{ WebkitTextStroke: '2px var(--color-dark)' }}>
                 SKILLS
               </h2>
               <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter text-dark -mt-8 md:-mt-16 relative z-10 italic">
                 Technical Arsenal
               </h2>
             </RevealWrapper>
             
             <RevealWrapper delay={0.2} yOffset={20}>
               <p className="mt-6 text-dark/70 font-medium max-w-2xl mx-auto text-base md:text-lg">
                 A showcase of technologies I've mastered on my journey as a developer.
               </p>
             </RevealWrapper>
          </div>

          <div className="flex flex-col w-full mt-16 max-w-5xl mx-auto px-4">
             
             {/* 1. PROGRAMMING LANGUAGES */}
             <div className="mb-20">
                <h3 className="font-serif font-bold text-[1.4rem] tracking-[0.15em] mb-4 text-dark text-center" style={{ fontVariant: 'small-caps' }}>
                  PROGRAMMING LANGUAGES
                </h3>
                <div className="w-full h-px bg-dark/20 mb-12" />
                <div className="flex flex-wrap justify-center gap-5">
                  {langData.map(lang => <LangCard key={lang.name} lang={lang} />)}
                </div>
             </div>

             {/* 2. DATA SCIENCE */}
             <div className="mb-20">
                <h3 className="font-serif font-bold text-[1.4rem] tracking-[0.15em] mb-4 text-dark text-center" style={{ fontVariant: 'small-caps' }}>
                  DATA SCIENCE
                </h3>
                <div className="w-full h-px bg-dark/20 mb-12" />
                <div className="flex flex-wrap justify-center gap-12">
                  <RadarChart skills={radar1} title="Analytics & BI Tools" />
                  <RadarChart skills={radar2} title="DS & Analysis Concepts" />
                </div>
             </div>

             {/* 3 & 4. FRONTEND & MARKETING wrapper */}
             <div className="flex flex-wrap justify-center gap-16 mb-20">
                
                <div className="flex-1 min-w-[300px]">
                  <h3 className="font-serif font-bold text-[1.4rem] tracking-[0.15em] mb-4 text-dark text-center" style={{ fontVariant: 'small-caps' }}>
                    FRONTEND
                  </h3>
                  <div className="w-full h-px bg-dark/20 mb-10" />
                  <div className="flex flex-wrap justify-center gap-10">
                     {frontendSkills.map(skill => <CircularRing key={skill.name} skill={skill} />)}
                  </div>
                </div>

                <div className="flex-1 min-w-[300px]">
                  <h3 className="font-serif font-bold text-[1.4rem] tracking-[0.15em] mb-4 text-dark text-center" style={{ fontVariant: 'small-caps' }}>
                    DIGITAL MARKETING
                  </h3>
                  <div className="w-full h-px bg-dark/20 mb-10" />
                  <div className="flex flex-wrap justify-center gap-10">
                     {marketingSkills.map(skill => <CircularRing key={skill.name} skill={skill} />)}
                  </div>
                </div>

             </div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
