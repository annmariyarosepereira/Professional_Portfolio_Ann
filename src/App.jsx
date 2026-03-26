import { ReactLenis } from 'lenis/react';
import { TopNavbar } from './components/TopNavbar';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ResumeSection } from './components/ResumeSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <ReactLenis root>
      <Navigation />
      <main className="w-full flex flex-col overflow-hidden">
        <HeroSection />          {/* 1. Burgundy */}
        <AboutSection />         {/* 2. Beige */}
        <ResumeSection />        {/* 3. Olive */}
        <EducationSection />     {/* 4. Burgundy */}
        <SkillsSection />        {/* 5. Beige */}
        <ProjectsSection />      {/* 6. Olive */}
        <CertificationsSection />{/* 7. Burgundy */}
        <ContactSection />       {/* 8. Burgundy */}
      </main>
    </ReactLenis>
  );
}

export default App;
