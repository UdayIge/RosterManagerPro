"use client";
import React, { useState } from "react";
import { generateTimeSlots } from "@/lib/time";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function formatTo12Hour(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

export interface CalendarEvent {
  id: number;
  title: string;
  day: string;
  start: string;
  end: string;
  status:
    | "online"
    | "offline"
    | "online booked"
    | "offline booked"
    | "blocked"
    | "available"
    | "online + offline"
    | "google-calendar";
}

export default function CalendarView({
  events,
  weekDates,
}: {
  events: CalendarEvent[];
  weekDates: Date[];
}) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const slots = generateTimeSlots("00:00", "23:45", 60);

  const today = new Date().getDate().toString().padStart(2, "0");

  const search = useSelector((state: RootState) => state.provider.search);
  const filters = useSelector((state: RootState) => state.provider.filters);

  const [activeDayIndex, setActiveDayIndex] = useState(() => {
    return weekDates.findIndex(
      (date) => date.getDate().toString().padStart(2, "0") === today
    );
  });

  const filteredBySearch = events.filter((event) => {
    return event.title.toLowerCase().includes(search.toLowerCase());
  });

  const filteredEvents = filteredBySearch.filter((event) => {
    if (filters.service === "All") {
      return true; // Show all events if "All" is selected
    }

    if (filters.service === "Online" && event.status === "online") {
      return true;
    }

    if (filters.service === "Offline" && event.status === "offline") {
      return true;
    }

    if (
      filters.service === "Online + Offline" &&
      event.status === "online + offline"
    ) {
      return true;
    }

    if (filters.service === "Available" && event.status === "available") {
      return true;
    }

    if (filters.service === "Blocked" && event.status === "blocked") {
      return true;
    }

    return false;
  });

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-8 sticky top-0 z-10 bg-white">
        <div className="p-2 border-r border-[#E0E0E0]"></div>
        {days.map((d, idx) => {
          const isActive = idx === activeDayIndex;
          const dayNumber = weekDates[idx]
            .getDate()
            .toString()
            .padStart(2, "0");

          return (
            <div
              key={d}
              className="p-2 text-center border-r border-[#E0E0E0] flex flex-col gap-2 items-center cursor-pointer"
              onClick={() => setActiveDayIndex(idx)}
            >
              <span className="text-[#9E9E9E] text-xs">{d}</span>
              <span
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                  isActive ? "bg-[#607447] text-white" : "text-[#4C4C4C]"
                }`}
              >
                {dayNumber}
              </span>
            </div>
          );
        })}
      </div>

      {slots.map((time) => (
        <div
          key={time}
          className="grid grid-cols-8 text-center border-t border-[#E0E0E0]"
        >
          <div className="p-1 text-xs border-r border-[#E0E0E0]">
            {formatTo12Hour(time)}
          </div>

          {days.map((d, i) => {
            const dateStr = weekDates[i].toISOString().split("T")[0];
            const event = filteredEvents.find(
              (e) => e.day === dateStr && e.start === time
            );

            let bg = "",
              border = "";

            if (event?.status === "online") bg = "bg-[#3D7FB4]";
            if (event?.status === "online + offline") bg = "bg-[#A288C2]";
            if (event?.status === "blocked") bg = "bg-[#B26522]";
            if (event?.status === "online booked") bg = "bg-[#37614A]";
            if (event?.status === "available") bg = "bg-[#C288A8]";
            if (event?.status === "google-calendar") {
              bg = "bg-[#E3F2FF]";
              border = "border border-[#255780]";
            }

            return (
              <div
                key={d + time}
                className={`h-15 min-w-[140px] rounded-md border-r border-[#E0E0E0] text-xs px-2 ${
                  event
                    ? `${bg} ${border} ${
                        event.status === "google-calendar"
                          ? "flex items-center justify-start"
                          : "flex items-center justify-between"
                      }`
                    : ""
                } overflow-hidden`}
              >
                {event ? (
                  event.status === "google-calendar" ? (
                    <h5
                      className="text-[#255780] font-bold truncate w-full text-left"
                      title={event.title}
                    >
                      {event.title}
                    </h5>
                  ) : (
                    <>
                      <div className="text-white">#{event.id}</div>
                      <Image
                        src="/svg/video-icon-white.svg"
                        alt="video"
                        width={20}
                        height={20}
                      />
                    </>
                  )
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
