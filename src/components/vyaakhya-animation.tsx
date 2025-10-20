
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/data';
import { Hand, User, FileText, ArrowRight, Bot, Mic } from 'lucide-react';
import { ProjectDetails } from './project-details';
import { Button } from './ui/button';

const steps = [
    { label: "The Communication Barrier", duration: 4000 },
    { label: "Vyaakhya: The AI Bridge", duration: 3000 },
    { label: "Translating Sign Language to English", duration: 5000 },
    { label: "Translating English to Sign Language", duration: 5000 },
    { label: "Enabling Seamless Conversation", duration: 4000 },
    { label: "Research Published!", duration: 5000 },
];

const PersonIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <User className={className} {...props} />
);

const AnimatedHand = (props: React.SVGProps<SVGSVGElement>) => (
    <motion.div
        animate={{ y: [0, -4, 0, 4, 0], x: [0, 2, 0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
        <Hand {...props} />
    </motion.div>
);

export function VyaakhyaAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
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

                <div className="w-full h-full flex items-center justify-center relative">
                    <AnimatePresence>
                        {/* --- The two people --- */}
                        <motion.div 
                            key="left-person"
                            className="absolute left-[15%]"
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.7, ease: 'easeInOut'}}
                        >
                             <div className="flex flex-col items-center gap-2">
                                <PersonIcon className="w-20 h-20 text-muted-foreground" />
                                <p className="font-bold text-sm">Signer</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            key="right-person"
                            className="absolute right-[15%]"
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.7, ease: 'easeInOut'}}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <PersonIcon className="w-20 h-20 text-muted-foreground" />
                                <p className="font-bold text-sm">Non-Signer</p>
                            </div>
                        </motion.div>

                        {/* --- Central Animation --- */}
                        <div className="absolute w-[40%] h-full flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {currentStep === 0 && (
                                    <motion.div key="barrier" className="w-px h-24 bg-border" initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}} transition={{ ease: 'easeInOut' }} />
                                )}
                                {currentStep === 1 && (
                                    <motion.div key="logo" className="flex flex-col items-center text-accent" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}} transition={{ ease: 'easeInOut' }}>
                                        <Bot className="w-16 h-16"/>
                                        <p className="font-headline font-bold">Vyaakhya</p>
                                    </motion.div>
                                )}
                                {currentStep === 2 && (
                                    <motion.div key="sign-to-text" className="flex items-center" initial={{opacity:0}} animate={{opacity:1, transition:{staggerChildren: 0.3, ease: 'easeInOut'}}} exit={{opacity:0}}>
                                        <AnimatedHand className="w-10 h-10 text-accent" />
                                        <motion.div initial={{opacity:0, pathLength:0}} animate={{opacity:1, pathLength:1}} transition={{duration: 0.8, ease: 'easeInOut'}}><ArrowRight className="w-12 h-12 text-muted-foreground mx-4" /></motion.div>
                                        <p className="font-mono bg-background/50 p-2 rounded-md text-sm">"Hello"</p>
                                    </motion.div>
                                )}
                                {currentStep === 3 && (
                                    <motion.div key="text-to-sign" className="flex items-center" initial={{opacity:0}} animate={{opacity:1, transition:{staggerChildren: 0.3, ease: 'easeInOut'}}} exit={{opacity:0}}>
                                        <Mic className="w-10 h-10 text-accent" />
                                        <motion.div initial={{opacity:0, pathLength:0}} animate={{opacity:1, pathLength:1}} transition={{duration: 0.8, ease: 'easeInOut'}}><ArrowRight className="w-12 h-12 text-muted-foreground mx-4" /></motion.div>
                                        <div className="w-16 h-16 bg-gray-800 rounded-lg border-2 border-border p-2 shadow-inner flex items-center justify-center">
                                            <Hand className="w-10 h-10 text-accent" />
                                        </div>
                                    </motion.div>
                                )}
                                {currentStep === 4 && (
                                    <motion.div key="connected" className="w-1/2 h-px bg-green-500" initial={{scaleX:0}} animate={{scaleX:1, transition:{duration:0.8, ease:'circOut'}}} exit={{scaleX:0}} />
                                )}
                                 {currentStep === 5 && (
                                    <motion.div key="paper" className="flex flex-col items-center text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{ ease: 'easeInOut' }}>
                                        <FileText className="w-16 h-16 text-accent" />
                                        <h3 className="font-bold mt-2">Published in Springer</h3>
                                        {project.links.find(l => l.label.includes('Paper')) &&
                                            <a href={project.links.find(l => l.label.includes('Paper'))!.url} target="_blank" rel="noopener noreferrer">
                                                <Button variant="link" size="sm" className="mt-1">Read Paper</Button>
                                            </a>
                                        }
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
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
