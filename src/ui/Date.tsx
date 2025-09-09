import React from "react";

interface DateProps {
  day: string;
  date: number;
  isSelected?: boolean;
  onClick?: () => void;
}
const DateCard = ({ day, date, isSelected = false, onClick }: DateProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col rounded-lg w-30 px-4 text-center ${
        isSelected
          ? "bg-[#4E6137] text-white"
          : "border border-[var(--border-primary)]"
      }`}
    >
      <h6 className={`text-sm ${isSelected ? "text-white" : "text-[#9E9E9E]"}`}>
        {day}
      </h6>
      <h4
        className={`text-lg font-bold ${
          isSelected ? "text-white" : "text-[#4C4C4C]"
        }`}
      >
        {date}
      </h4>
    </div>
  );
};

export default DateCard;
