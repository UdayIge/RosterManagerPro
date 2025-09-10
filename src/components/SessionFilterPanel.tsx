"use client";
import { AppDispatch, RootState } from "@/store";
import { resetFilters, setFilter } from "@/store/providerSlice";
import Dropdown from "@/ui/Dropdown";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SessionFilterPanel = () => {
  const providers = useSelector((state: RootState) => state.provider.items);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const types = [
    ...new Set(
      providers.map(
        (p) =>
          p.provider_usertype.charAt(0).toUpperCase() +
          p.provider_usertype.slice(1)
      )
    ),
  ];
  const services = [
    ...new Set(
      providers.flatMap((p) => {
        const avail = p.availabilities?.[0];
        if (!avail) return [];
        const s: string[] = [];
        if (avail.online_slots?.length) s.push("Online");
        if (avail.offline_slots?.length) s.push("Offline");
        if (avail.both_slots?.length) s.push("Online + Offline");
        if (avail.online_booked_slots?.length) s.push("Online Booked");
        if (avail.offline_booked_slots?.length) s.push("Offline Booked");
        if (avail.blocked_slots?.length) s.push("Blocked");
        return s;
      })
    ),
  ];
  const centers = [...new Set(providers.map((p) => p.clinic_details?.name))];

  const handleReset = () => {
    setSelectedType(null);
    setSelectedService(null);
    setSelectedCenter(null);
    dispatch(resetFilters());
  };

  const hasSelectedFilters = !!(
    selectedType ||
    selectedService ||
    selectedCenter
  );

  const handleApply = () => {
    dispatch(
      setFilter({
        type: selectedType ?? "All",
        service: selectedService ?? "All",
        center: selectedCenter ?? "All",
      })
    );
  };

  return (
    <div>
      <div>
        <Dropdown
          options={types}
          value={selectedType}
          onChange={setSelectedType}
        />
        <Dropdown
          options={services}
          value={selectedService}
          onChange={setSelectedService}
        />
        <Dropdown
          options={centers}
          value={selectedCenter}
          onChange={setSelectedCenter}
        />
      </div>
      <div className="flex gap-2">
        {hasSelectedFilters ? (
          <>
            <button
              className="bg-[#FFF5F2] text-[#E76943] rounded-lg py-2 px-6"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="bg-[#E76943] text-white h-10 rounded-lg py-2 px-6"
              onClick={handleApply}
            >
              Apply
            </button>
          </>
        ) : (
          <button className="bg-[#BDBDBD] text-white h-10 rounded-lg py-2 px-6">
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionFilterPanel;
