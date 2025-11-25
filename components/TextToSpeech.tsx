"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Icon } from "./Icon";
import { Tooltip } from "./Tooltip";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface TextToSpeechProps {
  disabled?: boolean;
  placeholder?: string;
  topcontent?: boolean;
  value?: string;
  label?: string;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  onChange?: (text: string) => void;
  className?: string;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({
  disabled = false,
  placeholder = "Enter text to convert to speech...",
  topcontent = false,
  value = "",
  label,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  onChange,
  className = "",
}) => {
  const { theme, branding } = useGlobal();
  const [text, setText] = useState(value);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!disabled && text) {
      setIsSpeaking(true);
      // In a real implementation, you would use the Web Speech API
      // const utterance = new SpeechSynthesisUtterance(text);
      // utterance.onend = () => setIsSpeaking(false);
      // window.speechSynthesis.speak(utterance);

      // Simulate speaking
      setTimeout(() => {
        setIsSpeaking(false);
      }, 2000);
    }
  };

  const handleStop = () => {
    setIsSpeaking(false);
    // window.speechSynthesis.cancel();
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    onChange?.(newText);
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const textToSpeechElement = (
    <div className={`w-full ${className}`}>
      {topcontent && (
        <label className={`block mb-2 ${getFontSizeClass(branding.fontSize)} font-medium ${
          isDark ? "text-gray-200" : "text-gray-900"
        }`}>
          {label || "Text to Speech"}
        </label>
      )}

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full
            px-4 py-2
            ${getBorderRadiusClass(branding.borderRadius)}
            ${getFontSizeClass(branding.fontSize)}
            border-2
            min-h-[100px]
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
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

        <button
          onClick={isSpeaking ? handleStop : handleSpeak}
          disabled={disabled || !text}
          className={`
            absolute
            bottom-3 right-3
            p-3
            rounded-full
            ${disabled || !text ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80"}
            transition-all
          `}
          style={{
            backgroundColor: branding.brandColor,
          }}
        >
          <Icon data={isSpeaking ? "pause" : "FaMicrophoneAlt"} size={20} />
        </button>
      </div>

      {isSpeaking && (
        <p className={`mt-2 text-sm ${isDark ? "text-blue-400" : "text-blue-600"}`}>
          Speaking...
        </p>
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

  const finalElement = renderWithHeader(textToSpeechElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip
        title={tooltipProps.title}
        placement={tooltipProps.placement}
        triggerClassName="block w-full"
      >
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
