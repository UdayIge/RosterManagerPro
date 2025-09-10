import { generateTimeSlots } from "@/lib/time-slots";
import Slot from "@/ui/Slot";
import Image from "next/image";
import React, { useState } from "react";

interface SlotsGridProps {
  availability: {
    online_slots?: string[];
    offline_slots?: string[];
    both_slots?: string[];
    online_booked_slots?: string[];
    offline_booked_slots?: string[];
    blocked_slots?: { slot: string; reason: string }[];
  };
}

const SlotsGrid = ({ availability }: SlotsGridProps) => {
  const timeSlots = generateTimeSlots("08:00", "24:00", 15);
  const columnsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const chunkedSlots = chunkArray(timeSlots, 4);
  const totalPages = Math.ceil(chunkedSlots.length / columnsPerPage);
  const visibleChunks = chunkedSlots.slice(
    currentPage * columnsPerPage,
    (currentPage + 1) * columnsPerPage
  );

  const getStatus = (time: string) => {
    if (availability?.blocked_slots?.some((s) => s.slot === time))
      return "blocked";
    if (availability?.online_booked_slots?.includes(time))
      return "online-booked";
    if (availability?.offline_booked_slots?.includes(time))
      return "offline-booked";
    if (availability?.both_slots?.includes(time)) return "online-offline";
    if (availability?.online_slots?.includes(time)) return "online";
    if (availability?.offline_slots?.includes(time)) return "offline";
    return "available";
  };

  const getReason = (time: string) => {
    return availability?.blocked_slots?.find((s) => s.slot === time)?.reason;
  };

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  return (
    <div className="flex border border-[var(--border-primary)] rounded-2xl w-224">
      <div
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
        className={`flex items-center justify-center z-10 border-r border-[var(--border-primary)] w-10 h-full cursor-pointer ${
          currentPage === 0 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Image src="/svg/arrow-left.svg" alt="Left" width={6} height={8} />
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-x-4 gap-y-1 p-3 overflow-x-auto">
        {visibleChunks.map((group, colIdx) =>
          group.map((time, rowIdx) => (
            <Slot
              key={`${colIdx}-${rowIdx}`}
              time={time}
              status={getStatus(time)}
              reason={getReason(time)}
            />
          ))
        )}
      </div>
      <div
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
        className={`flex border-l border-[var(--border-primary)] z-10 items-center justify-center min-w-10 max-w-10 w-10 h-full cursor-pointer ${
          currentPage === totalPages - 1 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Image src="/svg/arrow-right.svg" alt="Right" width={6} height={8} />
      </div>
    </div>
  );
};

export default SlotsGrid;
