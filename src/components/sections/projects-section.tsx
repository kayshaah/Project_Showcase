

'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import type { Project } from '@/lib/data';
import { AiPortfolioAnimation } from '@/components/ai-portfolio-animation';
import { ParkEazyAnimation } from '@/components/parkeazy-animation';
import { CancerDetectionAnimation } from '@/components/cancer-detection-animation';
import { FoodEazyAnimation } from '@/components/foodeazy-animation';
import { SemanticLayerAnimation } from '@/components/semantic-layer-animation';
import { ContractSummarizationAnimation } from '@/components/contract-summarization-animation';
import { ArcAnimation } from '@/components/arc-animation';
import { VyaakhyaAnimation } from '@/components/vyaakhya-animation';
import { Button } from '@/components/ui/button';

const getSortedProjectsByYear = () => {
    const groupedByYear = projects.reduce((acc, project) => {
        const year = project.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(project);
        return acc;
    }, {} as Record<string, Project[]>);

    const sortedYears = Object.keys(groupedByYear).sort((a, b) => parseInt(a) - parseInt(b));
    
    if (groupedByYear['2025']) {
        groupedByYear['2025'].sort((a, b) => {
            if (a.title.includes('Contract Summarization')) return -1;
            if (b.title.includes('AI-Inspired Portfolio')) return 0;
            return 1;
        });
    }

    return sortedYears.map(year => ({
        year,
        projects: groupedByYear[year],
    }));
};

export default function ProjectsSection({ show }: { show: boolean }) {
  const sortedProjectsByYear = useMemo(() => getSortedProjectsByYear(), []);
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [activeProjectIndex2025, setActiveProjectIndex2025] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const currentYearData = sortedProjectsByYear[activeYearIndex];
  const selectedYear = currentYearData.year;
  const projects2025 = sortedProjectsByYear.find(y => y.year === '2025')?.projects || [];

  useEffect(() => {
    if (selectedYear === '2025') {
      setSelectedProject(projects2025[activeProjectIndex2025]);
    } else {
      setSelectedProject(currentYearData.projects[0]);
    }
  }, [activeYearIndex, activeProjectIndex2025, currentYearData.projects, selectedYear, projects2025]);

  const handleNextYear = useCallback(() => {
    setActiveYearIndex((prev) => (prev + 1) % sortedProjectsByYear.length);
    setActiveProjectIndex2025(0);
  }, [sortedProjectsByYear.length]);

  const handle2025ProjectComplete = useCallback(() => {
    if (activeProjectIndex2025 < projects2025.length - 1) {
      setActiveProjectIndex2025(prev => prev + 1);
    } else {
      setActiveYearIndex(0);
      setActiveProjectIndex2025(0);
    }
  }, [activeProjectIndex2025, projects2025.length]);

  const handleYearClick = (index: number) => {
    setActiveYearIndex(index);
    setActiveProjectIndex2025(0);
  };

  const handle2025ProjectClick = (index: number) => {
    setActiveProjectIndex2025(index);
  };

  const renderProjectAnimation = () => {
    if (!selectedProject) return null;

    const onComplete = selectedYear === '2025' ? handle2025ProjectComplete : handleNextYear;

    switch (selectedProject.id) {
        case 1: return <ParkEazyAnimation project={selectedProject} onComplete={onComplete} />;
        case 2: return <CancerDetectionAnimation project={selectedProject} onComplete={onComplete} />;
        case 3: return <AiPortfolioAnimation project={selectedProject} onComplete={onComplete} />;
        case 4: return <SemanticLayerAnimation project={selectedProject} onComplete={onComplete} />;
        case 5: return <ContractSummarizationAnimation project={selectedProject} onComplete={onComplete} />;
        case 6: return <FoodEazyAnimation project={selectedProject} onComplete={onComplete} />;
        case 7: return <ArcAnimation project={selectedProject} onComplete={onComplete} />;
        case 8: return <VyaakhyaAnimation project={selectedProject} onComplete={onComplete} />;
        default: return (
            <div className="flex items-center justify-center h-full">
                 <div className="w-full max-w-lg text-center">
                    <h3 className="font-headline text-4xl font-bold text-primary mb-4">{selectedProject.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6">{selectedProject.longDescription}</p>
                     <Button onClick={onComplete} className="mt-8">Next</Button>
                </div>
            </div>
          );
    }
  }

  return (
    <section id="projects" className="py-16 sm:py-24 bg-background overflow-hidden min-h-screen">
      <AnimatePresence>
        {show && (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
            <div className="container mx-auto px-4">
              <div className="flex justify-center items-center gap-4 mb-16">
                <motion.h2 
                    className="font-headline text-8xl md:text-9xl font-extrabold text-primary tracking-tighter"
                    variants={{ hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  PROJECTS!
                </motion.h2>
                <motion.div 
                    className="flex flex-col font-headline text-4xl md:text-5xl font-bold leading-none text-center"
                    variants={{ hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <span className="text-accent">HELL</span>
                  <span className="text-foreground">YES.</span>
                </motion.div>
              </div>

              <motion.div 
                className="relative flex items-center justify-center h-32 mb-4"
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              >
                  <AnimatePresence>
                      <motion.div className="flex items-center justify-center" style={{ perspective: '1000px' }}>
                      {sortedProjectsByYear.map((item, index) => {
                          const distance = index - activeYearIndex;
                          const totalItems = sortedProjectsByYear.length;
                          
                          let adjustedDistance = distance;
                          if (distance > totalItems / 2) {
                              adjustedDistance = distance - totalItems;
                          } else if (distance < -totalItems / 2) {
                              adjustedDistance = distance + totalItems;
                          }

                          const scale = 1 - Math.abs(adjustedDistance) * 0.2;
                          const opacity = Math.max(0, 1 - Math.abs(adjustedDistance) * 0.4);
                          const x = adjustedDistance * 180;
                          const rotateY = adjustedDistance * -20;
                          const z = -Math.abs(adjustedDistance) * 80;

                          return (
                          <motion.div
                              key={item.year}
                              className="absolute cursor-pointer flex flex-col items-center group"
                              onClick={() => handleYearClick(index)}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ x, y: 0, scale, opacity, rotateY, z }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                              style={{ zIndex: totalItems - Math.abs(adjustedDistance) }}
                          >
                              <div
                              className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                                  selectedYear === item.year
                                  ? 'bg-accent border-accent scale-110 shadow-lg shadow-accent/30'
                                  : 'bg-background border-border group-hover:border-accent group-hover:scale-105'
                              }`}
                              >
                              <span className={`font-headline font-bold text-5xl transition-colors duration-500 ${selectedYear === item.year ? 'text-accent-foreground' : 'text-foreground'}`}>
                                  {item.year}
                              </span>
                              </div>
                          </motion.div>
                          );
                      })}
                      </motion.div>
                  </AnimatePresence>
              </motion.div>

              <AnimatePresence>
              {selectedYear === '2025' && (
                  <motion.div 
                      className="relative flex items-center justify-center h-24 mb-8"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: '6rem' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                      <div className="flex items-center justify-center" style={{ perspective: '600px' }}>
                          {projects2025.map((project, index) => {
                              const distance = index - activeProjectIndex2025;
                              const totalItems = projects2025.length;
                              
                              let adjustedDistance = distance;
                                if (distance > totalItems / 2) {
                                  adjustedDistance = distance - totalItems;
                              } else if (distance < -totalItems / 2) {
                                  adjustedDistance = distance + totalItems;
                              }
      
                              const scale = 1 - Math.abs(adjustedDistance) * 0.3;
                              const opacity = Math.max(0, 1 - Math.abs(adjustedDistance) * 0.6);
                              const x = adjustedDistance * 80;
                              const rotateY = adjustedDistance * -30;
                              const z = -Math.abs(adjustedDistance) * 40;

                              const isSelected = activeProjectIndex2025 === index;
                              const labels = ['A', 'B', 'C'];

                              return (
                                  <motion.div
                                      key={project.id}
                                      className="absolute flex flex-col items-center cursor-pointer"
                                      onClick={() => handle2025ProjectClick(index)}
                                      animate={{ x, y: 0, scale, opacity, rotateY, z }}
                                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                      style={{ zIndex: totalItems - Math.abs(adjustedDistance) }}
                                  >
                                      <div
                                          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-center p-2 transition-all duration-300 ${
                                              isSelected
                                              ? 'bg-primary/20 border-primary scale-110 shadow-md'
                                              : 'bg-background border-border group-hover:border-primary/50'
                                          }`}
                                      >
                                          <span className={`font-headline font-bold text-3xl transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                            {labels[index]}
                                          </span>
                                      </div>
                                  </motion.div>
                              );
                          })}
                      </div>
                  </motion.div>
              )}
              </AnimatePresence>

              <motion.div 
                className="min-h-[600px] relative"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProject?.id || activeYearIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="w-full h-full"
                  >
                    {renderProjectAnimation()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

            </div>
          </motion.div>
        )}
        </AnimatePresence>
    </section>
  );
}
