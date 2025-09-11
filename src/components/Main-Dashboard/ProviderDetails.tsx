import Image from "next/image";
import React from "react";

interface ProviderDetailsProps {
  imageUrl?: string;
  name: string;
  offlineSlots: number;
  onlineSlots: number;
  setSelectedProvider: (name: string) => void;
  setActiveView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
}
const ProviderDetails = ({
  imageUrl,
  name,
  offlineSlots,
  onlineSlots,
  setSelectedProvider,
  setActiveView,
}: ProviderDetailsProps) => {
  const handleViewCalendar = () => {
    setSelectedProvider(name);
    setActiveView("calendar");
  };
  return (
    <div className="mt-6 flex flex-col gap-4 w-40 h-48 mr-4">
      <Image
        src={imageUrl || "https://randomuser.me/api"}
        alt="Provider Image"
        width={64}
        height={64}
        className="rounded-full"
      />
      <h5 className="font-semibold text-[#607447] text-decoration-line: underline">
        {name}
      </h5>
      <div className="flex gap-2">
        <div className="flex gap-2 bg-[#F7F7F7] text-[#4C4C4C] rounded-lg px-2 py-1 text-sm">
          <Image
            src="/svg/offline-slot.svg"
            alt="Offline slot"
            width={16}
            height={16}
          />
          <h5 className="font-semibold">{offlineSlots}</h5>
        </div>
        <div className="flex gap-2 bg-[#F7F7F7] text-[#4C4C4C] rounded-lg px-2 py-1 text-sm">
          <Image
            src="/svg/online-slot.svg"
            alt="Online slot"
            width={16}
            height={16}
          />
          <h5 className="font-semibold">{onlineSlots}</h5>
        </div>
      </div>
      <div className="flex gap-1 cursor-pointer">
        <h5
          className="text-[#E76943] text-decoration-line: underline"
          onClick={handleViewCalendar}
        >
          View Calendar
        </h5>
        <Image
          src="/svg/orange-right-spectre.svg"
          alt="Arrow"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default ProviderDetails;
