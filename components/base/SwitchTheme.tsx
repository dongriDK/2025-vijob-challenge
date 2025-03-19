"use client";
import { useTheme } from "@/app/ThemeProvider";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

export const SwitchTheme = () => {
  const { themeMode, switchTheme } = useTheme();

  return (
    <button
      id="theme-switch"
      aria-label="Toggle Dark Mode"
      className="flex items-center w-10 h-5 mr-2 transition duration-300 rounded-full shadow sm:mr-0 bg-PrimaryLight dark:bg-PrimaryDark focus:outline-none"
      onClick={() => switchTheme(themeMode === "dark" ? "light" : "dark")}
    >
      {themeMode === "dark" ? (
        <div className="relative w-6 h-6 p-1 text-white transition duration-500 transform -translate-x-2 rounded-full bg-Primary">
          <Sun className="m-auto size-4" />
        </div>
      ) : (
        <div className="relative w-6 h-6 p-1 text-white transition duration-500 transform translate-x-full rounded-full bg-Primary">
          <Moon className="size-4" />
        </div>
      )}
    </button>
  );
};
