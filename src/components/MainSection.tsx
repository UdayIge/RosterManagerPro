"use client";
import React, { useState } from "react";
import DateGrid from "./Main-Dashboard/DateGrid";
import DateNavigation from "./Main-Dashboard/DateNavigation";
import RosterCard from "./Main-Dashboard/RosterCard";

const MainSection = ({
  setActiveView,
  setSelectedProvider,
}: {
  setActiveView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
  setSelectedProvider: (name: string) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([new Date()]);

  return (
    <div className="p-5">
      <DateGrid selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <DateNavigation selectedDate={selectedDate} />
      <RosterCard
        setSelectedProvider={setSelectedProvider}
        setActiveView={setActiveView}
      />
    </div>
  );
};

export default MainSection;
