import DateCard from "@/ui/Date";
import Image from "next/image";
import React, { useState } from "react";

interface DateGridProps {
  selectedDate: Date[];
  setSelectedDate: (date: Date[]) => void;
}

const DateGrid = ({ selectedDate, setSelectedDate }: DateGridProps) => {
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const currentDay = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + offset * 7);

    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const handleToggleDate = (date: Date) => {
    const isAlreadySelected = selectedDate.some((d) => isSameDate(d, date));
    if (isAlreadySelected) {
      setSelectedDate(selectedDate.filter((d) => !isSameDate(d, date)));
    } else {
      setSelectedDate([...selectedDate, date]);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekDates = getWeekDates(weekOffset);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setWeekOffset((prev) => prev - 1)}>
        <Image
          src="/svg/chevron-left.svg"
          alt="Chevron Left"
          width={32}
          height={32}
        />
      </button>
      {weekDates.map((dateObj, index) => {
        const isSelected = selectedDate.some((d) => isSameDate(d, dateObj));

        return (
          <DateCard
            key={index}
            day={dayNames[dateObj.getDay()]}
            date={dateObj.getDate()}
            isSelected={isSelected}
            onClick={() => handleToggleDate(dateObj)}
          />
        );
      })}
      <button onClick={() => setWeekOffset((prev) => prev + 1)}>
        <Image
          src="/svg/chevron-right.svg"
          alt="Chevron Right"
          width={32}
          height={32}
        />
      </button>
    </div>
  );
};

export default DateGrid;
