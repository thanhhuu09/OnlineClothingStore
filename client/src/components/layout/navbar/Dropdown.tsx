import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

export default function Dropdown({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full"
      >
        <span className="uppercase">{label}</span>
        <CaretDown
          size={16}
          className={`transition-transform ? ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isDropdownOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        {items.map((item, index) => (
          <li className="px-2 py-1 normal-case" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
