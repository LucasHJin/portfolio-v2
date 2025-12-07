import { ProjectDataType } from "./PortfolioItem";
import Image from "next/image";
import { Github, MoveUpRight } from "lucide-react";
import DevpostIcon from "./icons/DevpostIcon";

export default function PortfolioCard({
  project,
}: {
  project: ProjectDataType | null;
}) {
  if (!project) {
    return (
      <div className="bg-highlight h-8/12 w-full lg:h-full lg:w-5/12 rounded-xl text-foreground flex items-center justify-center text-l md:text-xl lg:text-2xl p-6 text-center">
        Click on a project to learn more!
      </div>
    );
  }

  const isVideo = project.image.endsWith('.mp4');

  return (
    <div className="bg-highlight h-8/12 md:h-9/12 w-full lg:h-full lg:w-5/12 rounded-xl overflow-y-auto flex flex-col gap-2 lg:gap-3 p-4 md:p-5 lg:p-6">
      <div className="w-full aspect-video relative rounded-xl overflow-hidden">
        {isVideo ? (
          <video
            src={project.image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-l md:text-xl lg:text-2xl font-semibold">{project.title}</h2>
        <div className="flex gap-2 md:gap-3 items-center">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background transition-colors duration-500"
              title="GitHub"
            >
              <Github className="w-4 md:w-5 lg:w-6"/>
            </a>
          )}
          {project.links.devpost && (
            <a
              href={project.links.devpost}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background transition-colors duration-500"
              title="Devpost"
            >
              <DevpostIcon className="w-4 md:w-5 lg:w-6"/>
            </a>
          )}
          {project.links.livesite && (
            <a
              href={project.links.livesite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background transition-colors duration-500"
              title="Live Site"
            >
              <MoveUpRight className="w-4 md:w-5 lg:w-6"/>
            </a>
          )}
        </div>
      </div>

      <p className="leading-normal md:text-base text-sm lg:leading-relaxed lg:text-lg">{project.description}</p>

      <div className="flex flex-wrap gap-1 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-background px-2 py-0.5 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
