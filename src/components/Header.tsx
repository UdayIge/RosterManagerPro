import { ViewToggle } from "@/ui/ViewToggle";
import Image from "next/image";

type HeaderProps = {
  activeView: "list" | "calendar";
  setActiveView: (view: "list" | "calendar") => void;
};

export const Header = ({ activeView, setActiveView }: HeaderProps) => {
  return (
    <header className="w-full bg-white border border-[var(--border-primary)] z-50">
      <div className="flex justify-between items-center px-6 py-4 gap-4">
        <div className="flex items-center space-x-3">
          <Image
            src="/svg/chevrons-right.svg"
            alt="Chevrons Right"
            width={40}
            height={40}
            className="text-xl p-2 gap-2 w-10 h-10 font-bold text-[#4C4C4C]"
          />
          <h1 className="text-lg font-semibold text-[#4C4C4C]">
            Provider Calendar
          </h1>
        </div>
        <div>
          <ViewToggle activeView={activeView} setActiveView={setActiveView} />
        </div>
      </div>
    </header>
  );
};
