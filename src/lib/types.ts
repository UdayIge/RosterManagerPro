export type SlotStatus = "online" | "offline" | "online + offline" | "online booked" | "offline booked" | "blocked" | "available" | "google-calendar";
export type Slot = {start: string; end: string; status: SlotStatus};

export type ProviderEntity = {
  id: number;
  name: string;
  provider_usertype: string;
  is_inhouse: boolean;
  image: string;
  clinic_details: {
    id: number;
    name: string;
  };
  availabilities: {
    online_slots: string[];
    offline_slots: string[];
    both_slots: string[];
    online_booked_slots: string[];
    offline_booked_slots: string[];
    blocked_slots: { slot: string; reason: string }[];
  }[];
};

export type Filters = {
    service: string;
    type: string;
    center: string;
};