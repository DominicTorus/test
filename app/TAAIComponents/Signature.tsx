"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface SignatureProps {
  value?: string;
  title?: string;
  height?: string;
  width?: string;
  headerText?: string;
  headerPosition?: HeaderPosition;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  onChange?: (signature: string) => void;
}

export const Signature: React.FC<SignatureProps> = ({
  value = "",
  title,
  height = "200px",
  width = "100%",
  headerText,
  headerPosition = "top",
  needTooltip = false,
  tooltipProps,
  onChange,
}) => {
  const { theme, branding } = useGlobal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && value) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = value;
      }
    }
  }, [value]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = theme === "dark" || theme === "dark-hc" ? "#fff" : "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const signature = canvas.toDataURL();
      onChange?.(signature);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onChange?.("");
      }
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const signatureElement = (
    <div className="w-full">
      {title && (
        <h3 className={`mb-2 ${getFontSizeClass(branding.fontSize)} font-semibold ${
          isDark ? "text-gray-200" : "text-gray-700"
        }`}>
          {title}
        </h3>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={parseInt(width)}
          height={parseInt(height)}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className={`
            border-2
            ${getBorderRadiusClass(branding.borderRadius)}
            cursor-crosshair
            ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}
          `}
          style={{ width, height }}
        />

        <button
          onClick={clearSignature}
          className={`
            mt-2
            px-4 py-2
            ${getBorderRadiusClass(branding.borderRadius)}
            ${getFontSizeClass(branding.fontSize)}
            font-medium
            transition-colors
            ${isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
          `}
        >
          Clear
        </button>
      </div>
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

  const finalElement = renderWithHeader(signatureElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
