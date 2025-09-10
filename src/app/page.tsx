"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { fetchProviders } from "@/store/providerSlice";
import { Header } from "@/components/Header";
import MainSidebar from "@/components/MainSidebar";
import MainSection from "@/components/MainSection";
import CalendarMainArea from "@/components/CalendarSection";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    if (activeView === "list") {
      setSelectedProvider(null);
    }
  }, [activeView]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <div className="w-full h-full flex flex-col sm:flex-row gap-8 sm:gap-16">
        <MainSidebar />
        {activeView === "list" ? (
          <MainSection
            setActiveView={setActiveView}
            setSelectedProvider={setSelectedProvider}
          />
        ) : (
          <CalendarMainArea selectedProvider={selectedProvider} />
        )}
      </div>
      <div className="text-center text-sm text-gray-500">
        &copy; 2024 Roster Management System
      </div>
    </div>
  );
}
