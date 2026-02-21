'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import MainHeader from './MainHeader';
import Navigation from './Navigation';
import TopBar from './TopBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`bg-background sticky top-0 z-50 flex w-full flex-col transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : 'auto',
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <TopBar />
      </motion.div>
      <MainHeader isScrolled={isScrolled} />
      <Navigation isScrolled={isScrolled} />
    </motion.header>
  );
}
