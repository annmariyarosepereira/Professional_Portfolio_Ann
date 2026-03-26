import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export function RevealWrapper({ 
  children, 
  className, 
  delay = 0, 
  yOffset = 40, 
  duration = 0.8,
  once = true,
  margin = "-100px"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
}
