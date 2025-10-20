
import {
    Activity,
    Cloud,
    Code,
    Cpu,
    Database,
    FileText,
    Github,
    PenTool,
    Smartphone,
    BrainCircuit,
    Bot,
    Newspaper,
    CookingPot,
    CheckSquare,
    GitBranch,
    Users,
    BarChart2,
    Briefcase,
    Server,
    Hand,
} from 'lucide-react';
import type { Technology } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const iconMap: Record<Technology, React.ElementType> = {
    'Android Studio': Smartphone,
    'Firebase': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    'OneSignal': Activity,
    'Matlab': Code,
    'Springer': Newspaper,
    'ChatGPT': Bot,
    'AWS': Cloud,
    'Databricks': Database,
    'GitLab': GitBranch,
    'Python': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M10.2 9.8c-1 .3-1.8.8-2.5 1.5-1.1 1.1-1.7 2.5-1.7 4s.6 2.9 1.7 4c1.1 1.1 2.5 1.7 4 1.7s2.9-.6 4-1.7c1.1-1.1 1.7-2.5 1.7-4c0-1-.3-1.9-.8-2.7l-1.5-2.2-2.1 2.7c-.3.4-.7.7-1.2.8zM13.8 14.2c1-.3 1.8-.8 2.5-1.5c1.1-1.1 1.7-2.5 1.7-4s-.6-2.9-1.7-4c-1.1-1.1-2.5-1.7-4-1.7s-2.9.6-4 1.7c-1.1 1.1-1.7 2.5-1.7 4c0 1 .3 1.9.8 2.7l1.5 2.2 2.1-2.7c.3-.4.7-.7 1.2-.8z"/></svg>,
    'Azure': Cloud,
    'JINJA': FileText,
    'Salesforce': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4c-1.3 0-2.5.6-3.3 1.6-.8-1-2-1.6-3.3-1.6C7.7 9.4 6 11.4 6 14c0 2.6 3.9 5.2 6.1 6.3.2.1.4.1.6 0C14.9 19.2 19 16.6 19 14c0-2.6-1.7-4.6-3.5-4.6z"/></svg>,
    'PySpark': Code,
    'Next.js': Code,
    'GenAI': BrainCircuit,
    'React': Cpu,
    'HTML': Code,
    'CSS': PenTool,
    'Machine Learning': BrainCircuit,
    'Blender': () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.8 13.3C18 12.5 17 12 16 12s-2 .5-2.8 1.3c-.8.8-1.2 1.8-1.2 2.8 0 1.2.6 2.3 1.5 3 .9.7 2.1.8 3.2.3"/><path d="M8 12h8"/><path d="M10.2 17.8c.8.8 1.8 1.2 2.8 1.2s2-.5 2.8-1.2c.8-.8 1.2-1.8 1.2-2.8 0-1-.5-2-1.2-2.7l-2.8-2.8-2.8 2.8c-.8.7-1.2 1.7-1.2 2.7 0 1 .5 2 1.2 2.8z"/><path d="M12 22v-6.5"/><path d="M12 8V2"/><path d="M4.9 19.1 8 16"/><path d="M19.1 4.9 16 8"/><path d="m10.1 4.1.9.9"/><path d="m5 5 2.1 2.1"/><path d="M16.9 19.9 16 19"/><path d="M3.9 12H10"/></svg>,
};

export function TechIcon({ name }: { name: Technology }) {
  const IconComponent = iconMap[name] || Code;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-2 bg-secondary rounded-lg border border-transparent hover:border-accent transition-colors duration-300 group">
            <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
