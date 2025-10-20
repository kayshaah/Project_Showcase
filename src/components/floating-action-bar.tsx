
'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from './ui/button';

const links = [
  {
    href: 'https://kashishshah.com/contact',
    label: 'Contact Me',
    icon: Mail,
  },
  {
    href: 'https://www.linkedin.com/in/kayshaah/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://github.com/kayshaah',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://kashishshah.com/resume',
    label: 'Resume',
    icon: FileText,
  },
];

export function FloatingActionBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center"
    >
        <div className="flex items-center gap-2 rounded-full border border-border/40 bg-background/80 p-2 shadow-lg backdrop-blur-md">
          {links.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className="rounded-full h-12 px-4 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-300"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">{link.label}</span>
              </Button>
            </a>
          ))}
        </div>
    </motion.div>
  );
}
