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
      <div className="bg-highlight h-full w-5/12 rounded-xl text-foreground flex items-center justify-center text-2xl">
        Click on a project to learn more!
      </div>
    );
  }

  const isVideo = project.image.endsWith('.mp4');

  return (
    <div className="bg-highlight h-full w-5/12 rounded-xl overflow-y-auto flex flex-col gap-3 p-6">
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
        <h2 className="text-2xl font-semibold">{project.title}</h2>
        <div className="flex gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background transition-colors duration-500"
              title="GitHub"
            >
              <Github className="w-6"/>
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
              <DevpostIcon className="w-6"/>
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
              <MoveUpRight className="w-6"/>
            </a>
          )}
        </div>
      </div>

      <p className="leading-relaxed text-lg">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-background px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
