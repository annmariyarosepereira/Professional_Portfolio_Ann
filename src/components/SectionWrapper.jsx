import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../utils/cn';

export function SectionWrapper({ 
  children, 
  id,
  className, 
  bgColor = 'var(--color-beige)' // Default background for the section
}) {
  const ref = useRef(null);
  
  // margin: "-40% 0px" means it triggers when the section is at least 40% into the viewport
  const isInView = useInView(ref, { margin: "-40% 0px" });

  useEffect(() => {
    if (isInView) {
      document.documentElement.style.setProperty('--bg-color', bgColor);
      
      // Update text color dynamically based on background
      // If the background is burgundy or dark olive, we want light text
      if (bgColor === 'var(--color-burgundy)' || bgColor === 'var(--color-olive)') {
         document.body.classList.add('text-beige');
         document.body.classList.remove('text-dark');
      } else {
         document.body.classList.add('text-dark');
         document.body.classList.remove('text-beige');
      }
    }
  }, [isInView, bgColor]);

  return (
    <section 
      id={id}
      ref={ref}
      // Reduced top and bottom padding, ensure flex centering and min-h-screen
      className={cn("min-h-screen flex items-center justify-center py-12 md:py-20 relative z-10 box-border overflow-hidden", className)}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
}
