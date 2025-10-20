
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/data';
import { Database, Users, GitBranch, FlaskConical, TestTube, Microscope, Layers, Rocket, Route } from 'lucide-react';
import { ProjectDetails } from './project-details';


const steps = [
    { label: "The Challenge: Siloed Drug Discovery Data", duration: 6000 },
    { label: "Domain 1: Small Molecule Data", duration: 5000 },
    { label: "Domain 2: In Vitro / In Vivo Experiments", duration: 5000 },
    { label: "Parallel Pipelines Processing Data...", duration: 6000 },
    { label: "Result: A Semantic Layer with 200+ Tables", duration: 5000 },
    { label: "Empowering Scientists for Breakthroughs", duration: 6000 },
];

export function SemanticLayerAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep >= steps.length) {
            const timer = setTimeout(() => {
                 setTimeout(onComplete, 0);
            }, 1000);
            return () => clearTimeout(timer);
        }

        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1));
        }, steps[currentStep]?.duration || 3000);

        return () => {
            clearInterval(interval);
        }
    }, [currentStep, onComplete]);


    const isFinalStep = currentStep === steps.length;

    return (
        <div className="flex flex-col xl:flex-row gap-8 items-center justify-center h-full">
            <div className="w-full xl:w-2/3 flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-2xl aspect-video relative overflow-hidden shadow-2xl border-2 border-accent/10">
                <AnimatePresence mode="wait">
                    {steps[currentStep] && (
                        <motion.div
                            key={`step-label-${currentStep}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            className="absolute top-6 left-6 right-6 text-center z-20"
                        >
                            <p className="font-headline text-lg md:text-xl font-bold text-foreground inline-block [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                                {steps[currentStep].label}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="w-full h-full pt-16">
                    <AnimatePresence mode="wait">
                        {/* Step 0: The Challenge */}
                        {currentStep === 0 && (
                            <motion.div key="step0" className="w-full h-full flex items-center justify-center gap-4 md:gap-8"
                                initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.9}} transition={{ ease: 'easeInOut' }}
                            >
                                <motion.div className="flex flex-col items-center gap-2" initial={{y:20, opacity:0}} animate={{y:0, opacity:1, transition: {delay: 0.2, ease: 'easeInOut'}}}>
                                    <FlaskConical className="w-12 h-12 text-blue-400" />
                                    <p className="font-bold text-sm text-center">Small Molecule Data</p>
                                </motion.div>
                                <motion.div className="text-5xl font-thin text-muted-foreground" initial={{scale:0}} animate={{scale:1, transition: {delay: 0.8, ease: 'easeInOut'}}}>+</motion.div>
                                <motion.div className="flex flex-col items-center gap-2" initial={{y:20, opacity:0}} animate={{y:0, opacity:1, transition: {delay: 0.4, ease: 'easeInOut'}}}>
                                    <TestTube className="w-12 h-12 text-green-400" />
                                    <p className="font-bold text-sm text-center">In Vitro Experiments</p>
                                </motion.div>
                                 <motion.div className="text-5xl font-thin text-muted-foreground" initial={{scale:0}} animate={{scale:1, transition: {delay: 1.0, ease: 'easeInOut'}}}>+</motion.div>
                                <motion.div className="flex flex-col items-center gap-2" initial={{y:20, opacity:0}} animate={{y:0, opacity:1, transition: {delay: 0.6, ease: 'easeInOut'}}}>
                                    <Microscope className="w-12 h-12 text-yellow-400" />
                                    <p className="font-bold text-sm text-center">In Vivo Studies</p>
                                </motion.div>
                            </motion.div>
                        )}
                        {/* Step 1: Small Molecule Data */}
                        {currentStep === 1 && (
                            <motion.div key="step1" className="w-full h-full flex flex-col items-center justify-center"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                            >
                                <div className="flex items-center gap-4">
                                    <Database className="w-10 h-10 text-muted-foreground" />
                                    <Database className="w-10 h-10 text-muted-foreground" />
                                    <Database className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <motion.div className="w-px h-8 bg-border my-2" initial={{scaleY:0}} animate={{scaleY:1, transition:{delay:0.5, ease: 'easeInOut'}}}/>
                                <div className="flex flex-col items-center">
                                    <FlaskConical className="w-16 h-16 text-blue-400" />
                                    <p className="font-bold mt-2">Small Molecule Domain</p>
                                </div>
                                <p className="text-muted-foreground mt-4 text-center">Multiple sources combined to form a unified view.</p>
                            </motion.div>
                        )}
                        {/* Step 2: Experiment Data */}
                        {currentStep === 2 && (
                             <motion.div key="step2" className="w-full h-full flex items-center justify-center"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                             >
                               <div className="flex flex-col items-center gap-2">
                                  <div className="flex items-center gap-2">
                                     <Database className="w-6 h-6 text-muted-foreground" />
                                     <Database className="w-6 h-6 text-muted-foreground" />
                                  </div>
                                  <motion.div className="w-px h-4 bg-border" initial={{scaleY:0}} animate={{scaleY:1, transition:{delay:0.5, ease: 'easeInOut'}}}/>
                                  <div className="flex flex-col items-center text-green-400">
                                      <TestTube className="w-10 h-10" />
                                      <p className="font-bold text-sm mt-1">In Vitro</p>
                                  </div>
                               </div>
                               <div className="flex flex-col items-center gap-2 mx-6">
                                  <div className="flex items-center gap-2">
                                     <Database className="w-6 h-6 text-muted-foreground" />
                                     <Database className="w-6 h-6 text-muted-foreground" />
                                  </div>
                                   <motion.div className="w-px h-4 bg-border" initial={{scaleY:0}} animate={{scaleY:1, transition:{delay:0.5, ease: 'easeInOut'}}}/>
                                  <div className="flex flex-col items-center text-yellow-400">
                                      <Microscope className="w-10 h-10" />
                                      <p className="font-bold text-sm mt-1">In Vivo</p>
                                  </div>
                               </div>
                                
                                <div className="flex flex-col items-center gap-2 text-center ml-8">
                                    <h3 className="font-bold text-lg">Experiment Domain</h3>
                                    <p className="text-muted-foreground text-sm max-w-xs">Multiple complex biological data sources merged.</p>
                                </div>
                            </motion.div>
                        )}
                        {/* Step 3: ETL Scripts & Orchestration */}
                        {currentStep === 3 && (
                             <motion.div key="step3" className="w-full h-full flex flex-col items-center justify-center"
                                initial={{opacity: 0}} animate={{opacity: 1, transition:{staggerChildren: 0.5, ease: 'easeInOut'}}} exit={{opacity: 0, scale: 0.8}}
                            >
                                <div className="flex justify-around w-full">
                                    {/* Pipeline 1: Small Molecule */}
                                    <motion.div className="flex flex-col items-center gap-2" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{ ease: 'easeInOut' }}>
                                        <FlaskConical className="w-10 h-10 text-blue-400" />
                                        <p className="font-bold text-sm">Small Molecule</p>
                                        <motion.div initial={{y:0}} animate={{y:[0, 20, 0]}} transition={{repeat: Infinity, duration: 2, ease: "linear"}}>
                                            <Route className="w-8 h-8 text-accent/50" />
                                        </motion.div>
                                    </motion.div>
                                    {/* Pipeline 2: Experiments */}
                                    <motion.div className="flex flex-col items-center gap-2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{ ease: 'easeInOut' }}>
                                        <div className="flex">
                                            <TestTube className="w-10 h-10 text-green-400" />
                                            <Microscope className="w-10 h-10 text-yellow-400" />
                                        </div>
                                        <p className="font-bold text-sm">Experiments</p>
                                        <motion.div initial={{y:0}} animate={{y:[0, 20, 0]}} transition={{repeat: Infinity, duration: 2, ease: "linear", delay: 0.5}}>
                                            <Route className="w-8 h-8 text-accent/50" />
                                        </motion.div>
                                    </motion.div>
                                </div>
                                <div className="w-3/4 bg-background/80 rounded-lg shadow-2xl border border-border/50 p-2 flex items-center justify-center gap-4 mt-4">
                                     <Rocket className="w-8 h-8 text-accent" />
                                     <p className="text-sm font-bold text-foreground">ETL Orchestrator running parallel jobs without deadlocks</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Semantic Layer */}
                        {currentStep === 4 && (
                            <motion.div key="step4" className="w-full h-full flex flex-col items-center justify-center"
                                initial={{opacity: 0}} animate={{opacity: 1, transition: {staggerChildren: 0.3, ease: 'easeInOut'}}} exit={{opacity: 0}}
                            >
                               <div className="relative w-48 h-48 flex items-center justify-center">
                                    <motion.div className="absolute" initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1, transition: {delay: 0.2, ease: 'easeInOut'}}}>
                                        <Layers className="w-48 h-48 text-accent/20"/>
                                    </motion.div>
                                    <motion.div className="absolute" initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1, transition: {delay: 0.6, ease: 'easeInOut'}}}>
                                        <Layers className="w-32 h-32 text-accent/40"/>
                                    </motion.div>
                                    <motion.div className="absolute" initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1, transition: {delay: 1.0, ease: 'easeInOut'}}}>
                                        <Database className="w-20 h-20 text-accent"/>
                                    </motion.div>
                               </div>
                               <p className="text-muted-foreground mt-4 text-center">A unified layer with 200+ tables.</p>
                            </motion.div>
                        )}
                        {/* Step 5: Empowering Scientists */}
                        {currentStep === 5 && (
                             <motion.div key="step5" className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-8"
                                initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{ ease: 'easeInOut' }}
                             >
                                <div className="flex items-center gap-4 text-green-500">
                                    <Users className="w-12 h-12" />
                                    <h2 className="font-headline text-2xl md:text-3xl font-bold">Empowering Scientists</h2>
                                </div>
                                <p className="text-muted-foreground">Unified data enabling faster drug discovery and analysis.</p>
                                 <div className="flex items-center gap-4 mt-4 text-foreground">
                                    <GitBranch className="w-8 h-8"/>
                                    <p>Managed with Jira & GitLab</p>
                                 </div>
                             </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!isFinalStep && (
                     <div className="absolute bottom-6 left-6 right-6 flex space-x-2">
                        {steps.map((_, index) => (
                            <div key={index} className="w-full h-2 rounded-full bg-border/20 overflow-hidden">
                                {index === currentStep && (
                                    <motion.div
                                        className="h-full bg-accent"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: steps[index]?.duration / 1000, ease: 'linear' }}
                                    />
                                )}
                                {index < currentStep && <div className="h-full w-full bg-accent" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="w-full xl:w-1/3 min-h-[300px]">
                <ProjectDetails project={project} />
            </div>
        </div>
    );
}
