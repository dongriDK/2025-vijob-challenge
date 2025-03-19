"use client";
import { useOnClickOutside } from "@/util/hooks/useOnClickOutside";
import { ReactNode, RefObject, useRef, useState } from "react";

type DropdownProps<T> = {
  options: T[];
  trigger: ReactNode;
  triggerClassName?: string;
  items: (option: T) => ReactNode;
  itemsClassName?: string;
  align?: "left" | "right";
};

export const Dropdown = <T,>(props: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside({
    ref: dropdownRef as RefObject<HTMLElement>,
    handler: () => setIsOpen(false),
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`cursor-pointer flex px-3 py-2 rounded-lg items-center hover:bg-Primary/10 transition-colors ${props.triggerClassName}`}
      >
        {props.trigger}
      </div>
      <div
        className={`absolute top-[calc(80%)] -m-2 p-2 transition-all duration-300 
          ${props.align === "left" ? "left-0" : "right-0"}
          ${
            isOpen
              ? "visible opacity-100 translate-y-5"
              : "invisible opacity-0 -translate-y-3"
          } w-36 z-30`}
      >
        <div
          className={`flex flex-col *:text-left border border-SubText dark:border-none dark:text-Primary py-2 px-1 rounded-md *:p-1 shadow *:transition-colors bg-white dark:bg-PrimaryDark *:cursor-pointer ${props.itemsClassName}`}
        >
          {props.options.map((option) => props.items(option))}
        </div>
      </div>
    </div>
  );
};
