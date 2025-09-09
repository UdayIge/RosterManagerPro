"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
interface DropdownProps {
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
}
const Dropdown = ({ options, value, onChange, className }: DropdownProps) => {
  const [query, setQuery] = useState(value ?? "");
  const [filtered, setFiltered] = useState<string[]>(options);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFiltered(options);
    setQuery(value ?? "");
  }, [options, value]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setFiltered(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowDropdown(true);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setQuery(option);
    setShowDropdown(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative w-64 flex flex-col mb-4 ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className="flex-1 w-73 p-2 h-10 max-w-100 rounded-lg border border-[var(--border-primary)]"
        placeholder="Enter Text"
      />

      <Image
        src="/svg/dropdown.svg"
        alt="Dropdown Icon"
        width={24}
        height={24}
        onClick={() => setShowDropdown(true)}
        className="absolute left-64 top-2 w-6 h-6 cursor-pointer"
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute z-10 w-full p-1 mt-10 max-h-60 overflow-y-auto border border-[var(--border-primary)] bg-white">
          {filtered.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 hover:bg-[var(--highlight-primary)]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
