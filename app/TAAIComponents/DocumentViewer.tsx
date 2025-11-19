"use client";

import React from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface DocumentViewerProps {
  height: string;
  width?: string;
  enableEncryption?: boolean;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  url?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  height,
  width = "100%",
  enableEncryption = false,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  url,
}) => {
  const { theme, branding } = useGlobal();

  const isDark = theme === "dark" || theme === "dark-hc";

  const viewerElement = (
    <div className="w-full" style={{ width }}>
      {url ? (
        <iframe
          src={url}
          className={`
            ${getBorderRadiusClass(branding.borderRadius)}
            border-2
            ${isDark ? "border-gray-600" : "border-gray-300"}
          `}
          style={{ width: "100%", height }}
          title="Document Viewer"
        />
      ) : (
        <div
          className={`
            ${getBorderRadiusClass(branding.borderRadius)}
            border-2
            ${isDark ? "bg-gray-800 border-gray-600 text-gray-300" : "bg-gray-50 border-gray-300 text-gray-600"}
            flex items-center justify-center
            ${getFontSizeClass(branding.fontSize)}
          `}
          style={{ width: "100%", height }}
        >
          <div className="text-center">
            <p>No document to display</p>
            {enableEncryption && (
              <p className="text-sm mt-2">Encryption: Enabled</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderWithHeader = (element: React.ReactNode) => {
    if (!headerText) return element;

    const headerClasses = `${getFontSizeClass(branding.fontSize)} font-semibold mb-2 ${
      isDark ? "text-gray-300" : "text-gray-700"
    }`;

    switch (headerPosition) {
      case "top":
        return (
          <div className="flex flex-col w-full">
            <div className={headerClasses}>{headerText}</div>
            {element}
          </div>
        );
      case "bottom":
        return (
          <div className="flex flex-col w-full">
            {element}
            <div className={`${headerClasses} mt-2 mb-0`}>{headerText}</div>
          </div>
        );
      case "left":
        return (
          <div className="flex items-start gap-4 w-full">
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {headerText}
            </div>
            <div className="flex-1">{element}</div>
          </div>
        );
      case "right":
        return (
          <div className="flex items-start gap-4 w-full">
            <div className="flex-1">{element}</div>
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {headerText}
            </div>
          </div>
        );
    }
  };

  const finalElement = renderWithHeader(viewerElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
