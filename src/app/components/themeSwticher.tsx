import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusBar } from 'expo-status-bar';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const Icon = useMemo(() => theme === "light" ? Sun : Moon, [theme]);

  return (
    <div className="p-4">
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <Icon className={`text-${theme === "light" ? "black" : "white"} cursor-pointer`} size={24} onClick={toggleTheme} />
    </div>
  );
}