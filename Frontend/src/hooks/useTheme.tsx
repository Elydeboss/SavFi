import { useState, useEffect } from "react";

const UseTheme = () => {
  const preferredTheme = () => {
    const activeTheme = localStorage.getItem("theme");
    if (activeTheme) return activeTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(preferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = localStorage.getItem("theme");

    const handleChange = (e: Event) => {
      const mediaEvent = e as MediaQueryListEvent;
      if (!stored) {
        setTheme(mediaEvent.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return { theme, setTheme };
};

export default UseTheme;
