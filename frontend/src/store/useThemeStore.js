import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("lingobuddy-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("lingobuddy-theme", theme);
    set({ theme });
  },
}));