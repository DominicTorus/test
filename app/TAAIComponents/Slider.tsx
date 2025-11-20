"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass } from "@/utils/branding";

type SliderSize = "s" | "m" | "l";
type ValidationState = "valid" | "invalid";
type TooltipDisplay = "on" | "off" | "auto";

interface SliderProps {
  disabled?: boolean;
  validationState?: ValidationState;
  tooltipDisplay?: TooltipDisplay;
  size?: SliderSize;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  disabled = false,
  validationState = "valid",
  tooltipDisplay = "auto",
  size = "m",
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  value = 50,
  onChange,
  className = "",
}) => {
  const { theme, branding } = useGlobal();
  const [sliderValue, setSliderValue] = useState(value);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    onChange?.(newValue);
  };

  const getSizeClass = () => {
    switch (size) {
      case "s":
        return "h-1";
      case "m":
        return "h-2";
      case "l":
        return "h-3";
      default:
        return "h-2";
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const sliderElement = (
    <div className={`w-full relative ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          w-full
          ${getSizeClass()}
          appearance-none
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isDark ? "bg-gray-700" : "bg-gray-300"}
          rounded-full
          transition-all
        `}
        style={{
          accentColor: validationState === "invalid" ? "#EF4444" : branding.brandColor,
        }}
      />

      {(showTooltip || tooltipDisplay === "on") && (
        <div
          className={`
            absolute
            -top-8
            px-2 py-1
            rounded
            text-xs
            ${isDark ? "bg-gray-900 text-white" : "bg-gray-800 text-white"}
          `}
          style={{
            left: `${((sliderValue - min) / (max - min)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {sliderValue}
        </div>
      )}

      {marks && (
        <div className="flex justify-between mt-2">
          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>{min}</span>
          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>{max}</span>
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
          <div className="flex items-center gap-4 w-full">
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {headerText}
            </div>
            <div className="flex-1">{element}</div>
          </div>
        );
      case "right":
        return (
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1">{element}</div>
            <div className={`${headerClasses} mb-0 whitespace-nowrap`}>
              {headerText}
            </div>
          </div>
        );
    }
  };

  const finalElement = renderWithHeader(sliderElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
