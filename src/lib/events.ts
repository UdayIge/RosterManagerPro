import { ProviderEntity, SlotStatus } from "./types";

export interface CalendarEvent {
  id: number;
  title: string;
  day: string;
  start: string;
  end: string;
  status:
    SlotStatus;
source?: "provider" | "google";
}

export function generateEventsFromProviders(
  providers: ProviderEntity[],
  dateStr: string
): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  const getEndTime = (start: string): string => {
    const [h, m] = start.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m + 15);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  for (const provider of providers) {
    const { name, id, availabilities } = provider;
    const avail = availabilities?.[0];
    if (!avail) continue;

    const pushSlots = (
      slotType: keyof typeof avail,
      status: CalendarEvent["status"]
    ) => {
      const slots = avail[slotType];
      if (!slots) return;

      for (const slotObj of slots) {
        if (typeof slotObj === "string") {
          events.push({
            id,
            title: `${name} (${status})`,
            day: dateStr,
            start: slotObj,
            end: getEndTime(slotObj),
            status,
            source: "provider",
          });
        } else if (typeof slotObj === "object" && slotObj.slot) {
          events.push({
            id,
            title: `Blocked - ${slotObj.reason || "N/A"}`,
            day: dateStr,
            start: slotObj.slot,
            end: getEndTime(slotObj.slot),
            status: "blocked",
            source: "provider",
          });
        }
      }
    };

    pushSlots("online_slots", "online");
    pushSlots("offline_slots", "offline");
    pushSlots("both_slots", "online + offline");
    pushSlots("online_booked_slots", "online booked");
    pushSlots("offline_booked_slots", "offline booked");
    pushSlots("blocked_slots", "blocked");
  }

  return events;
}
