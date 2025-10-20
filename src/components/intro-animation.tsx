
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lines = [
  { text: "It always starts the same way", duration: 3000 },
  { text: "a blank screen, a spark, an idea that refuses to stay quiet.", duration: 4000 },
  { 
    text: (
      <>
        <p>Hours turn into nights,</p>
        <p>sketches become systems,</p>
        <p>and chaos slowly finds structure.</p>
      </>
    ), 
    duration: 5000 
  },
  { text: "The thrill isn’t in the code", duration: 3000 },
  { text: "it’s in watching something come alive.", duration: 4000, dramatic: true },
];

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (index >= lines.length) return;

    const timer = setTimeout(() => {
        if (index < lines.length - 1) {
            setIndex(prev => prev + 1);
        }
    }, lines[index].duration);

    return () => clearTimeout(timer);
  }, [index]);

  const handleAnimationComplete = () => {
    if (index === lines.length - 1) {
        setTimeout(() => {
            setIsAnimating(false); 
            setTimeout(onComplete, 1500);
        }, 1000); 
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
            key={index}
            className="font-headline text-5xl md:text-8xl font-extrabold text-primary tracking-tighter text-center max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
                duration: 1.2, 
                ease: 'easeInOut'
            }}
            onAnimationComplete={handleAnimationComplete}
        >
            {lines[index]?.text}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}
