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
    <div className="h-full w-full flex flex-row flex-nowrap gap-8">
      <div className="flex-1">
        <Navbar currPage="portfolio" />
        <div className="space-y-2">
          {portfolioData.map((project) => (
            <PortfolioItem 
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>
      <PortfolioCard />
    </div>
  );
}
