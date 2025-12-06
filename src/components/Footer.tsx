import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MoveRight,
  MoveLeft,
  Twitter,
  Bookmark,
} from "lucide-react";
import WebringIcon from "./icons/WebringIcon";

export default function Footer() {
  return (
    <footer className="mt-4 flex flex-col">
      <div className="flex justify-between mb-1">
        <nav className="flex gap-3 justify-start items-center">
          <a
            href="https://github.com/LucasHJin"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <Github className="w-4 h-4 lg:w-6 lg:h-6 hover:text-highlight transition-colors duration-500"/>
          </a>
          <a
            href="https://www.linkedin.com/in/lucas--jin/"
            target="_blank"
            rel="noopener noreferrer"
            title="aedin"
          >
            <Linkedin className="w-4 h-4 lg:w-6 lg:h-6 hover:text-highlight transition-colors duration-500"/>
          </a>
          <a
            href="mailto:lucasjin.hh@gmail.com"
            rel="noopener noreferrer"
            title="Mail"
          >
            <Mail className="w-4 h-4 lg:w-6 lg:h-6 hover:text-highlight transition-colors duration-500"/>
          </a>
          <a
            href="https://lucasjin.substack.com/?r=6ecjb4&utm_campaign=pub-share-checklist"
            target="_blank"
            rel="noopener noreferrer"
            title="Substack"
          >
            <Bookmark className="w-4 h-4 lg:w-6 lg:h-6 hover:text-highlight transition-colors duration-500"/>
          </a>
        </nav>
        <nav className="flex gap-1 justify-end items-center">
          <a
            href="https://cs.uwatering.com/#www.lucasjin.ca?nav=prev"
          >
            <MoveLeft className="w-5 lg:w-7 hover:text-highlight transition-colors duration-500"/>
          </a>{" "}
          <a
            href="https://cs.uwatering.com/#www.lucasjin.ca"
            target="_blank"
            className="w-5 lg:w-7 hover:text-highlight transition-colors duration-500"
          >
            <WebringIcon />
          </a>
          <a
            href="https://cs.uwatering.com/#www.lucasjin.ca?nav=next"
          >
            <MoveRight className="w-5 lg:w-7 hover:text-highlight transition-colors duration-500"/>
          </a>
        </nav>
      </div>
      <p className="text-sm lg:text-base">Lucas Jin © 2025</p>
    </footer>
  );
}
