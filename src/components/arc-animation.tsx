
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/data';
import { CheckCircle, XCircle, Star, Database, Bot, BrainCircuit, Fingerprint } from 'lucide-react';
import { ProjectDetails } from './project-details';

const steps = [
    { label: "Searching for product on Amazon...", duration: 4000 },
    { label: "Analyzing customer reviews...", duration: 4000 },
    { label: "ARC extension enabled. Calculating trust scores...", duration: 5000 },
    { label: "Identifying review patterns with Machine Learning...", duration: 6000 },
    { label: "Trust scores generated!", duration: 5000 },
];

const reviews = [
    {
        id: 1,
        author: "Jane D.",
        isVerified: true,
        hasMedia: true,
        text: "Absolutely fantastic! This product exceeded all my expectations. The quality is top-notch and it was delivered right on time. Included a video of the unboxing. Highly recommend!",
        score: 92,
        isBot: false,
    },
    {
        id: 2,
        author: "user12345",
        isVerified: false,
        hasMedia: false,
        text: "very good product buy now. best quality. five stars.",
        score: 23,
        isBot: true,
    },
    {
        id: 3,
        author: "Mike R.",
        isVerified: true,
        hasMedia: false,
        text: "It's a decent product for the price. Does what it says, but the build quality could be a bit better. Overall, I'm satisfied with my purchase.",
        score: 76,
        isBot: false,
    }
];

const TrustScore = ({ score }: { score: number }) => {
    const isTrusted = score >= 60;
    return (
        <motion.div
            className={`flex items-center gap-2 p-2 rounded-lg ${isTrusted ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            {isTrusted ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
            <div className="text-sm">
                <span className={`font-bold ${isTrusted ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    Trust Score: {score}%
                </span>
            </div>
        </motion.div>
    );
};

const ReviewCard = ({ review, showScore }: { review: typeof reviews[0], showScore: boolean }) => (
    <div className="bg-background/80 p-3 rounded-lg border border-border/50 relative">
        <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm">{review.author}</span>
            {review.isVerified && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Verified Purchase</span>}
        </div>
        <div className="flex text-yellow-500 mb-2">
            <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
        </div>
        <p className="text-xs text-muted-foreground">{review.text}</p>
        <AnimatePresence>
            {showScore && (
                <div className="absolute top-2 right-2">
                    <TrustScore score={review.score} />
                </div>
            )}
        </AnimatePresence>
    </div>
);


export function ArcAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
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
            <div className="w-full xl:w-2_3 flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-2xl aspect-video relative overflow-hidden shadow-2xl border-2 border-accent/10">
                <AnimatePresence mode="wait">
                    {steps[currentStep] && (
                        <motion.div
                            key={`step-label-${currentStep}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            className="absolute top-4 left-6 right-6 text-center z-20"
                        >
                            <p className="font-headline text-lg md:text-xl font-bold text-foreground inline-block [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                                {steps[currentStep].label}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Browser Window */}
                <div className="w-[95%] h-[90%] bg-background shadow-inner border-4 border-gray-800 rounded-2xl mt-8 flex flex-col overflow-hidden">
                    {/* Top bar with URL & Extension */}
                    <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center px-3 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow ml-4 bg-white dark:bg-gray-800 rounded-md px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300">
                           <AnimatePresence mode="wait">
                            {currentStep >= 0 && <motion.span key="url" initial={{opacity:0}} animate={{opacity:1}} transition={{ ease: 'easeInOut' }}>https://amazon.com/product/...</motion.span>}
                           </AnimatePresence>
                        </div>
                        <motion.div
                            className={`flex items-center gap-1 p-1 rounded-md ${currentStep >= 2 ? 'bg-accent/80' : 'bg-gray-400/50'}`}
                            animate={{ scale: currentStep === 2 ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <Fingerprint className={`w-4 h-4 ${currentStep >= 2 ? 'text-white' : 'text-gray-600'}`} />
                            <span className={`text-xs font-bold ${currentStep >= 2 ? 'text-white' : 'text-gray-600'}`}>ARC</span>
                        </motion.div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow p-4 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {/* Base reviews view */}
                            {(currentStep >= 1 && currentStep <= steps.length) && (
                                <motion.div 
                                    key="reviews" 
                                    initial={{opacity:0}} 
                                    animate={{opacity:1}} 
                                    exit={{opacity:0}} 
                                    transition={{ ease: 'easeInOut' }}
                                    className="space-y-2"
                                >
                                    <h3 className="font-bold text-lg">Product Reviews</h3>
                                    {reviews.map(r => <ReviewCard key={r.id} review={r} showScore={currentStep >= 4} />)}
                                </motion.div>
                            )}

                            {/* Step 3: ML Model overlay */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="ml-overlay"
                                    className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 z-10"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{ ease: 'easeInOut' }}
                                >
                                    <div className="flex items-center gap-4">
                                        <Database className="w-12 h-12 text-blue-300" />
                                        <motion.div className="w-16 h-1 bg-blue-300" initial={{scaleX:0}} animate={{scaleX:1, transition: {duration: 1, delay: 0.5, ease: 'easeInOut'}}}/>
                                        <BrainCircuit className="w-16 h-16 text-accent" />
                                        <motion.div className="w-16 h-1 bg-accent" initial={{scaleX:0}} animate={{scaleX:1, transition: {duration: 1, delay: 1.5, ease: 'easeInOut'}}}/>
                                        <Bot className="w-12 h-12 text-purple-300" />
                                    </div>
                                     <p className="text-white font-bold">Training on UCSD Database | Identifying Patterns</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {!isFinalStep && (
                     <div className="absolute bottom-1 left-6 right-6 flex space-x-2">
                        {steps.map((_, index) => (
                            <div key={index} className="w-full h-1.5 rounded-full bg-border/20 overflow-hidden">
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
            <div className="w-full xl:w-1_3 min-h-[300px]">
                <ProjectDetails project={project} />
            </div>
        </div>
    );
}
