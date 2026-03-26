import { RevealWrapper } from './RevealWrapper';
import { SectionWrapper } from './SectionWrapper';

const achievements = [
  {
    title: "1st Place - Global FinTech Hackathon",
    desc: "Led a team of 4 to build a decentralized finance prototype over 48 hours."
  },
  {
    title: "Top Rated Plus on Upwork",
    desc: "Maintained a 100% Job Success Score with over 30 completed projects."
  },
  {
    title: "Open Source Contributor",
    desc: "Key contributions to React and Framer Motion libraries."
  }
];

export function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" bgColor="var(--color-beige)">
       <div className="w-full">
        <RevealWrapper delay={0.1}>
          <div className="mb-16">
            <h2 className="text-[70px] md:text-[100px] lg:text-[130px] font-serif font-bold tracking-tighter text-transparent leading-none" style={{ WebkitTextStroke: '1px var(--color-dark)' }}>
              ACHIEVEMENTS
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter text-dark -mt-6 md:-mt-10 relative z-10 italic">
              Selected Milestones.
            </h2>
          </div>
        </RevealWrapper>
        
        <div className="space-y-12">
          {achievements.map((item, idx) => (
            <RevealWrapper key={idx} delay={0.2 + (idx * 0.1)} yOffset={20}>
              <div className="group relative pt-8 border-t border-dark/10 hover:border-burgundy transition-colors duration-500 flex flex-col md:flex-row gap-6 md:items-start pl-8">
                 
                 {/* Decorative Accent */}
                 <div className="absolute left-0 top-8 w-2 h-2 rounded-full bg-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1"></div>

                 <div className="shrink-0 w-24 md:w-32 -mt-4">
                   <span className="text-6xl md:text-8xl font-serif font-bold text-dark/10 group-hover:text-burgundy/20 transition-colors duration-500">
                     0{idx + 1}
                   </span>
                 </div>
                 
                 <div className="flex-grow pt-2">
                   <h3 className="text-2xl md:text-3xl font-serif font-bold text-dark mb-4 group-hover:text-burgundy transition-colors duration-300">
                     {item.title}
                   </h3>
                   <p className="text-dark/70 font-medium text-lg leading-relaxed max-w-2xl">
                     {item.desc}
                   </p>
                 </div>
                 
              </div>
            </RevealWrapper>
          ))}
        </div>
       </div>
    </SectionWrapper>
  );
}
