"use client";

import React from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Icon } from "./Icon";
import { Tooltip } from "./Tooltip";
import {
  ButtonView,
  ButtonSize,
  ButtonPin,
  IconDisplay,
  HeaderPosition,
  TooltipProps as TooltipPropsType,
} from "@/types/global";
import { GravityIcon } from "@/types/icons";
import { getFontSizeClass, getBorderRadiusClass, applyBrandColor, lightenColor, darkenColor } from "@/utils/branding";

interface ButtonProps {
  view: ButtonView;
  size: ButtonSize;
  icon?: GravityIcon;
  disabled?: boolean;
  pin?: ButtonPin;
  iconDisplay?: IconDisplay;
  isRecordLevel?: boolean;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  view,
  size,
  icon,
  disabled = false,
  pin = "round-round",
  iconDisplay = "start with icon",
  isRecordLevel = false,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  children,
  onClick,
}) => {
  const { theme, direction, branding } = useGlobal();
  console.log("🚀 ~ Button ~ branding:", branding)
  console.log("🚀 ~ Button ~ view:", view)

  const getSizeClasses = () => {
    const baseFontSize = getFontSizeClass(branding.fontSize);
    switch (size) {
      case "xs":
        return `px-2 py-1 ${baseFontSize === "text-xl" ? "text-base" : baseFontSize === "text-lg" ? "text-sm" : "text-xs"}`;
      case "s":
        return `px-3 py-1.5 ${baseFontSize === "text-xl" ? "text-lg" : baseFontSize === "text-lg" ? "text-base" : "text-sm"}`;
      case "m":
        return `px-4 py-2 ${baseFontSize}`;
      case "l":
        return `px-5 py-2.5 ${baseFontSize === "text-sm" ? "text-base" : baseFontSize === "text-base" ? "text-lg" : "text-xl"}`;
      case "xl":
        return `px-6 py-3 ${baseFontSize === "text-sm" ? "text-lg" : baseFontSize === "text-base" ? "text-xl" : "text-2xl"}`;
    }
  };

  const getViewClasses = () => {
    const isDark = theme === "dark" || theme === "dark-hc";
    const isHighContrast = theme === "light-hc" || theme === "dark-hc";

    switch (view) {
      case "normal":
        return isDark
          ? "text-white"
          : "text-white";
      case "action":
        return isDark
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-green-500 text-white hover:bg-green-600";
      case "outlined":
        return isDark
          ? "border-2 text-blue-400 hover:bg-blue-900"
          : "border-2 text-blue-500 hover:bg-blue-50";
      case "outlined-info":
        return isDark
          ? "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900"
          : "border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50";
      case "outlined-success":
        return isDark
          ? "border-2 border-green-500 text-green-400 hover:bg-green-900"
          : "border-2 border-green-500 text-green-600 hover:bg-green-50";
      case "outlined-warning":
        return isDark
          ? "border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-900"
          : "border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50";
      case "outlined-danger":
        return isDark
          ? "border-2 border-red-500 text-red-400 hover:bg-red-900"
          : "border-2 border-red-500 text-red-600 hover:bg-red-50";
      case "outlined-utility":
        return isDark
          ? "border-2 border-gray-500 text-gray-400 hover:bg-gray-800"
          : "border-2 border-gray-500 text-gray-600 hover:bg-gray-50";
      case "outlined-action":
        return isDark
          ? "border-2 border-green-500 text-green-400 hover:bg-green-900"
          : "border-2 border-green-500 text-green-600 hover:bg-green-50";
      case "raised":
        return isDark
          ? "bg-gray-700 text-white shadow-lg hover:bg-gray-600"
          : "bg-white text-gray-900 shadow-lg hover:bg-gray-100";
      case "flat":
        return isDark
          ? "bg-transparent hover:bg-gray-800"
          : "bg-transparent hover:bg-gray-100";
      case "flat-secondary":
        return isDark
          ? "bg-transparent text-gray-400 hover:bg-gray-800"
          : "bg-transparent text-gray-600 hover:bg-gray-100";
      case "flat-info":
        return isDark
          ? "bg-transparent text-cyan-400 hover:bg-cyan-900"
          : "bg-transparent text-cyan-600 hover:bg-cyan-50";
      case "flat-success":
        return isDark
          ? "bg-transparent text-green-400 hover:bg-green-900"
          : "bg-transparent text-green-600 hover:bg-green-50";
      case "flat-warning":
        return isDark
          ? "bg-transparent text-yellow-400 hover:bg-yellow-900"
          : "bg-transparent text-yellow-600 hover:bg-yellow-50";
      case "flat-danger":
        return isDark
          ? "bg-transparent text-red-400 hover:bg-red-900"
          : "bg-transparent text-red-600 hover:bg-red-50";
      case "flat-utility":
        return isDark
          ? "bg-transparent text-gray-400 hover:bg-gray-800"
          : "bg-transparent text-gray-600 hover:bg-gray-100";
      case "flat-action":
        return isDark
          ? "bg-transparent text-green-400 hover:bg-green-900"
          : "bg-transparent text-green-600 hover:bg-green-50";
      case "normal-contrast":
        return isHighContrast
          ? "bg-black text-white border-2 border-white hover:bg-gray-900"
          : isDark
          ? "bg-white text-black hover:bg-gray-200"
          : "bg-black text-white hover:bg-gray-800";
      case "outlined-contrast":
        return isHighContrast
          ? "border-4 border-black text-black hover:bg-gray-100"
          : isDark
          ? "border-2 border-white text-white hover:bg-gray-800"
          : "border-2 border-black text-black hover:bg-gray-100";
      case "flat-contrast":
        return isHighContrast
          ? "bg-transparent text-black hover:bg-gray-200 font-bold"
          : isDark
          ? "bg-transparent text-white hover:bg-gray-800"
          : "bg-transparent text-black hover:bg-gray-100";
    }
  };

  const getPinClasses = () => {
    const [left, right] = pin.split("-");
    const baseRadius = getBorderRadiusClass(branding.borderRadius);
    
    // Override based on pin style
    if (pin === "circle-circle") {
      return "rounded-full";
    }
    
    const leftRadius =
      left === "round"
        ? "rounded-l-full"
        : left === "brick"
        ? "rounded-l-none"
        : left === "circle"
        ? "rounded-l-full"
        : `rounded-l${baseRadius.replace("rounded", "")}`;
    const rightRadius =
      right === "round"
        ? "rounded-r-full"
        : right === "brick"
        ? "rounded-r-none"
        : right === "circle"
        ? "rounded-r-full"
        : `rounded-r${baseRadius.replace("rounded", "")}`;
    
    if (pin === "clear-clear") {
      return baseRadius;
    }
    
    return `${leftRadius} ${rightRadius}`;
  };

  const getButtonStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    // Apply brand color for normal and flat views
    if (view === "normal") {
      styles.backgroundColor = branding.brandColor;
      if (!disabled) {
        styles.transition = "all 0.2s ease";
      }
    } else if (view === "outlined") {
      styles.borderColor = branding.brandColor;
      styles.color = branding.brandColor;
    } else if (view === "flat") {
      styles.color = branding.brandColor;
    }
    
    return styles;
  };

  const getHoverStyles = (): string => {
    if (disabled) return "";
    
    if (view === "normal") {
      return "transition-all hover:opacity-90";
    } else if (view === "outlined" || view === "flat") {
      return "transition-all";
    }
    
    return "";
  };

  const renderIcon = () => {
    if (!icon) return null;
    return <Icon name={icon} className="inline-block" size={size === "xs" ? 14 : size === "s" ? 16 : size === "m" ? 18 : size === "l" ? 20 : 24} />;
  };

  const renderContent = () => {
    const iconElement = renderIcon();
    const textElement = children && <span>{children}</span>;

    if (iconDisplay === "Icon only") {
      return iconElement;
    } else if (iconDisplay === "start with icon") {
      return (
        <>
          {iconElement}
          {textElement && <span className={direction === "RTL" ? "mr-2" : "ml-2"}>{textElement}</span>}
        </>
      );
    } else {
      return (
        <>
          {textElement}
          {iconElement && <span className={direction === "RTL" ? "mr-2" : "ml-2"}>{iconElement}</span>}
        </>
      );
    }
  };

  const buttonElement = (
    <button
      onClick={onClick}
      disabled={disabled}
      style={getButtonStyles()}
      className={`
        inline-flex items-center justify-center font-medium
        ${getSizeClasses()}
        ${getViewClasses()}
        ${getPinClasses()}
        ${getHoverStyles()}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${isRecordLevel ? "relative overflow-hidden" : ""}
      `}
      dir={direction}
      onMouseEnter={(e) => {
        if (!disabled ) {
          e.currentTarget.style.backgroundColor = branding.hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && (view === "outlined" || view === "flat")) {
          e.currentTarget.style.backgroundColor = "transparent";
        }else if (view === "normal") {
          e.currentTarget.style.backgroundColor = branding.brandColor;
        }
      }}
    >
      {renderContent()}
      {isRecordLevel && (
        <span className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"></span>
      )}
    </button>
  );

  const renderWithHeader = (element: React.ReactNode) => {
    if (!headerText) return element;

    const headerClasses = `${getFontSizeClass(branding.fontSize)} font-semibold mb-1 ${
      theme === "dark" || theme === "dark-hc" ? "text-gray-300" : "text-gray-700"
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
            <div className={`${headerClasses} mt-1 mb-0`}>{headerText}</div>
          </div>
        );
      case "left":
        return (
          <div className="flex items-center">
            <div className={`${headerClasses} mb-0 ${direction === "RTL" ? "ml-2" : "mr-2"}`}>
              {headerText}
            </div>
            {element}
          </div>
        );
      case "right":
        return (
          <div className="flex items-center">
            {element}
            <div className={`${headerClasses} mb-0 ${direction === "RTL" ? "mr-2" : "ml-2"}`}>
              {headerText}
            </div>
          </div>
        );
    }
  };

  const finalElement = renderWithHeader(buttonElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};

  