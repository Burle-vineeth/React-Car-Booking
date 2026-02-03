import { useNavigate } from "react-router-dom";
import { LocalStorageKeys, UIRoutes } from "../../utils";
import Button from "../../shared/components/Button";
import ToggleButton from "../../shared/components/ToggleButton";
import { Theme, useTheme } from "../context/ThemeContext";
import { useState } from "react";

const theme = localStorage.getItem(LocalStorageKeys.THEME) ?? Theme.light;

function Header() {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState<string>(theme);
  const themeContext = useTheme();

  const navigateToHome = () => {
    navigate(UIRoutes.ROOT);
  };

  const changeTheme = () => {
    const newTheme = themeMode === Theme.light ? Theme.dark : Theme.light;
    setThemeMode(newTheme);
    localStorage.setItem(LocalStorageKeys.THEME, newTheme);
    themeContext.setTheme(newTheme);
  };

  return (
    <header className="w-full bg-(--bg) shadow-md px-6 py-4 flex justify-between items-center">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={navigateToHome}
      >
        <img
          src="/vite.svg"
          alt="App Logo"
          className="w-10 h-10 object-contain"
        />
        <span className="text-xl font-bold text-(--text)">Car Booking</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-(--text) hover:text-(--primary) cursor-pointer">
          Book a Ride
        </button>
        <button className="text-(--text) hover:text-(--primary) cursor-pointer">
          My Rides
        </button>

        <ToggleButton
          checked={themeMode === Theme.dark}
          onChange={changeTheme}
          label="Mode"
        />

        <Button label="Login" />
      </div>
    </header>
  );
}

export default Header;
