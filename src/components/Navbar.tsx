import Link from "next/link";

export default function Navbar({
  currPage,
}: {
  currPage: "home" | "portfolio";
}) {
  return (
    <nav className="flex justify-between mb-3">
      <Link
        href="/"
        className={`font-garamond text-5xl
        relative after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full
        ${currPage === "home" ? "text-foreground" : "text-highlight"}`}
      >
        Lucas Jin
      </Link>
      <Link
        href="/portfolio"
        className={`font-garamond text-5xl 
        relative after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full
        ${currPage === "portfolio" ? "text-foreground" : "text-highlight"}`}
      >
        Portfolio
      </Link>
    </nav>
  );
}
