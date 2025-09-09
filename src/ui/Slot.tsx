import React from "react";

interface SlotProps {
  time: string;
  status:
    | "online"
    | "offline"
    | "online-offline"
    | "online-booked"
    | "offline-booked"
    | "blocked"
    | "available";
  reason?: string;
}

const statusColorMap: Record<SlotProps["status"], string> = {
  online: "bg-[#97CC55] text-white",
  offline: "bg-[#E76943] text-white",
  "online-offline": "bg-[#5AA9E8] text-white",
  "online-booked": "bg-[#355E80] text-white",
  "offline-booked": "bg-[#80490B] text-white",
  blocked: "bg-[#C73031] text-white",
  available: "bg-[#EEEEEE] text-[#4C4C4C]",
};

const Slot: React.FC<SlotProps> = ({ time, status, reason }) => {
  const isBlocked = status === "blocked";

  return (
    <div className="relative group">
      <div
        className={`rounded-lg h-7 px-3 py-1 text-center justify-center text-sm w-16 ${statusColorMap[status]}`}
      >
        {time}
      </div>

      {isBlocked && reason && (
        <div className="bottom-full left-1/2 -translate-x-1/2 mb-1 w-max max-w-xs px-2 py-1 text-xs text-white bg-[#4C4C4C] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none whitespace-nowrap overflow-visible">
          {reason}
        </div>
      )}
    </div>
  );
};

export default Slot;
