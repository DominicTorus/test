"use client";

import React, { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = "",
  fullHeight = true,
}) => {
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();

  return (
    <div
      className={`w-full ${fullHeight ? 'min-h-screen' : ''} ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      } ${className}`}
      style={{
        backgroundColor: bgStyle,
        color: textStyle,
        ...(fullHeight && { minHeight: "100vh" }),
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
        })
      }}
    >
      {children}
    </div>
  );
};
