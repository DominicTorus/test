"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { Icon } from "./Icon";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface SpeechToTextProps {
  disabled?: boolean;
  placeholder?: string;
  topcontent?: boolean;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  onTranscript?: (text: string) => void;
  className?: string;
}

export const SpeechToText: React.FC<SpeechToTextProps> = ({
  disabled = false,
  placeholder = "Click microphone to start recording...",
  topcontent = false,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  onTranscript,
  className = "",
}) => {
  const { theme, branding } = useGlobal();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleStartRecording = () => {
    if (!disabled) {
      setIsRecording(true);
      // In a real implementation, you would use the Web Speech API
      // const recognition = new (window as any).webkitSpeechRecognition();
      // recognition.start();
      // recognition.onresult = (event: any) => {
      //   const text = event.results[0][0].transcript;
      //   setTranscript(text);
      //   onTranscript?.(text);
      // };
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const speechToTextElement = (
    <div className={`w-full ${className}`}>
      {topcontent && headerText && (
        <label className={`block mb-2 ${getFontSizeClass(branding.fontSize)} font-medium ${
          isDark ? "text-gray-200" : "text-gray-900"
        }`}>
          {headerText}
        </label>
      )}

      <div className="relative">
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
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
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={disabled}
          className={`
            absolute
            bottom-3 right-3
            p-3
            rounded-full
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80"}
            transition-all
          `}
          style={{
            backgroundColor: isRecording ? "#EF4444" : branding.brandColor,
          }}
        >
          <Icon data={isRecording ? "pause" : "FaMicrophoneAlt"} size={20} />
        </button>
      </div>

      {isRecording && (
        <p className={`mt-2 text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
          Recording...
        </p>
      )}
    </div>
  );

  const renderWithHeader = (element: React.ReactNode) => {
    if (!headerText || topcontent) return element;

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

  const finalElement = renderWithHeader(speechToTextElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
