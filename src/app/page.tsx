import Navbar from "@/components/Navbar";
import PetCard from "@/components/PetCard";
import GraphCard from "@/components/GraphCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap gap-8">
      <div className="flex-1 text-xl flex flex-col">
        <Navbar currPage="home" />
        <ul className="space-y-1">
          <li className="before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            <a
              href="https://cs.uwaterloo.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              cs @ University of Waterloo
            </a>
          </li>
          <li className="before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            <a
              href="https://watai.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              mle @ Wat.AI FlockRL
            </a>
          </li>
          <li className="font-medium before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            recent!
          </li>
          <ul className="space-y-1 pl-6 mt-1">
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              released {' '}
              <a
                href="https://obsidian.md/plugins?id=pixel-pets"
                target="_blank"
                rel="noopener noreferrer"
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
              >
                Pixel Pets
              </a>
              {' '} - 1900 downloads
            </li>
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              won 🥇 + $1K @ {' '}
              <a
                href="https://hack404.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
              >
                Hack404
              </a>
            </li>
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              working on OSS for {' '}
              <a
                href="https://github.com/LucasHJin/robotrack"
                target="_blank"
                rel="noopener noreferrer"
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
              >
                automated FRC scouting
              </a>
              {' '} with CV
            </li>
            <li className="before:content-['✦'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              wanna know more? check out my {' '}
              <Link
                href="/Lucas_Jin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
              >
                resume ↗
              </Link>
            </li>
          </ul>
          <li className="font-medium before:content-['◆'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
            other...
          </li>
          <ul className="space-y-1 pl-6 mt-1">
            <li className="before:content-['↳'] before:mr-2 before:transition-colors before:duration-300 hover:before:text-highlight">
              avid bodybuilder (see below ↓)
            </li>
          </ul>
        </ul>
        <div className="flex gap-6 flex-1 mt-5 mb-1">
          <GraphCard />
          <GraphCard />
        </div>
      </div>
      <PetCard />
    </div>
  );
}
