"use client";

import React from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Icon } from "./Icon";
import { ComponentSize } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onUpdate: (page: number, pageSize: number) => void;
  pageSizeOptions?: number[];
  showInput?: boolean;
  size?: ComponentSize;
  className?: string;
  compact?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onUpdate,
  pageSizeOptions = [5, 10, 20, 50, 100],
  showInput = true,
  size = "m",
  className = "",
  compact = false,
}) => {
  const { theme, branding } = useGlobal();
  const isDark = theme === "dark" || theme === "dark-hc";

  const totalPages = Math.ceil(total / pageSize);
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  const getSizeClasses = () => {
    const fontSize = getFontSizeClass(branding.fontSize);
    switch (size) {
      case "s":
        return {
          button: `px-2 py-1 text-sm`,
          select: `px-2 py-1 text-sm`,
          input: `px-2 py-1 text-sm w-16`,
          text: "text-sm",
        };
      case "m":
        return {
          button: `px-3 py-1.5 ${fontSize}`,
          select: `px-3 py-1.5 ${fontSize}`,
          input: `px-3 py-1.5 ${fontSize} w-20`,
          text: fontSize,
        };
      case "l":
        return {
          button: `px-4 py-2 ${fontSize}`,
          select: `px-4 py-2 ${fontSize}`,
          input: `px-4 py-2 ${fontSize} w-24`,
          text: fontSize,
        };
      case "xl":
        return {
          button: `px-5 py-2.5 text-lg`,
          select: `px-5 py-2.5 text-lg`,
          input: `px-5 py-2.5 text-lg w-28`,
          text: "text-lg",
        };
      default:
        return {
          button: `px-3 py-1.5 ${fontSize}`,
          select: `px-3 py-1.5 ${fontSize}`,
          input: `px-3 py-1.5 ${fontSize} w-20`,
          text: fontSize,
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onUpdate(newPage, pageSize);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (newPageSize !== pageSize) {
      onUpdate(1, newPageSize);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      handlePageChange(value);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const baseButtonClass = `
    ${getBorderRadiusClass(branding.borderRadius)}
    border-2
    transition-all
    ${isDark ? "border-gray-600" : "border-gray-300"}
    ${isDark ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"}
    hover:shadow-md
  `;

  const activeButtonClass = `
    ${getBorderRadiusClass(branding.borderRadius)}
    border-2
    transition-all
  `;

  if (compact) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`
            ${baseButtonClass}
            ${sizeClasses.button}
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
          aria-label="Previous page"
        >
          <Icon data="FaStepBackward" size={16} />
        </button>

        <span className={`${sizeClasses.text} ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {page} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className={`
            ${baseButtonClass}
            ${sizeClasses.button}
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
          aria-label="Next page"
        >
          <Icon data="FaStepForward" size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 ${className}`}>
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className={`${sizeClasses.text} ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Rows per page:
        </span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className={`
            ${baseButtonClass}
            ${sizeClasses.select}
            cursor-pointer
          `}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={`
            ${baseButtonClass}
            ${sizeClasses.button}
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
          aria-label="First page"
        >
          <Icon data="FaFastBackward" size={16} />
        </button>

        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`
            ${baseButtonClass}
            ${sizeClasses.button}
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
          aria-label="Previous page"
        >
          <Icon data="FaStepBackward" size={16} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) =>
            pageNum === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className={`${sizeClasses.button} ${sizeClasses.text} ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum as number)}
                className={`
                  ${pageNum === page ? activeButtonClass : baseButtonClass}
                  ${sizeClasses.button}
                  ${
                    pageNum === page
                      ? `${isDark ? "text-white" : "text-white"}`
                      : ""
                  }
                `}
                style={
                  pageNum === page
                    ? {
                        backgroundColor: branding.brandColor,
                        borderColor: branding.brandColor,
                      }
                    : undefined
                }
                aria-label={`Page ${pageNum}`}
                aria-current={pageNum === page ? "page" : undefined}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className={`
            ${baseButtonClass}
            ${sizeClasses.button}
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
          aria-label="Next page"
        >
          <Icon data="FaStepForward" size={16} />
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages || totalPages === 0}
          className={`
            ${baseButtonClass}
            ${sizeClasses.button}
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
          aria-label="Last page"
        >
          <Icon data="FaFastForward" size={16} />
        </button>
      </div>

      {/* Info and Jump to Page */}
      <div className="flex items-center gap-4">
        <span className={`${sizeClasses.text} ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {startItem}-{endItem} of {total}
        </span>

        {showInput && (
          <div className="flex items-center gap-2">
            <span className={`${sizeClasses.text} ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Go to:
            </span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={handleInputChange}
              className={`
                ${baseButtonClass}
                ${sizeClasses.input}
              `}
            />
          </div>
        )}
      </div>
    </div>
  );
};
