import { createContext, useContext, useState, useEffect } from "react";
import { LocalStorageKeys } from "../../utils";

enum Theme {
  light = "light",
  dark = "dark",
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem(LocalStorageKeys.THEME);

  const localStoreTheme: Theme | null =
    storedTheme && Object.values(Theme).includes(storedTheme as Theme)
      ? (storedTheme as Theme)
      : null;

  const [theme, setTheme] = useState<Theme>(
    localStoreTheme ? Theme[localStoreTheme] || Theme.light : Theme.light,
  );

  useEffect(() => {
    const root = document.documentElement;

    // Remove old classes
    root.classList.remove("theme-light");
    root.classList.remove("theme-dark");

    // Add new theme class
    root.classList.add(`theme-${theme}`);

    localStorage.setItem(LocalStorageKeys.THEME, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext)!;
