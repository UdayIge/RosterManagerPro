"use client";
import Image from "next/image";

type ViewToggleProps = {
  activeView: "list" | "calendar";
  setActiveView: (view: "list" | "calendar") => void;
};

export const ViewToggle = ({ activeView, setActiveView }: ViewToggleProps) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-300">
      <button
        className={`flex-1 p-1 border-none ${
          activeView === "list" ? "bg-[var(--highlight-primary)]" : "bg-white"
        } hover:bg-gray-100 focus:outline-none`}
        onClick={() => setActiveView("list")}
      >
        <Image
          src="/svg/session.svg"
          alt="Session icon"
          width={40}
          height={40}
          className="w-10 h-10 p-2 gap-2"
        />
      </button>
      <button
        className={`flex-1 p-1 border-none ${
          activeView === "calendar"
            ? "bg-[var(--highlight-primary)]"
            : "bg-white"
        } hover:bg-gray-100 focus:outline-none`}
        onClick={() => setActiveView("calendar")}
      >
        <Image
          src="/svg/calendar-icon.svg"
          alt="Calendar icon"
          width={40}
          height={40}
          className="w-10 h-10 p-2 gap-2"
        />
      </button>
    </div>
  );
};
