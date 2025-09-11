import { RootState } from "@/store";
import Dropdown from "@/ui/Dropdown";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  weekDates: Date[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
}
const DateNavigation = ({ weekDates, onPrevWeek, onNextWeek }: Props) => {
  const providers = useSelector((state: RootState) => state.provider.items);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    ...new Set(
      providers.flatMap((p) => {
        const avail = p.availabilities?.[0];
        if (!avail) return [];
        const s: string[] = [];
        if (avail.online_slots?.length) s.push("Online");
        if (avail.offline_slots?.length) s.push("Offline");
        if (avail.both_slots?.length) s.push("Online + Offline");
        if (avail.online_booked_slots?.length) s.push("Online Booked");
        if (avail.offline_booked_slots?.length) s.push("Offline Booked");
        if (avail.blocked_slots?.length) s.push("Blocked");
        return s;
      })
    ),
  ];

  const formatDate = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;

  const rangeText = `${formatDate(weekDates[0])} - ${formatDate(
    weekDates[6]
  )} ${weekDates[6].getFullYear()}`;

  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex gap-2">
        <button onClick={onPrevWeek}>
          <Image
            src="/svg/chevron-left.svg"
            alt="left"
            width={32}
            height={32}
          />
        </button>
        <button onClick={onNextWeek}>
          <Image
            src="/svg/chevron-right.svg"
            alt="right"
            width={32}
            height={32}
          />
        </button>
        <h3 className="font-semibold text-[#4C4C4C] mt-1">{rangeText}</h3>
      </div>
      <div className="flex gap-2">
        <Image
          src="/svg/session-event.svg"
          alt="session event"
          width={92}
          height={16}
        />
        <Image
          src="/svg/calendar-event.svg"
          alt="calendar event"
          width={92}
          height={16}
        />
        <Dropdown
          options={services}
          value={selectedService}
          onChange={setSelectedService}
          className="z-60 mt-5 mr-3"
        />
      </div>
    </div>
  );
};

export default DateNavigation;
