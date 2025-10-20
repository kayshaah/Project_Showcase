'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import type { Project } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AndroidEmulator } from './android-emulator';
import { TechIcon } from './tech-icon';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, x: isEven ? -50 : 50 },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  const projectImages = project.imageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

  return (
    <div ref={ref} className="flex justify-center my-4 md:my-0">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full"
      >
        <Dialog>
          <DialogTrigger asChild>
            <div className="group relative cursor-pointer rounded-lg border-2 border-border bg-card p-6 shadow-lg transition-all duration-300 hover:border-accent hover:shadow-accent/20 hover:-translate-y-1">
              <div className="absolute top-4 right-4 text-accent font-headline font-bold text-2xl opacity-20 group-hover:opacity-100 transition-opacity">
                {project.year}
              </div>
              <h3 className="text-xl font-bold font-headline text-primary-foreground mb-2 pr-12">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {project.shortDescription}
              </p>
              <Button variant="link" className="p-0 h-auto text-accent">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-headline text-primary-foreground">{project.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                {project.year}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div>
                {project.type === 'mobile' ? (
                  <AndroidEmulator imageId={project.imageIds[0]} />
                ) : (
                  projectImages.length > 0 && (
                    <Carousel className="w-full max-w-sm mx-auto">
                      <CarouselContent>
                        {projectImages.map((image, idx) => image && (
                          <CarouselItem key={idx}>
                              <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={800}
                                height={600}
                                data-ai-hint={image.imageHint}
                                className="rounded-lg object-cover"
                              />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  )
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="font-bold font-headline text-lg">About the Project</h4>
                <p className="text-muted-foreground">{project.longDescription}</p>
                <h4 className="font-bold font-headline text-lg pt-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <TechIcon key={tech} name={tech} />
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
