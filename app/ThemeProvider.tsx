"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  themeMode: string;
  switchTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  switchTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<string | null>(null);

  const switchTheme = (theme: string) => {
    setThemeMode(theme);
    localStorage.setItem("themeMode", theme);
    document.documentElement.className = theme;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      setThemeMode(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      setThemeMode("light");
    }
  }, []);

  if (themeMode === null) {
    // 초기 테마 로드 전까지 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
