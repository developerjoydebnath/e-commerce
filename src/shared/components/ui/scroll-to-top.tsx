'use client';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth the scroll progress for a more "premium" feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const startY = window.scrollY;
    const duration = 500;
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => --t * t * t + 1;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);

      window.scrollTo(0, startY * (1 - easeOutCubic(percent)));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed right-6 bottom-24 z-50 sm:right-8 sm:bottom-28"
        >
          <div className="group relative">
            {/* SVG Progress Ring */}
            <svg
              className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle (track) */}
              <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted/20" strokeWidth="4" />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className="stroke-primary"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  pathLength: scaleX,
                }}
              />
            </svg>

            <Button
              size="icon"
              onClick={scrollToTop}
              className={cn(
                'relative z-10 h-12 w-12 rounded-full shadow-lg transition-all hover:shadow-xl',
                'bg-primary hover:bg-primary/90 text-primary-foreground'
              )}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-6 w-6 transition-transform group-hover:-translate-y-1" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
