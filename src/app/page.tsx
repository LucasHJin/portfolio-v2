import Navbar from "@/components/Navbar";
import PetCard from "@/components/PetCard";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap gap-8">
      <div className="flex-1 text-xl">
        <Navbar currPage="home"/>
        <ul className="space-y-1">
          <li className="before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            cs @ University of Waterloo
          </li>
          <li className="before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            mle @ Wat.AI FlockRL
          </li>
          <li className="font-medium before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            recent!
          </li>
          <ul className="space-y-1 pl-6 mt-1">
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              released Pixel Pets - 1900 downloads
            </li>
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              won 🥇 + $1K @ Hack404
            </li>
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              started writing on Substack
            </li>
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              working on OSS for automated FRC scouting with CV
            </li>
          </ul>
          <li className="font-medium before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            more...
          </li>
          <ul className="space-y-1 pl-6 mt-1">
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              i ❤️ anime + cosplay
            </li>
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              avid bodybuilder (see below ↓)
            </li>
          </ul>
        </ul>
      </div>
      <PetCard />
    </div>
  );
}