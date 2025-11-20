"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Icon } from "./Icon";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

type InputType = "JSON" | "XML";
type ViewType = "Expanded" | "Collapsed";

interface TreeViewerProps {
  inputType: InputType;
  height?: string;
  width?: string;
  view?: ViewType;
  data?: any;
  className?: string;
}

export const TreeViewer: React.FC<TreeViewerProps> = ({
  inputType,
  height = "700px",
  width = "700px",
  view = "Expanded",
  data,
  className = "",
}) => {
  const { theme, branding } = useGlobal();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    view === "Expanded" ? new Set(["root"]) : new Set()
  );

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderTreeNode = (node: any, key: string, level: number = 0): React.ReactNode => {
    const nodeId = `${key}-${level}`;
    const isExpanded = expandedNodes.has(nodeId);
    const hasChildren = typeof node === "object" && node !== null && Object.keys(node).length > 0;

    return (
      <div key={nodeId} style={{ marginLeft: `${level * 20}px` }} className="my-1">
        <div
          className={`
            flex items-center gap-2
            ${getFontSizeClass(branding.fontSize)}
            ${hasChildren ? "cursor-pointer" : ""}
            ${isDark ? "text-gray-200" : "text-gray-700"}
            hover:bg-opacity-10
            p-1
            ${getBorderRadiusClass(branding.borderRadius)}
          `}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? "chevron-down" : "chevron-right"}
              size={16}
            />
          )}
          <span className="font-semibold">{key}:</span>
          {!hasChildren && (
            <span className={isDark ? "text-blue-400" : "text-blue-600"}>
              {typeof node === "string" ? `"${node}"` : String(node)}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {Object.entries(node).map(([childKey, childValue]) =>
              renderTreeNode(childValue, childKey, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  return (
    <div
      className={`
        ${getBorderRadiusClass(branding.borderRadius)}
        border-2
        ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}
        overflow-auto
        p-4
        ${className}
      `}
      style={{ height, width }}
    >
      <div className={`mb-4 font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
        {inputType} Viewer
      </div>

      {data ? (
        <div>
          {typeof data === "object"
            ? Object.entries(data).map(([key, value]) => renderTreeNode(value, key, 0))
            : <span>{String(data)}</span>
          }
        </div>
      ) : (
        <div className={`text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          No data to display
        </div>
      )}
    </div>
  );
};
