"use client";
import React from "react";
import ProviderDetails from "./ProviderDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SlotsGrid from "./SlotsGrid";
import Loader from "@/ui/Loader";

const ProviderSlots = ({
  setSelectedProvider,
  setActiveView,
}: {
  setSelectedProvider: (name: string) => void;
  setActiveView: React.Dispatch<React.SetStateAction<"list" | "calendar">>;
}) => {
  const providers = useSelector((state: RootState) => state.provider.items);
  const filters = useSelector((state: RootState) => state.provider.filters);
  const search = useSelector((state: RootState) => state.provider.search);

  const filteredProviders = providers.filter((provider) => {
    const avail = provider.availabilities?.[0];
    if (!avail) return false;

    const matchesType =
      filters.type === "All" ||
      provider.provider_usertype.toLowerCase() === filters.type.toLowerCase();

    const matchesCenter =
      filters.center === "All" ||
      provider.clinic_details?.name === filters.center;

    let matchesService = true;
    switch (filters.service) {
      case "Online":
        matchesService = avail.online_slots?.length > 0;
        break;
      case "Offline":
        matchesService = avail.offline_slots?.length > 0;
        break;
      case "Online + Offline":
        matchesService = avail.both_slots?.length > 0;
        break;
      case "Online Booked":
        matchesService = avail.online_booked_slots?.length > 0;
        break;
      case "Offline Booked":
        matchesService = avail.offline_booked_slots?.length > 0;
        break;
      case "Blocked":
        matchesService = avail.blocked_slots?.length > 0;
        break;
      case "All":
      default:
        matchesService = true;
    }
    const matchesSearch =
      !search || provider.name.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesCenter && matchesService && matchesSearch;
  });

  const limitedProviders =
    search.trim().length > 0
      ? filteredProviders.slice(0, 5)
      : filteredProviders;

  return (
    <>
      {limitedProviders.length > 0 ? (
        limitedProviders.map((provider, inx) => {
          const availability = provider.availabilities?.[0];
          const online = availability?.online_slots?.length ?? 0;
          const offline = availability?.offline_slots?.length ?? 0;
          return (
            <div key={inx} className="mt-6 flex">
              <ProviderDetails
                imageUrl={provider.image}
                name={provider.name}
                offlineSlots={offline}
                onlineSlots={online}
                setSelectedProvider={setSelectedProvider}
                setActiveView={setActiveView}
              />
              <SlotsGrid availability={availability} />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProviderSlots;
