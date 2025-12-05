import Navbar from "@/components/Navbar";
import PetCard from "@/components/PetCard";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-row flex-nowrap gap-5">
      <div className="flex-1">
        <Navbar currPage="home"/>
        BLANK SLATE
      </div>
      <PetCard />
    </div>
  );
}