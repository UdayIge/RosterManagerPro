"use client";
import { AppDispatch, RootState } from "@/store";
import { setSearch } from "@/store/providerSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Image from "next/image";

const SearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.provider.search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="border border-[var(--border-primary)] rounded-lg p-2 w-73 h-10 mt-4">
      <div className="flex items-center gap-2 w-full">
        <Image src="/svg/search-icon.svg" alt="Search" width={24} height={24} />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Enter Text"
          className="focus:outline-none focus:ring-0 focus:border-transparent w-full"
        />
      </div>
    </div>
  );
};

export default SearchInput;
