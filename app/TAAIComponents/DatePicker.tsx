"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { ComponentSize, HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface DatePickerProps {
  readOnly?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  readOnly = false,
  disabled = false,
  size = "m",
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  value = "",
  onChange,
  className = "",
}) => {
  const { theme, direction, branding } = useGlobal();
  const [dateValue, setDateValue] = useState(value);

  const handleChange = (newValue: string) => {
    setDateValue(newValue);
    onChange?.(newValue);
  };

  const getSizeClasses = () => {
    const fontSize = getFontSizeClass(branding.fontSize);
    switch (size) {
      case "s":
        return `px-3 py-1.5 ${fontSize === "text-xl" ? "text-base" : fontSize === "text-lg" ? "text-sm" : "text-xs"}`;
      case "m":
        return `px-4 py-2 ${fontSize}`;
      case "l":
        return `px-5 py-2.5 ${fontSize === "text-sm" ? "text-base" : fontSize === "text-base" ? "text-lg" : "text-xl"}`;
      case "xl":
        return `px-6 py-3 ${fontSize === "text-sm" ? "text-lg" : fontSize === "text-base" ? "text-xl" : "text-2xl"}`;
      default:
        return `px-4 py-2 ${fontSize}`;
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const datePickerElement = (
    <input
      type="date"
      value={dateValue}
      onChange={(e) => handleChange(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      className={`
        ${getSizeClasses()}
        ${getBorderRadiusClass(branding.borderRadius)}
        border-2
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${readOnly ? "cursor-default" : ""}
        ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}
        transition-colors
        focus:outline-none
        ${className}
      `}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = branding.brandColor;
        e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}20`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = isDark ? "#4B5563" : "#D1D5DB";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );

  const renderWithHeader = (element: React.ReactNode) => {
    if (!headerText) return element;

    const headerClasses = `${getFontSizeClass(branding.fontSize)} font-semibold mb-2 ${
      isDark ? "text-gray-300" : "text-gray-700"
    }`;

    switch (headerPosition) {
      case "top":
        return (
          <div className="flex flex-col">
            <div className={headerClasses}>{headerText}</div>
            {element}
          </div>
        );
      case "bottom":
        return (
          <div className="flex flex-col">
            {element}
            <div className={`${headerClasses} mt-2 mb-0`}>{headerText}</div>
          </div>
        );
      case "left":
        return (
          <div className="flex items-center gap-4">
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {headerText}
            </div>
            {element}
          </div>
        );
      case "right":
        return (
          <div className="flex items-center gap-4">
            {element}
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {headerText}
            </div>
          </div>
        );
    }
  };

  const finalElement = renderWithHeader(datePickerElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
