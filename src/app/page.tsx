"use client";
import { Header } from "@/components/Header";
import { AppDispatch } from "@/store";
import { fetchProviders } from "@/store/providerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MainSidebar from "@/components/MainSidebar";
import MainSection from "@/components/MainSection";
import CalendarSection from "@/components/CalendarSection";
import CalendarSidebar from "@/components/Calender/CalendarSidebar";

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

  const removeProvider = () => {
    setSelectedProvider(null);
  };

  return (
    <div className="font-sans grid">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <div className="flex">
        {activeView === "list" ? (
          <>
            <MainSidebar />
            <MainSection
              setActiveView={setActiveView}
              setSelectedProvider={setSelectedProvider}
            />
          </>
        ) : (
          <>
            <CalendarSidebar
              selectedProvider={selectedProvider}
              removeProvider={removeProvider}
            />
            <CalendarSection selectedProvider={selectedProvider} />
          </>
        )}
      </div>
    </div>
  );
}
