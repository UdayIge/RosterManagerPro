import { CalendarEvent } from "./events";


export function generateMockGoogleEvents(weekDates: Date[]): CalendarEvent[] {
  const mockEvents: CalendarEvent[] = [];

  // Candidate times for mock events (15-minute duration)
  const candidateTimes = ["05:00", "08:30", "10:00", "13:15", "16:00"]; 

  weekDates.forEach((date, i) => {
    const day = date.toISOString().split("T")[0];

    // Randomly decide how many events to place for this day (0..2)
    const count = Math.floor(Math.random() * 3); // 0,1,2

    // Pick `count` unique times from candidateTimes
    const chosen: string[] = [];
    let attempts = 0;
    while (chosen.length < count && attempts < 10) {
      attempts++;
      const t = candidateTimes[Math.floor(Math.random() * candidateTimes.length)];
      if (!chosen.includes(t)) chosen.push(t);
    }

    chosen.forEach((start, j) => {
      mockEvents.push({
        id: 900 + i * 10 + j,
        title: "Google Calendar Event",
        day,
        start,
        end: (() => {
          const [h, m] = start.split(":").map(Number);
          const d = new Date();
          d.setHours(h, m + 15);
          return `${String(d.getHours()).padStart(2, "0")}:${String(
            d.getMinutes()
          ).padStart(2, "0")}`;
        })(),
        status: "google-calendar",
        source: "google",
      });
    });
  });

  return mockEvents;
}
