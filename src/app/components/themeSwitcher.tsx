import { Moon, Sun } from 'lucide-react';
import { useMemo } from 'react';
import useTheme from '@/app/hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme(); // hook

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  };

  const Icon = useMemo(() => (theme === 'light' ? Sun : Moon), [theme]);
  // useMemo so no need to recreate the Icon component on every render

  return (
    <div className="p-4">
      {theme && (
        <Icon
          className={`text-${theme === 'light' ? 'black' : 'white'} cursor-pointer`}
          size={24}
          onClick={toggleTheme}
        />
      )}
    </div>
  );
}