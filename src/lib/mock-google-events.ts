import { CalendarEvent } from "./events";

export function generateMockGoogleEvents(weekDates: Date[]): CalendarEvent[] {
  const mockEvents: CalendarEvent[] = [];

  weekDates.forEach((date, i) => {
    if (i % 2 === 0) {
      const day = date.toISOString().split("T")[0];
      mockEvents.push({
        id: 999 + i,
        title: "Google Calendar Event",
        day,
        start: "05:00",
        end: "05:15",
        status: "google-calendar",
        source: "google",
      });

      mockEvents.push({
        id: 999 + i + 100,
        title: "Google Calendar Event",
        day,
        start: "10:00",
        end: "10:15",
        status: "google-calendar",
        source: "google",
      });
    }
  });

  return mockEvents;
}
