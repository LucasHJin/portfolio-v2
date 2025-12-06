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

  return (
    <div
      onClick={() => onSelect(project)}
      className="flex justify-between"
    >
      <p className="text-lg cursor-pointer hover:text-highlight transition-colors duration-300">{project.title}</p>
      <a className="text-lg cursor-pointer hover:text-highlight transition-colors duration-300">↗</a>
    </div>
  );
}
