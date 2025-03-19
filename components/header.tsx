"use client";
import { useLayoutEffect, useState } from "react";
import { HeaderLanguage } from "./base/HeaderLanguage";
import { SearchBar } from "@/components/SearchBar";
import { SwitchTheme } from "./base/SwitchTheme";

export const BaseHeader = () => {
  const [isTop, setIsTop] = useState(true);

  useLayoutEffect(() => {
    const headerShadow = () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    headerShadow();
    window.addEventListener("scroll", headerShadow);
    return () => window.removeEventListener("scroll", headerShadow);
  }, []);

  return (
    <header
      className={`fixed top-0 flex w-full h-20 px-3 bg-white dark:bg-BackgroundDark z-50 ${
        isTop ? "shadow-none" : "shadow-md"
      }`}
    >
      <div className="relative flex flex-row items-center justify-end w-full gap-5 mx-auto max-w-7xl ">
        <SearchBar />
        <div className="flex items-center gap-5">
          <SwitchTheme />
          <HeaderLanguage />
        </div>
      </div>
    </header>
  );
};
