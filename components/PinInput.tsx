"use client";

import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { ComponentSize, HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface PinInputProps {
  length: number;
  size: ComponentSize;
  disabled?: boolean;
  placeholder?: string;
  mask?: boolean;
  value?: string;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  className?: string;
}

export const PinInput: React.FC<PinInputProps> = ({
  length,
  size,
  disabled = false,
  placeholder = "",
  mask = false,
  value = "",
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  onChange=() => {},
  onBlur=() => {},
  className = "",
}) => {
  const { theme, direction, branding } = useGlobal();
  const [values, setValues] = useState<string[]>(() => {
    if (value) {
      const valueArray = value.split("").slice(0, length);
      return [...valueArray, ...Array(Math.max(0, length - valueArray.length)).fill("")];
    }
    return Array(length).fill("");
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync with value prop changes
  useEffect(() => {
    if (value !== undefined) {
      const valueArray = value.split("").slice(0, length);
      const newValues = [...valueArray, ...Array(Math.max(0, length - valueArray.length)).fill("")];
      setValues(newValues);
    }
  }, [value, length]);

  const handleChange = (index: number, value: string) => {
    // Only allow numeric input
    if (value && !/^\d$/.test(value)) {
      return;
    }

    if (value.length > 1) {
      value = value[value.length - 1];
    }

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange(newValues);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getSizeClasses = () => {
    const fontSize = getFontSizeClass(branding.fontSize);
    switch (size) {
      case "xs":
        return `w-8 h-8 ${fontSize === "text-xl" ? "text-sm" : fontSize === "text-lg" ? "text-xs" : "text-xs"}`;
      case "s":
        return `w-10 h-10 ${fontSize === "text-xl" ? "text-base" : fontSize === "text-lg" ? "text-sm" : "text-xs"}`;
      case "m":
        return `w-12 h-12 ${fontSize}`;
      case "l":
        return `w-14 h-14 ${fontSize === "text-sm" ? "text-base" : fontSize === "text-base" ? "text-lg" : "text-xl"}`;
      case "xl":
        return `w-16 h-16 ${fontSize === "text-sm" ? "text-lg" : fontSize === "text-base" ? "text-xl" : "text-2xl"}`;
      default:
        return `w-12 h-12 ${fontSize}`;
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const pinInputElement = (
    <div className={`flex gap-2 ${direction === "RTL" ? "flex-row-reverse" : ""} ${className}`}>
      {Array.from({length},(_,i)=>i).map((index) => (
        <input
          key={index}
          ref={(el:any) => (inputRefs.current[index] = el)}
          type={mask ? "password" : "text"}
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          // onKeyDown={(e) => handleKeyDown(index, e)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            ${getSizeClasses()}
            ${getBorderRadiusClass(branding.borderRadius)}
            border-2
            text-center
            font-semibold
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}
            transition-colors
            focus:outline-none
          `}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = branding.brandColor;
            e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}20`;
          }}
          onBlur={onBlur}
        />
      ))}
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

  const finalElement = renderWithHeader(pinInputElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
