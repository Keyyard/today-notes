import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ThemeSwitcher() {
  // Check localStorage for a saved theme or default to light
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    const metaAppleStatusBarStyle = document.querySelector("meta[name=apple-mobile-web-app-status-bar-style]");

    // Dynamically change the meta theme color and Apple status bar style
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "light" ? "#ffffff" : "#000000");
    }

    if (metaAppleStatusBarStyle) {
      metaAppleStatusBarStyle.setAttribute("content", theme === "light" ? "default" : "black-translucent");
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const Icon = useMemo(() => theme === "light" ? Sun : Moon, [theme]);

  return (
    <div className="p-4">
      <Icon
        className={`text-${theme === "light" ? "black" : "white"} cursor-pointer`}
        size={24}
        onClick={toggleTheme}
      />
    </div>
  );
}
