import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  variants: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const AnimatedSection = ({
  children,
  variants,
  delay = 0,
  className = '',
  once = true,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
