"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

type TimePickerSize = "s" | "m" | "l";
type TimeType = "normal" | "railway";
type TimeSetting = "hh-mm" | "hh-mm-sec";

interface TimePickerProps {
  disabled?: boolean;
  readOnly?: boolean;
  size?: TimePickerSize;
  timeType?: TimeType;
  settingd?: TimeSetting;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  onChange?: (time: string) => void;
  value?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  disabled = false,
  readOnly = false,
  size = "m",
  timeType = "normal",
  settingd = "hh-mm",
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  onChange,
  value = "",
}) => {
  const { theme, direction, branding } = useGlobal();
  const [timeValue, setTimeValue] = useState(value);

  const handleChange = (newValue: string) => {
    setTimeValue(newValue);
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
      default:
        return `px-4 py-2 ${fontSize}`;
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const timePickerElement = (
    <input
      type="time"
      value={timeValue}
      onChange={(e) => handleChange(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      step={settingd === "hh-mm-sec" ? "1" : undefined}
      className={`
        ${getSizeClasses()}
        ${getBorderRadiusClass(branding.borderRadius)}
        border-2
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${readOnly ? "cursor-default" : ""}
        ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}
        transition-colors
        focus:outline-none
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

  const finalElement = renderWithHeader(timePickerElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
