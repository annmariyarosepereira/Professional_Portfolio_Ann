import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';

const experiences = [
  {
    role: "Senior Full Stack Engineer",
    company: "TechNova Inc.",
    date: "2021 - Present",
    points: [
      "Architected and developed a distributed microservices platform using Node.js and gRPC.",
      "Mentored a team of 4 junior developers and established code review guidelines.",
      "Reduced build times by 40% through custom CI/CD pipeline optimizations."
    ]
  },
  {
    role: "Frontend Developer",
    company: "Digital Studio 42",
    date: "2018 - 2021",
    points: [
      "Built interactive marketing sites and e-commerce platforms using React and Next.js.",
      "Pioneered the adoption of Tailwind CSS across all internal projects, reducing CSS payload by 60%.",
      "Collaborated closely with award-winning designers to implement complex Framer Motion animations."
    ]
  }
];

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" bgColor="var(--color-olive)">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          
          <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-beige/10 pb-12 lg:pb-0 lg:pr-12">
            <RevealWrapper delay={0.1}>
              <div className="mb-8">
                <h2 className="text-[50px] md:text-[70px] lg:text-[90px] font-serif font-bold tracking-tighter text-transparent leading-[0.85]" style={{ WebkitTextStroke: '1px var(--color-beige)' }}>
                  EXPERIENCE
                </h2>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tighter text-beige -mt-2 md:-mt-6 relative z-10 italic">
                  Professional Roles
                </h2>
              </div>
            </RevealWrapper>
            
            <RevealWrapper delay={0.2} yOffset={20}>
              <p className="text-base text-beige/60 leading-relaxed font-medium">
                 A record of my professional roles, highlighting impactful contributions, leadership, and technical growth.
              </p>
            </RevealWrapper>
          </div>

          <div className="lg:col-span-2 space-y-8 lg:pl-12">
            <div className="relative border-l border-beige/20 ml-6 space-y-8 pb-4">
              {experiences.map((exp, idx) => (
                <RevealWrapper key={idx} delay={0.2 + (idx * 0.1)} yOffset={20}>
                  <div className="relative pl-12 group">
                    {/* Custom 4-point Star Timeline Connector */}
                    <div className="absolute -left-5 top-0 w-10 h-10 flex items-center justify-center bg-olive text-beige/50 group-hover:text-beige hover:scale-110 transition-all duration-500">
                      <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0L56 44L100 50L56 56L50 100L44 56L0 50L44 44L50 0Z" fill="currentColor"/>
                      </svg>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                       <div className="md:w-3/4">
                         <span className="text-sm font-bold tracking-widest uppercase text-beige/40 block mb-2">{exp.company}</span>
                         <h3 className="text-3xl font-serif font-bold text-beige mb-2">{exp.role}</h3>
                         
                         <ul className="space-y-3 mt-6">
                           {exp.points.map((point, i) => (
                             <li key={i} className="text-beige/70 leading-relaxed text-base flex gap-4">
                               <span className="text-beige/30 mt-1 shrink-0">•</span>
                               <span>{point}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                       
                       <div className="shrink-0 -mt-2">
                          <span className="text-2xl font-serif italic text-beige/70">{exp.date}</span>
                       </div>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
