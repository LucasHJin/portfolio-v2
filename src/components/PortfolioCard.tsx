import { ProjectDataType } from "./PortfolioItem";

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

  return <div className="bg-black h-full w-5/12 rounded-xl"></div>;
}
