
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/data';
import { ProjectDetails } from './project-details';

const CarIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
);


const PhoneIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z" />
    </svg>
);

const LicensePlateIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M3.8 3.8A1.5 1.5 0 0 0 2 5.2v13.5A1.5 1.5 0 0 0 3.8 20h16.4a1.5 1.5 0 0 0 1.8-1.2V5.2A1.5 1.5 0 0 0 20.2 4H3.8Z" />
        <path d="M9 14h6" />
        <path d="M8 9h2" />
        <path d="M14 9h2" />
    </svg>
);

const NotificationIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const steps = [
    { label: "You're blocked in by another car.", duration: 4000 },
    { label: "Open the ParkEazy app and scan the license plate.", duration: 5000 },
    { label: "A notification is instantly sent to the car's owner.", duration: 5000 },
    { label: "The owner is alerted and moves their vehicle.", duration: 5000 },
    { label: "Problem solved! You're free to go.", duration: 4000 },
    { label: "ParkEazy", duration: 5000 },
];

export function ParkEazyAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
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


    const isLogoStep = currentStep === steps.length - 1;
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
                            {!isLogoStep && (
                                <p className="font-headline text-xl md:text-2xl font-bold text-foreground inline-block [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                                    {steps[currentStep].label}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                 {/* --- LOGO Step --- */}
                 <AnimatePresence>
                    {isLogoStep && (
                         <motion.div
                            key="logo-container"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeInOut' } }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center z-30"
                        >
                            <motion.h2 
                                key="logo-text"
                                initial={{ y: -50, opacity: 0}}
                                animate={{ y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.8, ease: 'easeInOut'}}}
                                className="font-headline text-6xl font-bold text-black tracking-wider"
                            >
                                {steps[currentStep].label}
                            </motion.h2>
                        </motion.div>
                    )}
                 </AnimatePresence>

                {/* --- SCENE --- */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center scale-75 md:scale-100"
                    animate={{
                        opacity: isLogoStep ? 0 : 1,
                    }}
                    transition={{duration: 0.7, ease: 'easeInOut'}}
                >
                    <div className="absolute bottom-1/4 w-full h-1/2 bg-gray-700/50 rounded-full blur-3xl"></div>

                    {/* User's Car */}
                    <motion.div
                        className="absolute z-10"
                        initial={{ x: '-120px', y: '20px' }}
                        animate={{
                            x: currentStep === 4 ? -400 : -120,
                            opacity: currentStep === 4 ? 0 : 1,
                        }}
                        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
                    >
                        <CarIcon className="w-48 h-48 text-blue-400" style={{ transform: "scaleX(-1)" }} />
                    </motion.div>

                    {/* Blocking Car */}
                    <motion.div
                        className="absolute z-10"
                        initial={{ x: '80px', y: '20px' }}
                        animate={{
                            x: currentStep >= 3 ? 400 : 80,
                            opacity: currentStep >= 3 ? 0 : 1,
                        }}
                        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
                    >
                        <CarIcon className="w-48 h-48 text-red-400" />
                        {/* Driver receiving notification */}
                        <AnimatePresence>
                            {currentStep === 3 && (
                                <motion.div
                                    key="driver-notification"
                                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: 0.5, ease: 'easeInOut' }}
                                >
                                    <div className="relative">
                                        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                                            <p className="text-xs text-foreground">Please move your car!</p>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-background/80"></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    
                    {/* --- ANIMATION ELEMENTS --- */}
                    <AnimatePresence>
                        {/* Step 1: Phone comes up */}
                        {currentStep === 1 && (
                            <motion.div
                                key="phone-icon"
                                className="absolute z-20 flex flex-col items-center"
                                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                                animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, ease: 'easeInOut' } }}
                                exit={{ opacity: 0, scale: 0.8, y: 100 }}
                            >
                                <div className="relative">
                                    <PhoneIcon className="w-40 h-40 text-accent" />
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <div className="w-full h-full bg-background/80 rounded-lg flex flex-col items-center justify-center gap-1">
                                            <LicensePlateIcon className="w-16 h-16 text-primary" />
                                            <p className="text-xs font-bold text-primary">KA-01-1234</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* Step 1-2: Scanning Animation */}
                        {currentStep === 1 && (
                             <motion.div
                                key="scan-line"
                                className="absolute z-20 w-32 h-1 bg-accent/90 shadow-lg shadow-accent"
                                initial={{ y: -40, opacity: 0 }}
                                animate={{ y: 20, opacity: [0, 1, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
                             />
                        )}
                        
                        {/* Step 2: Signal sent from phone to car owner */}
                        {currentStep === 2 && (
                            <motion.div
                                key="notification-signal"
                                className="absolute z-30"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ ease: 'easeInOut' }}
                            >
                                <motion.div
                                    initial={{ x: -100, y: 0, opacity: 0 }}
                                    animate={{ x: 100, y: -20, opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 2.5, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
                                    className="absolute"
                                >
                                     <NotificationIcon className="w-16 h-16 text-accent animate-pulse" />
                                </motion.div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </motion.div>
                
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
