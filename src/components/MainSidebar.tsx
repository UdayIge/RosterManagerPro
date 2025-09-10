"use client";

import SearchInput from "./SearchInput";
import MainFilterPanel from "./MainFilterPanel";

const MainSidebar = () => {
  return (
    <div className="w-90 h-157 p-6 gap-4 border-r border-[var(--border-primary)] mt-0">
      <MainFilterPanel />
      <hr className="mt-4 w-73 border-[var(--border-primary)]" />
      <SearchInput />
      <h4 className="text-[#4C4C4C] bg-none text-sm mt-4">
        You can search up to 5 provider to view their availability specifically.
      </h4>
    </div>
  );
};

export default MainSidebar;
