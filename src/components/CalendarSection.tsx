"use client";
import React, { useMemo, useState } from "react";
import { getWeekDates } from "@/lib/current-week-dates";
import { generateEventsFromProviders } from "@/lib/events";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { generateMockGoogleEvents } from "@/lib/mock-google-events";
import { ProviderEntity } from "@/lib/types";

const CalendarMainArea = ({
  selectedProvider,
}: {
  selectedProvider: string | null;
}) => {
  const [baseDate, setBaseDate] = useState(new Date());
  

  return (
    <div className="p-5">
      {/* Calendar Header with navigation */}
    </div>
  );
};

export default CalendarMainArea;
