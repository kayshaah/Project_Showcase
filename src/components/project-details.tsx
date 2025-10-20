
'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { Github, Linkedin, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectDetailsProps {
  project: Project;
}

const getLinkIcon = (label: string) => {
    if (label.toLowerCase().includes('github')) {
        return <Github className="w-4 h-4 mr-2" />;
    }
    if (label.toLowerCase().includes('paper')) {
        return <LinkIcon className="w-4 h-4 mr-2" />;
    }
    if (label.toLowerCase().includes('linkedin') || label.toLowerCase().includes('siddhesh') || label.toLowerCase().includes('aakash')) {
        return <Linkedin className="w-4 h-4 mr-2" />;
    }
    return <LinkIcon className="w-4 h-4 mr-2" />;
}

const TABS = ['story', 'tech', 'links'];

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    // Reset to the first tab whenever the project changes
    setActiveTab(TABS[0]);

    const interval = setInterval(() => {
      setActiveTab(prevTab => {
        const currentIndex = TABS.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex];
      });
    }, 10000); // 10-second interval

    return () => clearInterval(interval); // Cleanup on component unmount or project change
  }, [project.id]);

  return (
    <div className="w-full h-full flex flex-col space-y-4 justify-center text-center xl:text-left items-center xl:items-start">
        <h3 className="font-headline text-4xl font-bold text-primary px-4 xl:px-0">{project.title}</h3>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>
            <div className="relative min-h-[220px] mt-4">
                <AnimatePresence>
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="w-full"
                    >
                      <TabsContent value="story" className="text-left p-1 m-0">
                        <p>{project.story}</p>
                      </TabsContent>
                      <TabsContent value="tech" className="text-left p-1 m-0">
                        <p>{project.implementation}</p>
                      </TabsContent>
                      <TabsContent value="links" className="text-left p-1 m-0">
                        {project.links && project.links.length > 0 ? (
                            <div className="flex flex-col space-y-3 items-start">
                                {project.links.map((link) => (
                                    <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline">
                                            {getLinkIcon(link.label)}
                                            {link.label}
                                        </Button>
                                    </a>
                                ))}
                            </div>
                        ) : (
                             (project.id === 4 || project.id === 5) ? (
                                <p>This was a Work Experience Project with client information confidential, hence no links can be provided.</p>
                            ) : (
                                <p>No external links available for this project.</p>
                            )
                        )}
                      </TabsContent>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Tabs>
    </div>
  );
}
