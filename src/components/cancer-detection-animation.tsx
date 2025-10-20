
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/data';
import { FileText, Dna, BrainCircuit, Microscope } from 'lucide-react';
import { ProjectDetails } from './project-details';

const steps = [
    { label: "Analyzing skin lesion...", duration: 4000 },
    { label: "Magnifying suspicious mole...", duration: 5000 },
    { label: "Applying image processing algorithms...", duration: 6000 },
    { label: "ML models classifying cell types...", duration: 6000 },
    { label: "Differentiated: Malignant.", duration: 5000 },
    { label: "Research Published!", duration: 5000 },
];

const SkinLesionIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Base skin tone */}
        <path d="M0 0H200V200H0V0Z" fill="#FCE5D8"/>
        {/* Skin texture/pores */}
        <circle cx="25" cy="30" r="1" fill="#EAD5C9"/>
        <circle cx="80" cy="50" r="1.5" fill="#EAD5C9"/>
        <circle cx="150" cy="20" r="1" fill="#EAD5C9"/>
        <circle cx="40" cy="140" r="1.5" fill="#EAD5C9"/>
        <circle cx="170" cy="160" r="1" fill="#EAD5C9"/>
        <circle cx="120" cy="110" r="2" fill="#EAD5C9"/>
        {/* The lesion/mole */}
        <motion.path
            d="M100 100 C 80 90, 85 120, 100 120 C 115 120, 120 90, 100 100 Z"
            fill="#8D5524"
            stroke="#663300"
            strokeWidth="2"
            animate={{
                d: [
                    "M100 100 C 80 90, 85 120, 100 120 C 115 120, 120 90, 100 100 Z",
                    "M100 100 C 85 95, 80 125, 100 115 C 120 125, 115 95, 100 100 Z",
                    "M100 100 C 80 90, 85 120, 100 120 C 115 120, 120 90, 100 100 Z",
                ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
    </svg>
);


export function CancerDetectionAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
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

    const cells = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        isMalignant: Math.random() > 0.7,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 5
    }));


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
                            <p className="font-headline text-xl md:text-2xl font-bold text-foreground inline-block [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                                {steps[currentStep].label}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                 {/* --- SCENE --- */}
                <div className="w-full h-full">
                     <AnimatePresence mode="wait">
                        {/* Step 0: Skin Lesion */}
                        {currentStep === 0 && (
                            <motion.div key="step0" className="w-full h-full flex items-center justify-center"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1, transition: {duration: 1, ease: 'easeInOut'}}}
                                exit={{opacity: 0, scale: 2.5, transition: {duration: 1.5, ease: 'easeIn'}}}
                            >
                                <div className="relative w-48 h-48">
                                    <SkinLesionIcon className="w-full h-full rounded-full" />
                                    <motion.div 
                                        className="absolute w-16 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{repeat: Infinity, duration: 2.5, ease: "easeInOut"}}
                                    >
                                        <div className="absolute inset-0 rounded-full border-2 border-red-500 opacity-75" />
                                        <div className="absolute inset-2 rounded-full border border-dashed border-red-500 opacity-75" />
                                    </motion.div>
                                    <motion.div 
                                        className="absolute top-1/2 left-1/2 w-32 h-1 bg-red-400 opacity-50"
                                        style={{y: '-50%', x: '-50%'}}
                                        animate={{
                                            rotate: [0, 360]
                                        }}
                                        transition={{repeat: Infinity, duration: 4, ease: "linear"}}
                                    />
                                </div>
                            </motion.div>
                        )}
                        {/* Step 1: Zoom in on tissue */}
                        {currentStep === 1 && (
                             <motion.div key="step1" className="w-full h-full relative"
                                initial={{opacity: 0, scale: 2.5}}
                                animate={{opacity: 1, scale: 1, transition: {duration: 1.5, ease: "easeOut"} }}
                                exit={{opacity: 0, scale: 0.5, transition: {duration: 1, ease: 'easeInOut'} }}
                             >
                                {cells.map(cell => (
                                    <motion.div
                                        key={cell.id}
                                        className={`absolute rounded-full ${cell.isMalignant ? 'bg-red-400/50' : 'bg-blue-400/50'}`}
                                        style={{
                                            left: `${cell.x}%`, top: `${cell.y}%`, width: cell.size, height: cell.size,
                                            borderRadius: cell.isMalignant ? '40% 60% 70% 30% / 40% 50% 60% 50%' : '50%',
                                        }}
                                        initial={{ opacity: 0}}
                                        animate={{ opacity: 1, transition: {delay: Math.random() * 1, ease: 'easeInOut'} }}
                                    />
                                ))}
                             </motion.div>
                        )}
                        {/* Step 2: Image Processing */}
                        {currentStep === 2 && (
                             <motion.div key="step2" className="w-full h-full relative flex items-center justify-center"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{ ease: 'easeInOut' }}
                             >
                                <Microscope className="w-32 h-32 text-accent/80" />
                                <motion.div className="absolute w-1/2 h-1/2 border-2 border-dashed border-accent/80" 
                                    animate={{rotate: [0, 90, 180, 270, 360]}}
                                    transition={{repeat: Infinity, duration: 4, ease: "linear"}}
                                />
                                <motion.div className="absolute w-full h-full"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1, transition: {delay: 0.5, ease: 'easeInOut'}}}
                                >
                                    {cells.slice(0,5).map(cell => (
                                        <motion.div
                                            key={cell.id}
                                            className={`absolute rounded-full ${cell.isMalignant ? 'bg-red-400/50' : 'bg-blue-400/50'}`}
                                            style={{
                                                left: `${cell.x}%`, top: `${cell.y}%`, width: cell.size, height: cell.size,
                                            }}
                                            animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0]}}
                                            transition={{repeat: Infinity, duration: 3, delay: cell.id * 0.2, ease: 'easeInOut'}}
                                        />
                                    ))}
                                </motion.div>
                             </motion.div>
                        )}
                        {/* Step 3: ML Classification */}
                        {currentStep === 3 && (
                            <motion.div key="step3" className="w-full h-full flex items-center justify-center gap-8"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{ ease: 'easeInOut' }}
                            >
                                <div className="flex flex-col items-center gap-4">
                                     {cells.slice(0,3).map(cell => (
                                         <motion.div
                                            key={cell.id}
                                            className={`rounded-full ${cell.isMalignant ? 'bg-red-400/80' : 'bg-blue-400/80'}`}
                                            style={{width: cell.size * 2, height: cell.size * 2}}
                                            initial={{x:0, opacity: 0}}
                                            animate={{x: [0, 80, 0], opacity: [0, 1, 0]}}
                                            transition={{repeat: Infinity, duration: 3, delay: cell.id * 1, ease: 'easeInOut'}}
                                        />
                                     ))}
                                </div>
                                <BrainCircuit className="w-32 h-32 text-accent" />
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-24 h-16 rounded-lg bg-blue-500/80 flex items-center justify-center font-bold text-white text-center">Benign</div>
                                    <div className="w-24 h-16 rounded-lg bg-red-500/80 flex items-center justify-center font-bold text-white text-center">Malignant</div>
                                </div>
                            </motion.div>
                        )}
                        {/* Step 4: Differentiation */}
                        {currentStep === 4 && (
                            <motion.div key="step4" className="w-full h-full flex flex-col items-center justify-center gap-4"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.8}}
                                transition={{ ease: 'easeInOut' }}
                            >
                               <div className="relative p-4 md:p-6 border-4 border-red-500 rounded-xl text-center">
                                    <h2 className="text-xl md:text-2xl font-bold text-red-400 font-headline">MALIGNANT</h2>
                                    <div className="absolute top-2 right-2 text-xs text-red-400">98.7%</div>
                               </div>
                               <Dna className="w-16 h-16 text-red-400 mt-4" />
                            </motion.div>
                        )}
                        {/* Step 5: Research Paper */}
                        {currentStep === 5 && (
                             <motion.div 
                                key="step5" 
                                className="w-full h-full flex flex-col items-center justify-center text-gray-300"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1, ease: 'easeInOut'}}
                             >
                                <FileText className="w-24 h-24 mb-4 text-accent" />
                                <h2 className="text-2xl font-bold font-headline text-foreground">Published in Springer!</h2>
                                <div className="w-3/4 h-px bg-gray-600 my-4"></div>
                                <p className="text-sm text-muted-foreground w-3/4 text-center">"Image Processing Techniques for Detection of Cancer Cells"</p>
                             </motion.div>
                        )}
                     </AnimatePresence>
                </div>
                
                {/* --- PROGRESS BAR --- */}
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
