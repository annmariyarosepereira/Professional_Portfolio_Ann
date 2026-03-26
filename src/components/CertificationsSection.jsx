import { useState, useRef, useEffect } from 'react';
import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';
import { motion, useInView } from 'framer-motion';

const certifications = [
  {
    title: "From Data to Decisions : A Hands-On Approach to Data Science",
    issuer: "Skill Development LPU",
    date: "Aug '25",
    badge: "DS",
    image: "/C2.png"
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    date: "Nov '25",
    badge: "CC",
    image: "/C1.png"
  },
  {
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    issuer: "Udemy",
    date: "Feb '24",
    badge: "PY",
    image: "/C3.png"
  },
  {
    title: "Responsive Web Design",
    issuer: "Free Code Camp",
    date: "Nov '23",
    badge: "RWD",
    image: "/C4.png"
  }
];

export function CertificationsSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // normalized parallax
  const [rawMouse, setRawMouse] = useState({ x: -1000, y: -1000 }); // container coordinates
  const [viewportMouse, setViewportMouse] = useState({ x: -1000, y: -1000 }); // fixed screen coords
  const [isMouseInside, setIsMouseInside] = useState(false);

  const [hoveredCert, setHoveredCert] = useState(null);
  const [altToggle, setAltToggle] = useState(false);

  const handleMouseMove = (e) => {
    setViewportMouse({ x: e.clientX, y: e.clientY });

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRawMouse({ x, y });
    setMousePos({ x: (x / rect.width) * 2 - 1, y: (y / rect.height) * 2 - 1 });
  };

  const handleMouseEnterRow = (cert) => {
    setHoveredCert(cert);
    setAltToggle(prev => !prev);
  };
  
  const handleMouseLeaveRow = () => {
    setHoveredCert(null);
  };

  const isVisible = hoveredCert !== null;

  return (
    <SectionWrapper id="certifications" bgColor="var(--color-burgundy)">
      <div 
        className="w-full relative min-h-screen py-24"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >
        <style>{`
          .cert-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px 12px;
            border-bottom: 0.5px solid rgba(245,240,230,0.1);
            cursor: pointer;
            transition: background 0.3s ease;
            border-radius: 4px;
          }
          .cert-row:hover {
            background: rgba(245,240,230,0.05);
          }
          .cert-name {
            font-size: 22px;
            color: var(--color-beige);
            font-weight: 400;
            transition: font-style 0.3s;
          }
          .cert-row:hover .cert-name {
            font-style: italic;
          }
          
          .cert-popup {
            position: fixed;
            width: 320px;
            background: #1a0505;
            border: 0.5px solid rgba(245,240,230,0.2);
            border-radius: 12px;
            overflow: hidden;
            pointer-events: none;
            opacity: 0;
            transform: rotate(-8deg) scale(0.85);
            transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            left: 0;
            top: 0;
            will-change: left, top;
          }
          .cert-popup.visible {
            opacity: 1;
            transform: rotate(3deg) scale(1);
          }
          .cert-popup.visible.alt {
            transform: rotate(-3deg) scale(1);
          }
        `}</style>
        
        {/* Glow Trail */}
        <motion.div
           className="pointer-events-none absolute w-[400px] h-[400px] bg-beige/10 rounded-full blur-[100px] mix-blend-screen z-0"
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
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent uppercase" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              CERTIFIED
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap self-end -mr-12 md:-mr-24 opacity-[0.05]"
            animate={{ x: mousePos.x * 25, y: mousePos.y * 15 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[220px] font-serif font-bold text-transparent uppercase" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              ACHIEVEMENT
            </h1>
          </motion.div>

          <motion.div
            className="whitespace-nowrap -ml-6 md:-ml-12 opacity-[0.05]"
            animate={{ x: mousePos.x * -15, y: mousePos.y * -20 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
          >
            <h1 className="text-[100px] md:text-[220px] font-serif font-bold text-transparent uppercase" style={{ WebkitTextStroke: '2px var(--color-beige)' }}>
              KNOWLEDGE
            </h1>
          </motion.div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-0">
          <div className="flex flex-col items-center text-center pb-8 border-b border-beige/10 mb-12">
            <RevealWrapper delay={0.1}>
              <h1 className="text-[64px] font-serif italic text-beige font-normal mb-8">Certifications</h1>
            </RevealWrapper>
          </div>
          
          <div className="flex flex-col">
            {certifications.map((cert, idx) => (
              <RevealWrapper key={idx} delay={0.2 + (idx * 0.1)} yOffset={20}>
                <div 
                  className="cert-row"
                  onMouseEnter={() => handleMouseEnterRow(cert)}
                  onMouseLeave={handleMouseLeaveRow}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[13px] text-beige/30 font-serif italic w-7">0{idx + 1}</span>
                    <span className="cert-name font-serif">{cert.title}</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-[11px] tracking-[2px] text-beige/50 uppercase font-sans font-bold">{cert.issuer}</div>
                    <div className="text-[12px] text-beige/30 mt-1 font-serif italic">{cert.date}</div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* POPUP COMPONENT OVERLAY */}
        <div 
          className={`cert-popup ${isVisible ? 'visible' : ''} ${altToggle ? 'alt' : ''}`}
          style={{ left: `${viewportMouse.x + 24}px`, top: `${viewportMouse.y - 120}px` }}
        >
          {hoveredCert?.image ? (
            <img 
              src={hoveredCert.image} 
              alt={hoveredCert.title} 
              className="w-full h-[200px] object-cover bg-dark"
            />
          ) : (
            <div className="w-full h-[200px] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#3d0f0f] to-[#5a1515] p-4 text-center">
              <div className="w-12 h-12 border-[1.5px] border-beige/40 rounded-full flex items-center justify-center text-xl text-beige/70 font-serif shrink-0">✦</div>
              <div className="text-[12px] tracking-[1.5px] text-beige/60 text-center uppercase font-sans font-bold leading-relaxed line-clamp-3">
                {hoveredCert ? hoveredCert.title : 'Certificate'}
              </div>
            </div>
          )}
          
          <div className="px-5 py-4 flex justify-between items-center bg-[#1a0505] border-t border-beige/10">
            <span className="text-[11px] tracking-[1.5px] text-beige/50 uppercase font-sans font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-[220px]">
              {hoveredCert ? hoveredCert.issuer : 'Issuer'}
            </span>
            <span className="text-[12px] text-beige/30 font-serif italic shrink-0">
              {hoveredCert ? hoveredCert.date : 'Year'}
            </span>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
