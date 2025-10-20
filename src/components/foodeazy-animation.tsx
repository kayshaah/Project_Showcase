
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import type { Project } from '@/lib/data';
import { Video, MapPin, HeartPulse, Search, ChefHat, CheckSquare,CookingPot } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProjectDetails } from './project-details';

const steps = [
    { label: "Visiting FoodEazy.com...", duration: 4000 },
    { label: "Welcome! What are we craving?", duration: 3000 },
    { label: "Searching for 'Avocado Toast'...", duration: 3000 },
    { label: "Here's a popular recipe!", duration: 5000 },
    { label: "Check the nutritional info & watch a tutorial.", duration: 6000 },
    { label: "Or find it at a local cafe!", duration: 5000 },
    { label: "FoodEazy - Your Culinary Companion", duration: 4000 },
];

const recipes = [
    { name: "Avocado Toast", imageId: "foodeazy-1", hint: "avocado toast"},
    { name: "Spaghetti Carbonara", imageId: "foodeazy-2", hint: "pasta dish"},
    { name: "Chicken Curry", imageId: "foodeazy-3", hint: "curry meal"},
]

const restaurants = [
    { name: "The Brunch Spot", distance: "0.5 miles" },
    { name: "Morning Bites", distance: "1.2 miles" },
    { name: "Artisan Cafe", distance: "2.5 miles" },
]

export function FoodEazyAnimation({ project, onComplete }: { project: Project, onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
      if (currentStep >= steps.length) {
        const timer = setTimeout(() => {
            setTimeout(onComplete, 0);
        }, 1000);
        return () => clearTimeout(timer);
      }

      const timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
      }, steps[currentStep]?.duration || 3000);

      return () => {
        clearTimeout(timer);
      }
    }, [currentStep, onComplete]);

    const isFinalStep = currentStep === steps.length;
    const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

    return (
        <div className="flex flex-col xl:flex-row gap-8 items-center justify-center h-full">
            <div className="w-full xl:w-2/3 flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-2xl aspect-video relative overflow-hidden shadow-2xl border-2 border-accent/10">
                
                {/* Computer Screen Bezel */}
                <div className="w-[95%] h-[90%] bg-background shadow-inner border-4 border-gray-800 rounded-2xl relative flex flex-col overflow-hidden">
                    {/* Top bar with URL */}
                    <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center px-3 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow ml-4 bg-white dark:bg-gray-800 rounded-md px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300">
                           {currentStep > 0 && <span>https://foodeazy.com</span>}
                           {currentStep === 0 && <p className="inline">https://foodeazy.com</p>}
                        </div>
                    </div>
                    
                    <div className="flex-grow bg-white dark:bg-gray-900 p-4 relative">
                        <AnimatePresence>
                             {steps[currentStep] && (
                                <motion.div
                                    key={`step-label-${currentStep}`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                                    className={`absolute inset-x-0 flex justify-center z-10 ${currentStep === 5 ? 'top-2' : 'top-4'}`}
                                >
                                    <p className="font-headline text-lg font-bold text-foreground inline-block [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                                        {steps[currentStep].label}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <AnimatePresence>
                        {/* Step 1: Welcome screen with search */}
                        {currentStep === 1 && (
                            <motion.div
                                key="welcome-screen"
                                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.7, ease: 'easeInOut' }}
                            >
                                <div className="text-center">
                                    <ChefHat className="w-20 h-20 text-accent mx-auto" />
                                    <h2 className="font-headline text-5xl font-bold text-primary mt-2">FoodEazy</h2>
                                </div>
                                <div className="relative w-3/4">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-accent/50 text-xl font-headline focus:outline-none focus:ring-2 focus:ring-accent"
                                        placeholder="Find a recipe..."
                                    />
                                </div>
                            </motion.div>
                        )}
                        {/* Step 2: Typing in search */}
                        {currentStep === 2 && (
                            <motion.div 
                                key="search-bar"
                                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.7, ease: 'easeInOut' }}
                            >
                                <div className="text-center">
                                    <ChefHat className="w-20 h-20 text-accent mx-auto" />
                                    <h2 className="font-headline text-5xl font-bold text-primary mt-2">FoodEazy</h2>
                                </div>
                                <div className="relative w-3/4">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-accent/50 text-xl font-headline focus:outline-none focus:ring-2 focus:ring-accent"
                                        value="Avocado Toast"
                                    />
                                    <motion.div className='absolute inset-0 rounded-full border-2 border-accent' initial={{opacity: 1}} animate={{opacity:0, scale:1.2}} transition={{duration: 0.8, delay: 0.5, ease: 'easeInOut'}}/>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                        
                        {/* Step 3: Recipe Display */}
                        {currentStep === 3 && (
                            <motion.div key="recipe-display" className="w-full h-full flex flex-col items-center justify-center gap-4"
                                initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, x: -30}} transition={{duration: 0.7, ease: 'easeInOut'}}
                            >
                                <div className="grid grid-cols-2 gap-4 items-start px-4">
                                    <div className="flex flex-col items-center gap-4">
                                        {getImage(recipes[0].imageId) && <Image src={getImage(recipes[0].imageId)!.imageUrl} alt={recipes[0].name} width={400} height={250} data-ai-hint={recipes[0].hint} className="rounded-lg shadow-xl" />}
                                        <h3 className="font-headline text-2xl font-bold text-primary">{recipes[0].name}</h3>
                                    </div>
                                    <div className="bg-secondary/50 p-3 rounded-lg text-xs">
                                        <div className="mb-2">
                                            <h4 className="font-bold text-sm mb-1 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-accent"/>Ingredients</h4>
                                            <ul className="list-disc list-inside text-muted-foreground pl-2">
                                                <li>2 slices of bread</li>
                                                <li>1 ripe avocado</li>
                                                <li>1 tsp lemon juice</li>
                                                <li>Salt & pepper</li>
                                                <li>Red pepper flakes</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm mb-1 flex items-center gap-2"><CookingPot className="w-4 h-4 text-accent"/>Steps</h4>
                                            <ol className="list-decimal list-inside text-muted-foreground pl-2">
                                                <li>Toast bread slices.</li>
                                                <li>Mash avocado with lemon juice.</li>
                                                <li>Spread on toast.</li>
                                                <li>Season with salt, pepper, and flakes.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Nutritional Info & Video */}
                        {currentStep === 4 && (
                            <motion.div key="recipe-details" className="w-full h-full flex justify-center items-center gap-12" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.7, ease: 'easeInOut'}}>
                                <motion.div className="text-center" initial={{y:50, opacity:0}} animate={{y:0, opacity:1, transition: {delay: 0.2, ease: 'easeInOut'}}}>
                                    <HeartPulse className="w-20 h-20 text-accent mx-auto" />
                                    <h4 className="font-headline font-bold text-lg mt-2">Nutrition</h4>
                                    <p className="text-sm text-muted-foreground">Calories: 280</p>
                                    <p className="text-sm text-muted-foreground">Fat: 22g</p>
                                    <p className="text-sm text-muted-foreground">Carbs: 18g</p>
                                </motion.div>
                                <motion.div className="text-center" initial={{y:50, opacity:0}} animate={{y:0, opacity:1, transition: {delay: 0.6, ease: 'easeInOut'}}}>
                                    <Video className="w-20 h-20 text-accent mx-auto" />
                                     <h4 className="font-headline font-bold text-lg mt-2">Tutorial</h4>
                                     <Button variant="outline" className="mt-2">Watch Video</Button>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Step 5: Restaurant Recommendations */}
                        {currentStep === 5 && (
                            <motion.div key="restaurants" className="w-full h-full" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ ease: 'easeInOut' }}>
                                <div className="space-y-3 pt-16">
                                    {restaurants.map((r, i) => (
                                        <motion.div key={r.name} className="flex items-center gap-4 bg-secondary/50 p-2 rounded-lg"
                                            initial={{x: 50, opacity: 0}}
                                            animate={{x: 0, opacity: 1, transition: {delay: i * 0.3, ease: 'easeInOut'}}}
                                        >
                                            <MapPin className="w-6 h-6 text-accent" />
                                            <div>
                                                <p className="font-bold text-foreground">{r.name}</p>
                                                <p className="text-sm text-muted-foreground">{r.distance}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        
                        {/* Step 6: Final logo */}
                        {currentStep === 6 && (
                             <motion.div key="final-logo" className="w-full h-full flex flex-col items-center justify-center z-20" initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{duration: 1, ease: 'easeInOut'}}>
                                <ChefHat className="w-24 h-24 text-accent" />
                                <h2 className="font-headline text-5xl font-bold text-primary mt-4">FoodEazy</h2>
                             </motion.div>
                        )}

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
