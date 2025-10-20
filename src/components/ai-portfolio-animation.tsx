
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import type { Project } from '@/lib/data';
import { Bot, User, Send } from 'lucide-react';
import { ProjectDetails } from './project-details';

const steps = [
    { label: "Navigating to kashishshah.com...", duration: 3000 },
    { label: "Initializing K-Bot...", duration: 3000 },
    { label: "User is typing...", duration: 2000 },
    { label: "Processing query...", duration: 4000 },
    { label: "Generating response...", duration: 5000 },
    { label: "Demonstrating 'Talk to My Resume'", duration: 4000 },
];

const ChatMessage = ({ author, children, isStreaming }: { author: 'user' | 'bot', children: React.ReactNode, isStreaming?: boolean }) => {
    const Icon = author === 'user' ? User : Bot;
    return (
        <motion.div
            key={author === 'user' ? 'user-msg' : 'bot-msg'}
            className={`flex items-start gap-3 w-full ${author === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            {author === 'bot' && <Icon className="w-8 h-8 flex-shrink-0 text-accent rounded-full p-1" />}
            <div className={`max-w-[75%] rounded-lg px-4 py-2 ${author === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                {children}
            </div>
            {author === 'user' && <Icon className="w-8 h-8 flex-shrink-0 bg-secondary text-secondary-foreground rounded-full p-1" />}
        </motion.div>
    );
};

export function AiPortfolioAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep >= steps.length) {
            const timer = setTimeout(() => {
                 setTimeout(onComplete, 0);
            }, 1000); // Small delay before completing
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
    const userQuestion = "Tell me about the Semantic Layer project.";
    const botResponse = "Certainly. At a Fortune 500 pharma giant, I led the creation of a semantic layer to unify terabytes of drug discovery data. This involved complex ETL pipelines using Databricks and PySpark, creating 200+ tables to empower scientists with streamlined data access.";
    const botIntro = "Hi, I'm K-Bot! I'm an SLM trained on Kashish's personal, professional, and academic profile. You can ask me about his skills, work experience, academic journey, certifications, publications, or hobbies. How can I help you?";


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
                            className="absolute top-4 left-6 right-6 text-center z-20"
                        >
                             <p className="font-headline text-lg md:text-xl font-bold text-foreground inline-block [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                                {steps[currentStep].label}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Computer Screen Bezel */}
                <div className="w-[95%] h-[90%] bg-background shadow-inner border-4 border-gray-800 rounded-2xl relative flex flex-col overflow-hidden mt-8">
                     {/* Top bar with URL */}
                    <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center px-3 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow ml-4 bg-white dark:bg-gray-800 rounded-md px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300">
                           {currentStep > 0 && <span>https://kashishshah.com</span>}
                           {currentStep === 0 && <p className="inline">https://kashishshah.com</p>}
                        </div>
                    </div>

                     <div className="flex-grow p-4 relative">
                         <div className="flex-grow space-y-4 overflow-y-auto h-full">
                            <AnimatePresence>
                                {/* Step 1: Bot intro */}
                                {currentStep >= 1 && (
                                    <ChatMessage key="bot-intro" author="bot">
                                        {botIntro}
                                    </ChatMessage>
                                )}
                                {/* Step 2-3: User asks question */}
                                {currentStep >= 3 && (
                                    <ChatMessage key="user-question" author="user">
                                        {userQuestion}
                                    </ChatMessage>
                                )}
                                {/* Step 4-5: Bot responds */}
                                {currentStep >= 4 && (
                                     <ChatMessage key="bot-response" author="bot">
                                        {botResponse}
                                    </ChatMessage>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                            <input type="text" readOnly value={currentStep === 2 ? "Tell me about..." : ""} placeholder="Ask K-Bot a question..." className="flex-grow bg-secondary rounded-full px-4 py-2 text-sm outline-none" />
                            <Button size="icon" disabled>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
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
            <div className="w-full xl:w-1/3 min-h-[300px]">
                <ProjectDetails project={project} />
            </div>
        </div>
    );
}
