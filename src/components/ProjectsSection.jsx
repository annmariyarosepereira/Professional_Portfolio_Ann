import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';

const projects = [
  {
    title: 'Aesthetic Ann Jewellery',
    description: 'A full-stack MERN e-commerce web application designed for browsing, purchasing, and managing jewelry products online.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    details: 'Developed a comprehensive platform featuring secure JWT user authentication, dynamic product catalogs with stock tracking, a complete shopping cart and checkout system, and custom features like a jewelry care tracker.',
    result: 'Delivered a smooth, responsive end-to-end shopping experience, empowering users to securely manage their profiles, write product reviews, and track order histories.',
    link: 'https://github.com/annmariyarosepereira/aesthetic-ann-anti-jewellery',
    videoSrc: '/video1.mp4', // ADD VIDEO FILENAME HERE (MUST BE IN PUBLIC FOLDER)
  },
  {
    title: 'Global AI & Data Job Market Dashboard',
    description: 'A comprehensive data analytics dashboard analyzing the global AI and Data Science job market to help students and professionals make informed career decisions.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Excel'],
    details: 'Processed real-world Kaggle datasets using Power Query. Designed a star schema with bridge tables and advanced DAX measures to build an interactive multi-page dashboard featuring skill vs salary scatter plots and role-skill heatmaps.',
    result: 'Successfully transformed raw job market data into an interactive decision-support system, enabling users to identify high-demand skills and understand salary trends natively.',
    link: 'https://github.com/annmariyarosepereira/Project-AI-Data-Job-Market-Insights-Dashboard', // REPLACE WITH GITHUB/PROJECT LINK
    videoSrc: '/video2.mp4', // ADD VIDEO FILENAME HERE (MUST BE IN PUBLIC FOLDER)
  },
  {
    title: 'DataMinds: ML & Analytics',
    description: 'An end-to-end data analytics pipeline covering data cleaning, EDA, predictive machine learning modeling, and insight visualization.',
    tech: ['Python', 'XGBoost', 'Scikit-learn', 'Power BI'],
    details: 'Conducted exploratory data analysis using Pandas and Seaborn. Developed and evaluated machine learning models to predict customer behavior using Scikit-Learn and XGBoost.',
    result: 'Delivered a complete predictive pipeline culminating in an interactive Power BI dashboard featuring KPIs, trend analysis, and custom DAX measures.',
    link: 'https://github.com/annmariyarosepereira/DataMinds-ML-PowerBI',
    videoSrc: '/video3.mp4', // ADD VIDEO FILENAME HERE (MUST BE IN PUBLIC FOLDER)
  },
  {
    title: 'Global Attention Shift Predictor',
    description: 'A data-driven machine learning system designed to analyze, model, and predict how human digital attention shifts over time across multiple platforms.',
    tech: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas'],
    details: 'Engineered a custom Human Attention Index (HAI) by normalizing and combining behavioral signals from Google Search, YouTube, TikTok, and OS Screen Time datasets.',
    result: 'Developed a fully interactive Streamlit web application featuring trend classification and real-time user-driven attention forecasting using regression models.',
    link: 'https://github.com/annmariyarosepereira/global-attention-shift-predictor',
    imageSrc: '/image1.png', // ADD IMAGE FILENAME HERE (MUST BE IN PUBLIC FOLDER)
  }
];

import { useState } from 'react';
import { motion } from 'framer-motion';

export function ProjectsSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // normalized parallax
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 }); // cursor tracking
  const [isMouseInside, setIsMouseInside] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRawMouse({ x, y });
    setMousePos({ x: (x / rect.width) * 2 - 1, y: (y / rect.height) * 2 - 1 });
  };

  return (
    <SectionWrapper id="projects" bgColor="var(--color-olive)">
      <div 
        className="w-full relative min-h-screen py-24"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >
        
        {/* Glow Trail */}
        <motion.div
           className="pointer-events-none absolute w-[400px] h-[400px] bg-beige/5 rounded-full blur-[100px] mix-blend-screen z-0"
           animate={{ x: rawMouse.x - 200, y: rawMouse.y - 200, opacity: isMouseInside ? 1 : 0 }}
           transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        />

        {/* Parallax Ghost Text Words */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-between py-12 md:py-32">
          <motion.div
            className="whitespace-nowrap -ml-12 md:-ml-24 opacity-[0.05]"
            animate={{ x: mousePos.x * -20, y: mousePos.y * -10 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              fullstack
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap self-end -mr-12 md:-mr-24 opacity-[0.05]"
            animate={{ x: mousePos.x * 25, y: mousePos.y * 15 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              Data Science
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap -ml-6 md:-ml-12 opacity-[0.05]"
            animate={{ x: mousePos.x * -15, y: mousePos.y * -20 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
          >
            <h1 className="text-[100px] md:text-[220px] font-serif font-bold text-transparent" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              Digital Marketing
            </h1>
          </motion.div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full">
          <div className="flex flex-col items-center text-center pb-24 border-b border-beige/10 mb-24">
            <RevealWrapper delay={0.1}>
            <h2 className="text-[100px] md:text-[140px] font-serif font-bold tracking-tighter text-transparent stroke-text leading-[0.85] opacity-30">
              SELECTED
            </h2>
            <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-beige -mt-10 md:-mt-16 relative z-10 italic">
              Work
            </h2>
          </RevealWrapper>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <RevealWrapper key={index} delay={0.2} yOffset={40}>
              <div className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Project Media Area - Rounded Corners & Hover Effect */}
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={`lg:col-span-7 h-[280px] md:h-[450px] w-full relative overflow-hidden rounded-3xl md:rounded-[40px] shadow-2xl bg-dark/40 border border-beige/10 group/image ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>

                  {project.videoSrc ? (
                    <video
                      src={project.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[0.76,0,0.24,1] group-hover/image:scale-[1.03]"
                    />
                  ) : project.imageSrc ? (
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-contain p-4 md:p-8 transition-transform duration-1000 ease-[0.76,0,0.24,1] group-hover/image:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-dark/60 to-burgundy/40 transition-transform duration-1000 ease-[0.76,0,0.24,1] group-hover/image:scale-[1.03]"></div>
                  )}

                  {/* Hover GitHub Link Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 bg-dark/60 backdrop-blur-[2px] transition-all duration-500 z-20">
                    <div className="flex flex-col items-center gap-3 transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500">
                      <svg className="w-12 h-12 text-beige drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-beige font-serif italic text-xl drop-shadow-md">View Source Code</span>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <div className="w-2 h-2 rounded-full bg-beige"></div>
                    <div className="w-2 h-2 rounded-full bg-beige"></div>
                  </div>
                </a>

                {/* Project Info Area */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1 lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-mono text-beige/50">0{index + 1}</span>
                    <div className="flex gap-2">
                      {project.tech.slice(0, 2).map((tech, i) => (
                        <span key={i} className="px-3 py-1 border border-beige/20 rounded-full text-xs font-medium text-beige/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a href={project.link}>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-beige mb-6 group-hover:italic transition-all duration-500">
                      {project.title}
                    </h3>
                  </a>

                  <p className="text-beige/70 mb-8 text-lg md:text-xl leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-6 mb-10 pt-8 border-t border-beige/10">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-beige/40 block mb-2 font-bold">Details</span>
                      <span className="text-base font-serif italic text-beige/90">{project.details}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-beige/40 block mb-2 font-bold">Result</span>
                      <span className="text-base font-medium text-beige/90">{project.result}</span>
                    </div>
                  </div>

                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-xs tracking-widest uppercase font-bold text-beige hover:text-beige/60 transition-colors">
                    View Repository
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                </div>

              </div>
            </RevealWrapper>
          ))}
        </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
