'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectsSection from '@/components/sections/projects-section';
import { IntroAnimation } from '@/components/intro-animation';
import { FloatingActionBar } from '@/components/floating-action-bar';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>
      <main className="flex-1">
        <ProjectsSection show={!showIntro} />
      </main>
      <AnimatePresence>
        {!showIntro && <FloatingActionBar />}
      </AnimatePresence>
    </div>
  );
}
