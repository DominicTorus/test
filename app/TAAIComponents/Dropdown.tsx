"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { Icon } from "./Icon";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface DropdownProps {
  static?: boolean;
  dynamic?: boolean;
  multiselect?: boolean;
  isArray?: boolean;
  staticProps?: string[];
  dynamicProps?: string;
  width?: string;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  onChange?: (selected: string | string[]) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  static: isStatic = false,
  dynamic = false,
  multiselect = false,
  isArray = false,
  staticProps = [],
  dynamicProps,
  width = "100%",
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  onChange,
}) => {
  const { theme, direction, branding } = useGlobal();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const options = isStatic ? staticProps : dynamic ? [] : staticProps;

  const handleSelect = (value: string) => {
    if (multiselect) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSelectedValues([value]);
      onChange?.(value);
      setIsOpen(false);
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const dropdownElement = (
    <div className="relative w-full" style={{ width }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full
          px-4 py-2
          ${getBorderRadiusClass(branding.borderRadius)}
          ${getFontSizeClass(branding.fontSize)}
          border-2
          flex items-center justify-between
          ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}
          transition-colors
        `}
        style={{
          borderColor: isOpen ? branding.brandColor : undefined,
        }}
      >
        <span>
          {selectedValues.length > 0
            ? multiselect
              ? `${selectedValues.length} selected`
              : selectedValues[0]
            : "Select..."}
        </span>
        <Icon name={isOpen ? "chevron-up" : "chevron-down"} size={16} />
      </button>

      {isOpen && (
        <div
          className={`
            absolute
            w-full
            mt-1
            ${getBorderRadiusClass(branding.borderRadius)}
            border-2
            ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}
            shadow-lg
            max-h-60
            overflow-auto
            z-10
          `}
        >
          {options.map((option, index) => {
            const isSelected = selectedValues.includes(option);
            return (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`
                  px-4 py-2
                  cursor-pointer
                  ${getFontSizeClass(branding.fontSize)}
                  flex items-center justify-between
                  transition-colors
                  ${isSelected
                    ? `text-white`
                    : isDark ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                style={{
                  backgroundColor: isSelected ? branding.brandColor : undefined,
                }}
              >
                <span>{option}</span>
                {multiselect && isSelected && <Icon name="check" size={16} />}
              </div>
            );
          })}
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

  const finalElement = renderWithHeader(dropdownElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
