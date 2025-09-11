import Image from "next/image";
import React from "react";

interface DateNavigationProps {
  selectedDate: Date[];
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DateNavigation = ({ selectedDate }: DateNavigationProps) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <div>
        <h3 className="font-semibold text-[#4C4C4C]">
          {selectedDate.length > 0
            ? `Showing full schedules for ${selectedDate
                .map((d) => formatDate(d))
                .join(", ")}`
            : "No date selected"}
        </h3>
        <h5 className="text-[#757575]">
          Showing slots in the 8 am to 12 am window.
        </h5>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <Image src="/svg/online.svg" alt="Online" width={120} height={20} />
        <Image src="/svg/offline.svg" alt="Offline" width={120} height={20} />
        <Image
          src="/svg/online-offline.svg"
          alt="Online + Offline"
          width={120}
          height={20}
        />
        <Image
          src="/svg/online-booked.svg"
          alt="Online Booked"
          width={120}
          height={20}
        />
        <Image
          src="/svg/offline-booked.svg"
          alt="Offline Booked"
          width={120}
          height={20}
        />
        <Image src="/svg/blocked.svg" alt="Blocked" width={120} height={20} />
      </div>
    </div>
  );
};

export default DateNavigation;
