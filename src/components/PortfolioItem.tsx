export type ProjectDataType = {
  id: number;
  title: string;
  description: string;
  image: string;
  links: {
    github: string;
    devpost: string;
    livesite: string;
  };
  tags: string[];
};

export default function PortfolioItem({
  project,
  onSelect,
}: {
  project: ProjectDataType | null;
  onSelect: (project: ProjectDataType) => void;
}) {
  if (!project) {
    return <div>ERROR</div>;
  }

  const linkToUse = project.links.livesite || project.links.github;

  return (
    <div onClick={() => onSelect(project)} className="flex justify-between">
      <p className="text-lg cursor-pointer hover:text-highlight transition-colors duration-300">
        {project.title}
      </p>
      <a
        href={linkToUse}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg cursor-pointer hover:text-highlight transition-colors duration-300"
      >
        ↗
      </a>
    </div>
  );
}
