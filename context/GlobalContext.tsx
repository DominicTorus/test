"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Theme, Language, Direction, GlobalProps, Branding } from "@/types/global";

interface GlobalContextType extends GlobalProps {
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setDirection: (direction: Direction) => void;
  setBranding: (branding: Branding) => void;
  updateBranding: (updates: Partial<Branding>) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("English");
  const [direction, setDirection] = useState<Direction>("LTR");
  const [branding, setBrandingState] = useState<Branding>({
    fontSize: "Medium",
    brandColor: "#00BFFF",
    selectionColor: "#00BFFF",
    hoverColor: "#00BFFF",
    borderRadius: "s",
  });

  const setBranding = (newBranding: Branding) => {
    setBrandingState(newBranding);
  };

  const updateBranding = (updates: Partial<Branding>) => {
    setBrandingState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        language,
        direction,
        branding,
        setTheme,
        setLanguage,
        setDirection,
        setBranding,
        updateBranding,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
