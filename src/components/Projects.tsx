
import React from 'react';
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores with analytics, inventory, and order management.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "#",
  },
  {
    id: 2,
    title: "Travel Booking Platform",
    description: "A platform connecting travelers with unique accommodations and experiences worldwide.",
    tags: ["Next.js", "GraphQL", "Styled Components"],
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    link: "#",
  },
  {
    id: 3,
    title: "Finance Management App",
    description: "Personal finance tool that helps users track expenses, set budgets and reach financial goals.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    link: "#",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden border border-neutral-200 rounded-lg animate-fade-in",
        index % 2 === 0 ? "animate-[fade-in_0.5s_0.2s_ease-out_both]" : "animate-[fade-in_0.5s_0.4s_ease-out_both]"
      )}
    >
      <div className="aspect-video overflow-hidden bg-neutral-100">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-neutral-700 mb-5 flex-1">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-neutral-100 text-neutral-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={project.link || "#"} 
          className="inline-flex items-center text-sm font-medium hover:underline"
        >
          View Project
          <svg 
            className="ml-1 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="work" className="py-20">
      <div className="container max-w-7xl">
        <div className="mb-16">
          <span className="text-sm text-neutral-500 font-mono mb-4 block">My Work</span>
          <h2 className="text-3xl md:text-4xl font-semibold">Selected Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
