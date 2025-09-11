import React from "react";
import SearchInput from "../SearchInput";
import Image from "next/image";

const CalendarSidebar = ({
  selectedProvider,
  removeProvider,
}: {
  selectedProvider: string | null;
  removeProvider: () => void;
}) => {
  const statusColor = "bg-[#E3F2FF]";

  return (
    <div className="w-90 h-157 p-6 gap-4 border-r border-[var(--border-primary)] mt-0">
      <SearchInput />
      {selectedProvider && (
        <div
          className={`mt-4 flex items-center justify-between ${statusColor} text-[#4C4C4C] p-2 rounded-md`}
        >
          <span className="font-semibold">{selectedProvider}</span>
          <button
            onClick={removeProvider}
            className="ml-2 text-xl font-bold text-[#4C4C4C] hover:text-gray-400"
          >
            <Image src="/svg/cancel.svg" alt="Remove" width={24} height={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarSidebar;
