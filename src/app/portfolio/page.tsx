"use client";
import Navbar from "@/components/Navbar";
import PortfolioCard from "@/components/PortfolioCard";
import PortfolioItem from "@/components/PortfolioItem"
import { ProjectDataType } from "@/components/PortfolioItem";

import { useState } from 'react';
import portfolioData from '@/data/portfolio.json';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<ProjectDataType | null>(null);

  return (
    <div className="h-full w-full flex flex-row gap-8">
      <div className="flex-1 flex flex-col min-h-0">
        <Navbar currPage="portfolio" />
        <div className="space-y-8 divide-y divide-black overflow-y-auto flex-1">
          {portfolioData.map((project) => (
            <PortfolioItem 
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>
      <PortfolioCard project={selectedProject} />
    </div>
  );
}
