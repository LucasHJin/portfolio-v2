import Navbar from "@/components/Navbar";
import PortfolioCard from "@/components/PortfolioCard";

export default function Portfolio() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap gap-4">
      <div className="flex-1">
        <Navbar currPage="portfolio" />
        PORTFOLIO
      </div>
      <PortfolioCard />
    </div>
  );
}
