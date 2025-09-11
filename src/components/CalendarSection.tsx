"use client";
import React, { useMemo, useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { generateEventsFromProviders } from "@/lib/events";
import { getWeekDates } from "@/lib/current-week-dates";
import { generateMockGoogleEvents } from "@/lib/mock-google-events";
import { ProviderEntity } from "@/lib/types";
import DateNavigation from "./Calender/DateNavigation";
import CalendarView from "./Calender/CalendarView";

const CalendarMainArea = ({
  selectedProvider,
}: {
  selectedProvider: string | null;
}) => {
  const [baseDate, setBaseDate] = useState(new Date());
  const providers = useSelector<RootState, ProviderEntity[]>(
    (state) => state.provider.items
  );

  const currentWeekDates = useMemo(() => getWeekDates(baseDate), [baseDate]);

  const filteredProviders = selectedProvider
    ? providers.filter((provider) => provider.name === selectedProvider)
    : providers;

  const events = [
    ...currentWeekDates.flatMap((date) =>
      generateEventsFromProviders(
        filteredProviders,
        date.toISOString().split("T")[0]
      )
    ),
    ...generateMockGoogleEvents(currentWeekDates),
  ];

  const allEvents = [
    ...currentWeekDates.flatMap((date) =>
      generateEventsFromProviders(providers, date.toISOString().split("T")[0])
    ),
    ...generateMockGoogleEvents(currentWeekDates),
  ];

  const handlePreviousWeek = () => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() - 7);
    setBaseDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + 7);
    setBaseDate(newDate);
  };

  return (
    <div className="p-5">
      <DateNavigation
        weekDates={currentWeekDates}
        onPrevWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />
      {selectedProvider ? (
        <CalendarView events={events} weekDates={currentWeekDates} />
      ) : (
        <CalendarView events={allEvents} weekDates={currentWeekDates} />
      )}
    </div>
  );
};

export default CalendarMainArea;
