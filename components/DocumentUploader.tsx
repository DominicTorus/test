"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { Icon } from "./Icon";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

type ViewType = "modal" | "onScreen";
type StorageLocation = "DB" | "DFS";
type FileNamingPreference = "use_system_generated_name" | "keep_original_file_name";

interface DocumentUploaderProps {
  viewType?: ViewType;
  storageLocation?: StorageLocation;
  fileNamingPreference?: FileNamingPreference;
  enableEncryption?: boolean;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  onFileUpload?: (files: File[]) => void;
  className?: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  viewType = "onScreen",
  storageLocation = "DB",
  fileNamingPreference = "keep_original_file_name",
  enableEncryption = false,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  onFileUpload,
  className = "",
}) => {
  const { theme, direction, branding } = useGlobal();
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
      onFileUpload?.(fileList);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files);
      setFiles(fileList);
      onFileUpload?.(fileList);
    }
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const uploaderElement = (
    <div className={`w-full ${className}`}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative
          border-2 border-dashed
          ${getBorderRadiusClass(branding.borderRadius)}
          p-8
          text-center
          transition-all
          ${dragActive ? "border-opacity-100" : "border-opacity-50"}
          ${isDark ? "bg-gray-800 border-gray-600" : "bg-gray-50 border-gray-300"}
          hover:border-opacity-100
        `}
        style={{
          borderColor: dragActive ? branding.brandColor : undefined,
        }}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="pointer-events-none flex flex-col items-center">
          <Icon data="FaCloudUploadAlt" size={48} className=" " />

          <p className={`mt-4 ${getFontSizeClass(branding.fontSize)} font-medium ${
            isDark ? "text-gray-200" : "text-gray-700"
          }`}>
            Drop files here or click to upload
          </p>

          <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Storage: {storageLocation} | Encryption: {enableEncryption ? "Enabled" : "Disabled"}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className={`mt-4 ${getBorderRadiusClass(branding.borderRadius)} ${
          isDark ? "bg-gray-800" : "bg-gray-50"
        } p-4`}>
          <h4 className={`font-semibold mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
            Uploaded Files:
          </h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 ${getFontSizeClass(branding.fontSize)} ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <Icon data="FaFile" size={16} />
                <span>{file.name}</span>
                <span className="text-sm opacity-60">({(file.size / 1024).toFixed(2)} KB)</span>
              </li>
            ))}
          </ul>
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

  const finalElement = renderWithHeader(uploaderElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
