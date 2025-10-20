
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/data';
import { FileText, Clock, Bot, Cpu, FileJson, FileType, CheckCircle, ArrowRight, Zap, Trophy, Database, Share2 } from 'lucide-react';
import { ProjectDetails } from './project-details';

const steps = [
    { label: "The Challenge: Manual Contract Review", duration: 5000 },
    { label: "A Fortune 10 distributor had a problem...", duration: 5000 },
    { label: "The AI Solution: Automated Summarization", duration: 5000 },
    { label: "Step 1: Ingest Contracts from Data Factory", duration: 5000 },
    { label: "Step 2: AI Models Extract Key Information", duration: 6000 },
    { label: "Step 3: Generate Summaries with JINJA Templates", duration: 5000 },
    { label: "Step 4: Deliver Reports to SharePoint", duration: 5000 },
    { label: "The Result: Drastic Time Reduction", duration: 6000 },
];

const ContractIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <motion.div {...props} className="relative w-24 h-32 bg-white rounded-md shadow-lg border border-gray-200">
        <div className="absolute top-3 left-3 w-10 h-1 bg-gray-300 rounded-sm" />
        <div className="absolute top-6 left-3 w-16 h-1 bg-gray-300 rounded-sm" />
        <div className="absolute top-9 left-3 w-12 h-1 bg-gray-300 rounded-sm" />
        <div className="absolute top-12 left-3 w-16 h-1 bg-gray-300 rounded-sm" />
        <div className="absolute top-15 left-3 w-14 h-1 bg-gray-300 rounded-sm" />
    </motion.div>
);


export function ContractSummarizationAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
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
                            <motion.div key="step0" className="w-full h-full flex flex-col items-center justify-center gap-4"
                                initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                            >
                                <div className="relative">
                                    <ContractIcon />
                                    <ContractIcon style={{rotate: '5deg', marginLeft: '2rem', zIndex: 1}} />
                                    <ContractIcon style={{rotate: '-5deg', marginLeft: '-1rem', zIndex: 2}}/>
                                </div>
                                <p className="font-bold text-lg mt-4 text-center">100+ Page Contracts</p>
                            </motion.div>
                        )}
                        {/* Step 1: The Problem */}
                        {currentStep === 1 && (
                            <motion.div key="step1" className="w-full h-full flex flex-col items-center justify-center gap-4"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                            >
                                <div className="flex items-center gap-6">
                                    <Clock className="w-20 h-20 text-destructive" />
                                    <div className="text-center">
                                        <p className="font-headline text-5xl font-bold">2-3 Days</p>
                                        <p className="text-muted-foreground">Manual Review Time Per Contract</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                         {/* Step 2: The AI Solution */}
                        {currentStep === 2 && (
                            <motion.div key="step2" className="w-full h-full flex items-center justify-center gap-8"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                            >
                                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0, transition:{delay:0.2, ease: 'easeInOut'}}}>
                                    <FileText className="w-24 h-24 text-muted-foreground" />
                                </motion.div>
                                <motion.div initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1, transition:{delay:0.5, ease: 'easeInOut'}}}>
                                     <Zap className="w-16 h-16 text-accent" />
                                </motion.div>
                               <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0, transition:{delay:0.8, ease: 'easeInOut'}}}>
                                    <div className="relative w-24 h-32 bg-white rounded-md shadow-lg border p-2">
                                        <p className="text-xs font-bold text-primary">Summary</p>
                                        <div className="mt-1 w-full h-1 bg-accent/50 rounded-sm" />
                                        <div className="mt-1 w-3/4 h-1 bg-accent/50 rounded-sm" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                         {/* Step 3: Ingest */}
                        {currentStep === 3 && (
                             <motion.div key="step3" className="w-full h-full flex items-center justify-center gap-8"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                             >
                                <Database className="w-20 h-20 text-blue-500" />
                                <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{delay:0.5, staggerChildren: 0.3, ease: 'easeInOut'}}}>
                                    <motion.div initial={{x:0}} animate={{x:80}} transition={{repeat: Infinity, duration: 2.5, delay:0.2, ease: 'easeInOut'}}><FileText className="w-12 h-12 text-muted-foreground" /></motion.div>
                                </motion.div>
                                <Cpu className="w-20 h-20 text-orange-500" />
                             </motion.div>
                        )}
                        {/* Step 4: AI Models */}
                        {currentStep === 4 && (
                            <motion.div key="step4" className="w-full h-full flex items-center justify-center gap-8"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                            >
                               <div className="flex flex-col items-center gap-2">
                                    <FileText className="w-16 h-16 text-muted-foreground"/>
                                    <p className="text-sm font-bold">Contract</p>
                               </div>
                                <ArrowRight className="w-12 h-12 text-muted-foreground"/>
                                <div className="flex flex-col items-center gap-2 text-accent">
                                    <Bot className="w-16 h-16"/>
                                    <p className="text-sm font-bold text-center">Vision & Text Models</p>
                               </div>
                                <ArrowRight className="w-12 h-12 text-muted-foreground"/>
                               <div className="flex flex-col items-center gap-2">
                                    <FileJson className="w-16 h-16 text-green-500"/>
                                    <p className="text-sm font-bold">JSON Output</p>
                               </div>
                            </motion.div>
                        )}
                        {/* Step 5: JINJA Templates */}
                        {currentStep === 5 && (
                             <motion.div key="step5" className="w-full h-full flex items-center justify-center gap-8"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                             >
                                <FileJson className="w-20 h-20 text-green-500" />
                                <div className="text-center text-accent">+</div>
                                <FileType className="w-20 h-20 text-purple-500" />
                                <div className="text-center text-accent">=</div>
                                <div className="relative w-24 h-32 bg-white rounded-md shadow-lg border p-2 flex flex-col items-center">
                                    <p className="text-xs font-bold text-primary">Summary</p>
                                    <CheckCircle className="w-12 h-12 text-green-500 mt-4" />
                                </div>
                             </motion.div>
                        )}
                        {/* Step 6: Deliver */}
                        {currentStep === 6 && (
                            <motion.div key="step6" className="w-full h-full flex items-center justify-center gap-8"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                            >
                                <Cpu className="w-20 h-20 text-orange-500" />
                                <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{delay:0.5, staggerChildren: 0.3, ease: 'easeInOut'}}}>
                                    <motion.div initial={{x:0}} animate={{x:80}} transition={{repeat: Infinity, duration: 2.5, delay:0.2, ease: 'easeInOut'}}><FileText className="w-12 h-12 text-accent" /></motion.div>
                                </motion.div>
                                <Share2 className="w-20 h-20 text-blue-500" />
                            </motion.div>
                        )}
                        {/* Step 7: The Result */}
                        {currentStep === 7 && (
                             <motion.div key="step7" className="w-full h-full flex flex-col items-center justify-center gap-4"
                                initial={{opacity: 0, scale:0.8}} animate={{opacity: 1, scale:1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}
                             >
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="font-headline text-4xl font-bold line-through text-destructive/80">3 Days</p>
                                    </div>
                                    <ArrowRight className="w-12 h-12 text-muted-foreground"/>
                                    <div className="text-center">
                                        <p className="font-headline text-5xl font-bold text-green-500">15 Mins</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-amber-500 mt-6">
                                    <Trophy className="w-10 h-10" />
                                    <p className="font-headline text-2xl font-bold">100% Client Satisfaction</p>
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
