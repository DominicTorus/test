"use client";

import React from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Avatar } from "./Avatar";
import { getBorderRadiusClass, getFontSizeClass } from "@/utils/branding";

type CompanyCardSize = "L" | "M";

interface CompanyCardProps {
  size?: CompanyCardSize;
  companyName?: string;
  companyLogo?: string;
  description?: string;
  industry?: string;
  location?: string;
  employees?: string;
  website?: string;
  className?: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  size = "M",
  companyName = "Company Name",
  companyLogo,
  description,
  industry,
  location,
  employees,
  website,
  className = "",
}) => {
  const { theme, branding } = useGlobal();

  const getSizeClasses = () => {
    switch (size) {
      case "L":
        return "p-6 min-w-[400px]";
      case "M":
        return "p-4 min-w-[300px]";
      default:
        return "p-4 min-w-[300px]";
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  return (
    <div
      className={`
        ${getSizeClasses()}
        ${getBorderRadiusClass(branding.borderRadius)}
        ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}
        border-2
        shadow-md
        transition-all
        hover:shadow-lg
        ${className}
      `}
    >
      <div className="flex items-start gap-4">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt={companyName}
            className={`${size === "L" ? "w-16 h-16" : "w-12 h-12"} ${getBorderRadiusClass(branding.borderRadius)} object-cover`}
          />
        ) : (
          <Avatar
            size={size === "L" ? "l" : "m"}
            view="filled"
            theme="brand"
            text={companyName.charAt(0)}
          />
        )}

        <div className="flex-1">
          <h3
            className={`
              ${size === "L" ? "text-xl" : "text-lg"}
              font-bold
              ${isDark ? "text-gray-100" : "text-gray-900"}
              mb-1
            `}
          >
            {companyName}
          </h3>

          {description && (
            <p
              className={`
                ${getFontSizeClass(branding.fontSize)}
                ${isDark ? "text-gray-300" : "text-gray-600"}
                mb-3
              `}
            >
              {description}
            </p>
          )}

          <div className="space-y-1">
            {industry && (
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <span className="font-semibold">Industry:</span>
                <span>{industry}</span>
              </div>
            )}

            {location && (
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <span className="font-semibold">Location:</span>
                <span>{location}</span>
              </div>
            )}

            {employees && (
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <span className="font-semibold">Employees:</span>
                <span>{employees}</span>
              </div>
            )}

            {website && (
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <span className="font-semibold">Website:</span>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
