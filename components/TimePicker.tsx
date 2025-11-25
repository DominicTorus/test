"use client";

import React, { useState, useEffect } from "react";
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
  settings?: TimeSetting;
  label?: string;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  onChange?: (time: string) => void;
  value?: string;
  className?: string;
}

interface TimeComponents {
  hours: string;
  minutes: string;
  seconds: string;
  period: "AM" | "PM";
}

export const TimePicker: React.FC<TimePickerProps> = ({
  disabled = false,
  readOnly = false,
  size = "m",
  timeType = "normal",
  settings = "hh-mm",
  label,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  onChange,
  value = "",
  className = "",
}) => {
  const { theme, direction, branding } = useGlobal();

  const parseTimeValue = (val: string): TimeComponents => {
    if (!val) {
      return { hours: "", minutes: "", seconds: "", period: "AM" };
    }

    const parts = val.split(":");
    let hours = parseInt(parts[0] || "0");
    const minutes = parts[1] || "";
    const seconds = parts[2] || "";

    let period: "AM" | "PM" = "AM";
    let displayHours = hours;

    if (timeType === "normal") {
      period = hours >= 12 ? "PM" : "AM";
      displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    }

    return {
      hours: displayHours.toString().padStart(2, "0"),
      minutes: minutes.padStart(2, "0"),
      seconds: seconds.padStart(2, "0"),
      period,
    };
  };

  const [timeComponents, setTimeComponents] = useState<TimeComponents>(parseTimeValue(value));

  useEffect(() => {
    setTimeComponents(parseTimeValue(value));
  }, [value, timeType]);

  const formatTimeOutput = (components: TimeComponents): string => {
    let hours = parseInt(components.hours || "0");
    const minutes = components.minutes.padStart(2, "0");
    const seconds = components.seconds.padStart(2, "0");

    if (timeType === "normal") {
      if (components.period === "PM" && hours !== 12) {
        hours += 12;
      } else if (components.period === "AM" && hours === 12) {
        hours = 0;
      }
    }

    const hoursStr = hours.toString().padStart(2, "0");

    if (settings === "hh-mm-sec") {
      return `${hoursStr}:${minutes}:${seconds}`;
    }
    return `${hoursStr}:${minutes}`;
  };

  const updateTime = (newComponents: TimeComponents) => {
    setTimeComponents(newComponents);
    const formattedTime = formatTimeOutput(newComponents);
    onChange?.(formattedTime);
  };

  const handleSelectChange = (field: keyof TimeComponents, val: string) => {
    updateTime({ ...timeComponents, [field]: val });
  };

  const generateHourOptions = () => {
    const options = [];
    if (timeType === "railway") {
      for (let i = 0; i <= 23; i++) {
        const value = i.toString().padStart(2, "0");
        options.push(
          <option key={i} value={value}>
            {value}
          </option>
        );
      }
    } else {
      for (let i = 1; i <= 12; i++) {
        const value = i.toString().padStart(2, "0");
        options.push(
          <option key={i} value={value}>
            {value}
          </option>
        );
      }
    }
    return options;
  };

  const generateMinuteSecondOptions = () => {
    const options = [];
    for (let i = 0; i <= 59; i++) {
      const value = i.toString().padStart(2, "0");
      options.push(
        <option key={i} value={value}>
          {value}
        </option>
      );
    }
    return options;
  };

  const getSizeClasses = () => {
    const fontSize = getFontSizeClass(branding.fontSize);
    switch (size) {
      case "s":
        return {
          input: `px-2 py-1 ${fontSize === "text-xl" ? "text-base" : fontSize === "text-lg" ? "text-sm" : "text-xs"}`,
          gap: "gap-1",
        };
      case "m":
        return {
          input: `px-3 py-1.5 ${fontSize}`,
          gap: "gap-2",
        };
      case "l":
        return {
          input: `px-4 py-2 ${fontSize === "text-sm" ? "text-base" : fontSize === "text-base" ? "text-lg" : "text-xl"}`,
          gap: "gap-2",
        };
      default:
        return {
          input: `px-3 py-1.5 ${fontSize}`,
          gap: "gap-2",
        };
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";
  const sizeClasses = getSizeClasses();

  const selectClassName = `
    ${sizeClasses.input}
    ${getBorderRadiusClass(branding.borderRadius)}
    border-2
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${readOnly ? "cursor-default pointer-events-none" : ""}
    ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}
    transition-colors
    focus:outline-none
    text-center
  `;

  const timePickerElement = (
    <div className={`flex items-center ${sizeClasses.gap} ${className}`}>
      <select
        value={timeComponents.hours}
        onChange={(e) => handleSelectChange("hours", e.target.value)}
        disabled={disabled}
        className={selectClassName}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = branding.brandColor;
          e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}20`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = isDark ? "#4B5563" : "#D1D5DB";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="">HH</option>
        {generateHourOptions()}
      </select>
      <span className={isDark ? "text-gray-300" : "text-gray-700"}>:</span>
      <select
        value={timeComponents.minutes}
        onChange={(e) => handleSelectChange("minutes", e.target.value)}
        disabled={disabled}
        className={selectClassName}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = branding.brandColor;
          e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}20`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = isDark ? "#4B5563" : "#D1D5DB";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="">MM</option>
        {generateMinuteSecondOptions()}
      </select>
      {settings === "hh-mm-sec" && (
        <>
          <span className={isDark ? "text-gray-300" : "text-gray-700"}>:</span>
          <select
            value={timeComponents.seconds}
            onChange={(e) => handleSelectChange("seconds", e.target.value)}
            disabled={disabled}
            className={selectClassName}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = branding.brandColor;
              e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}20`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = isDark ? "#4B5563" : "#D1D5DB";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <option value="">SS</option>
            {generateMinuteSecondOptions()}
          </select>
        </>
      )}
      <select
        value={timeComponents.period}
        onChange={(e) => handleSelectChange("period", e.target.value)}
        disabled={disabled}
        className={selectClassName}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = branding.brandColor;
          e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}20`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = isDark ? "#4B5563" : "#D1D5DB";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );

  const renderWithHeader = (element: React.ReactNode) => {
    const displayLabel = label || headerText;
    if (!displayLabel) return element;

    const headerClasses = `${getFontSizeClass(branding.fontSize)} font-semibold mb-2 ${
      isDark ? "text-gray-300" : "text-gray-700"
    }`;

    switch (headerPosition) {
      case "top":
        return (
          <div className="flex flex-col">
            <div className={headerClasses}>{displayLabel}</div>
            {element}
          </div>
        );
      case "bottom":
        return (
          <div className="flex flex-col">
            {element}
            <div className={`${headerClasses} mt-2 mb-0`}>{displayLabel}</div>
          </div>
        );
      case "left":
        return (
          <div className="flex items-center gap-4">
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {displayLabel}
            </div>
            {element}
          </div>
        );
      case "right":
        return (
          <div className="flex items-center gap-4">
            {element}
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {displayLabel}
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
