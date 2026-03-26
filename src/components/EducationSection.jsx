import { useState, useRef, useEffect } from 'react';
import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';
import { motion, useInView, animate } from 'framer-motion';

const educationList = [
  {
    school: "Lovely Professional University",
    location: "Punjab, India",
    degree: "Bachelor of Technology - Computer Science and Engineering",
    date: "Since August 2023",
    details: "CGPA: 6.94"
  },
  {
    school: "St Sebastian's Higher Secondary School",
    location: "Kochi, Kerala",
    degree: "Intermediate",
    date: "June 2020 - March 2022",
    details: "Percentage: 97.4%"
  },
  {
    school: "St Sebastian's Higher Secondary School",
    location: "Kochi, Kerala",
    degree: "Matriculation",
    date: "June 2019 - March 2020",
    details: "Percentage: 100%"
  }
];

function AnimatedMetric({ label, value, inView, isDecimal, suffix, finalString }) {
  const nodeRef = useRef(null);
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (nodeRef.current) {
            if (isDecimal) {
              nodeRef.current.textContent = v.toFixed(2);
            } else {
              nodeRef.current.textContent = Math.floor(v);
            }
          }
        },
        onComplete: () => {
          if (nodeRef.current) {
            nodeRef.current.textContent = finalString;
          }
        }
      });
      return () => controls.stop();
    }
  }, [value, inView, isDecimal, finalString]);

  return (
    <p className="text-beige/80 font-medium">
      {label} <span ref={nodeRef}>{isDecimal ? "0.00" : "0"}</span>{suffix}
    </p>
  );
}

function EducationMetricWrapper({ item }) {
  const ref = useRef(null);
  // triggers animation individually as they scroll down, every time
  const isInView = useInView(ref, { margin: "-50px" });

  let label = "";
  let value = 0;
  let isDecimal = false;
  let suffix = "";
  let finalString = "";

  if (item.details.includes("CGPA:")) {
    label = "CGPA: ";
    value = 6.94;
    isDecimal = true;
    suffix = "";
    finalString = "6.94";
  } else if (item.details.includes("97.4%")) {
    label = "Percentage: ";
    value = 97.4;
    isDecimal = false;
    suffix = "%";
    finalString = "97.4";
  } else if (item.details.includes("100%")) {
    label = "Percentage: ";
    value = 100;
    isDecimal = false;
    suffix = "%";
    finalString = "100";
  } else {
    return <p className="text-beige/80 font-medium">{item.details}</p>;
  }

  return (
    <div ref={ref}>
      <AnimatedMetric 
         label={label} 
         value={value} 
         inView={isInView} 
         isDecimal={isDecimal} 
         suffix={suffix} 
         finalString={finalString}
      />
    </div>
  );
}

export function EducationSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 });
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
    <SectionWrapper id="education" bgColor="var(--color-burgundy)">
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
            className="whitespace-nowrap -ml-12 md:-ml-24 opacity-[0.05]"
            animate={{ x: mousePos.x * -20, y: mousePos.y * -10 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              EDUCATION
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap self-end -mr-12 md:-mr-24 opacity-[0.04]"
            animate={{ x: mousePos.x * 25, y: mousePos.y * 15 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              JOURNEY
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap -ml-6 md:-ml-12 opacity-[0.06]"
            animate={{ x: mousePos.x * -15, y: mousePos.y * -20 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
          >
            <h1 className="text-[100px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              KNOWLEDGE
            </h1>
          </motion.div>
        </div>

        {/* FOREGROUND CONTENT */}
        <div className="relative z-10 w-full pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">

            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-beige/10 pb-12 lg:pb-0 lg:pr-12">
              <RevealWrapper delay={0.1}>
                <div className="mb-8">
                  <h2 className="text-[60px] md:text-[80px] lg:text-[80px] font-serif font-bold tracking-tighter text-transparent leading-none" style={{ WebkitTextStroke: '1px var(--color-beige)' }}>
                    EDUCATION
                  </h2>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tighter text-beige -mt-4 md:-mt-8 relative z-10 italic">
                    My Journey
                  </h2>
                </div>
              </RevealWrapper>

              <RevealWrapper delay={0.2} yOffset={20}>
                <p className="text-base text-beige/60 leading-relaxed font-medium">
                  My formal educational journey, laying the foundation for theoretical computer science and hands-on software engineering.
                </p>
              </RevealWrapper>
            </div>

            <div className="lg:col-span-2 space-y-8 lg:pl-12">
              <div className="relative border-l border-beige/20 ml-6 space-y-8 pb-4">
                {educationList.map((edu, idx) => (
                  <RevealWrapper key={idx} delay={0.2 + (idx * 0.1)} yOffset={20}>
                    <div className="relative pl-12 group">
                      {/* Custom 4-point Star Timeline Connector */}
                      <div className="absolute -left-5 top-0 w-10 h-10 flex items-center justify-center bg-burgundy text-beige/50 group-hover:text-beige hover:scale-110 transition-all duration-500">
                        <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50 0L56 44L100 50L56 56L50 100L44 56L0 50L44 44L50 0Z" fill="currentColor" />
                        </svg>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <span className="text-sm font-bold tracking-widest uppercase text-beige/40 block mb-2">{edu.school}</span>
                          <h3 className="text-3xl font-serif font-bold text-beige mb-2">{edu.degree}</h3>
                          <p className="text-beige/60 font-medium mb-4">{edu.location}</p>
                          <EducationMetricWrapper item={edu} />
                        </div>

                        <div className="shrink-0 -mt-2">
                          <span className="text-2xl font-serif italic text-beige/70">{edu.date}</span>
                        </div>
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
