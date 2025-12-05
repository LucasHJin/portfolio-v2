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
      <div className="flex justify-between mb-0.5">
        <nav className="flex gap-3 justify-start">
          <a
            href="https://github.com/LucasHJin"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <Github className="w-7 h-7"/>
          </a>
          <a
            href="https://www.linkedin.com/in/lucas--jin/"
            target="_blank"
            rel="noopener noreferrer"
            title="aedin"
          >
            <Linkedin className="w-7 h-7"/>
          </a>
          <a
            href="mailto:lucasjin.hh@gmail.com"
            rel="noopener noreferrer"
            title="Mail"
          >
            <Mail className="w-7 h-7"/>
          </a>
          <a
            href="https://lucasjin.substack.com/?r=6ecjb4&utm_campaign=pub-share-checklist"
            target="_blank"
            rel="noopener noreferrer"
            title="Substack"
          >
            <Bookmark className="w-7 h-7"/>
          </a>
        </nav>
        <nav className="flex gap-1 justify-end">
          <a
            href="https://cs.uwatering.com/#www.lucasjin.co?nav=prev"
          >
            <MoveLeft className="w-8"/>
          </a>{" "}
          <a
            href="https://cs.uwatering.com/#www.lucasjin.co"
            target="_blank"
            className="w-8"
          >
            <WebringIcon />
          </a>
          <a
            href="https://cs.uwatering.com/#www.lucasjin.co?nav=next"
          >
            <MoveRight className="w-8"/>
          </a>
        </nav>
      </div>
      <p className="text-lg">Lucas Jin © 2025</p>
    </footer>
  );
}
