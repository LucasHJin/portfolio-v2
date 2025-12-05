import Navbar from "@/components/Navbar";
import PetCard from "@/components/PetCard";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap gap-8">
      <div className="flex-1 text-xl">
        <Navbar currPage="home"/>
        <ul className="space-y-1">
          <li className="before:content-['◆'] before:mr-2">
            cs @ University of Waterloo
          </li>
          <li className="before:content-['◆'] before:mr-2">
            mle @ Wat.AI FlockRL
          </li>
          <li className="font-medium before:content-['◆'] before:mr-2">
            recent!
          </li>
          <ul className="space-y-1 pl-6 mt-1">
            <li className="before:content-['↳'] before:mr-2">
              released Pixel Pets - 1900 downloads
            </li>
            <li className="before:content-['↳'] before:mr-2">
              won 🥇 + $1K @ Hack404
            </li>
            <li className="before:content-['↳'] before:mr-2">
              started writing on Substack
            </li>
            <li className="before:content-['↳'] before:mr-2">
              working on OSS for automated FRC scouting with CV
            </li>
          </ul>
          <li className="font-medium before:content-['◆'] before:mr-2">
            more...
          </li>
          <ul className="space-y-1 pl-6 mt-1">
            <li className="before:content-['↳'] before:mr-2">
              i ❤️ anime + cosplay
            </li>
            <li className="before:content-['↳'] before:mr-2">
              avid bodybuilder (see below ↓)
            </li>
          </ul>
        </ul>
      </div>
      <PetCard />
    </div>
  );
}