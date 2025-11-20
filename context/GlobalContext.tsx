"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Theme, Language, Direction, GlobalProps, Branding } from "@/types/global";
import { AxiosService } from "@/app/components/axiosService";
import { getCookie } from "@/app/components/cookieMgment";

interface GlobalContextType extends GlobalProps {
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setDirection: (direction: Direction) => void;
  setBranding: (branding: Branding) => void;
  updateBranding: (updates: Partial<Branding>) => void;
  isLoading: boolean;
}

const borderRadiusMap:any = {
  xs: '3px',
  s: '3px',
  m: '5px',
  l: '6px',
  xl: '8px',
};

const fontSizeMap:any = {
  Small: '13px',
  Medium: '15px',
  Large: '17px',
};

const languageMap:any = {
  Arabic: 'ar',
  French: 'fr',
  English: 'en',
  Tamil: 'ta',
  Russian: 'ru',
};

interface SetupKeyData {
  direction: string;
  layoutMode: string;
  navigationStyles: string;
  sidebarStyle: string;
  brandColor: string;
  hoverColor: string;
  selectionColor: string;
  menubarColor: string;
  topbarColor: string;
  borderRadius: keyof typeof borderRadiusMap;
  fontSize: keyof typeof fontSizeMap;
  language: keyof typeof languageMap;
  'page-bg-color': string;
  'group-bg-color': string;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setBranding = (newBranding: Branding) => {
    setBrandingState(newBranding);
  };

  const updateBranding = (updates: Partial<Branding>) => {
    setBrandingState((prev) => ({ ...prev, ...updates }));
  };

  // Fetch setup key data from API
  const fetchSetupKey = async () => {
    try {
      const token: string = getCookie('token');
      const encryptionFlagApp: boolean = true;
      const encryptionDpd: string = "CK:CT003:FNGK:AF:FNK:CDF-DPD:CATK:CG:AFGK:TG1:AFK:UpdatedMongodb:AFVK:v1";
      const encryptionMethod: string = "";

      let setUpKeyDto: any = {
        key: "CK:TGA:FNGK:SETUP:FNK:SF:CATK:CT003:AFGK:CG:AFK:TG1:AFVK:v1:appearance"
      };

      if (encryptionFlagApp) {
        setUpKeyDto["dpdKey"] = encryptionDpd;
        setUpKeyDto["method"] = encryptionMethod;
      }

      const response = await AxiosService.post("/UF/setUpKey", setUpKeyDto, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data: any = response?.data;

      if (data) {
        // Map and transform data
        const borderRadius = borderRadiusMap[data?.borderRadius] || '3px';
        const fontSize = fontSizeMap[data?.fontSize] || '13px';
        const languageCode = languageMap[data?.language] || 'en';

        // Set CSS custom properties
        document.documentElement.style.setProperty('--brand-color', data.brandColor);
        document.documentElement.style.setProperty('--selection-color', data.selectionColor);
        document.documentElement.style.setProperty('--hover-color', data.hoverColor);
        document.documentElement.style.setProperty('--border-radius', borderRadius);
        document.documentElement.style.setProperty('--g--font-size', fontSize);

        // Update context state
        setTheme(data.theme as Theme);
        setLanguage(data.language as Language);
        setDirection(data.direction as Direction);
        setBrandingState({
          fontSize: data.fontSize,
          brandColor: data.brandColor,
          selectionColor: data.selectionColor,
          hoverColor: data.hoverColor,
          borderRadius: data.borderRadius,
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching setup key:', error);
      setIsLoading(false);
    }
  };

  // Fetch setup key on mount
  useEffect(() => {
    fetchSetupKey();
  }, []);

  // Show loading screen while fetching
  if (isLoading) {
    return (
      <div className='flex w-[100vw] h-[100vh] bg-slate-200 justify-center items-center'>
        <img
          src="https://cdns3dfsdev.toruslowcode.com/torus/9.1/CT003/resources/splashImage/Material loading.gif"
          alt="loadingImage"
        />
      </div>
    );
  }

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
        isLoading,
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
