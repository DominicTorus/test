"use client";

import React, { useState } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { Icon } from "./Icon";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { getFontSizeClass, getBorderRadiusClass } from "@/utils/branding";

interface TableProps {
  pagination: boolean;
  tablename?: string;
  primarykey?: string;
  parenttableprimarykey?: string;
  parenttablename?: string;
  isPivotTable?: boolean;
  search?: boolean;
  tableActions?: boolean;
  tableSelection?: boolean;
  tableSettings?: boolean;
  tableSorting?: boolean;
  isHyperLink?: boolean;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  data?: any[];
  columns?: string[];
  onRowClick?: (row: any) => void;
}

export const Table: React.FC<TableProps> = ({
  pagination,
  tablename,
  primarykey,
  parenttableprimarykey,
  parenttablename,
  isPivotTable = false,
  search = false,
  tableActions = false,
  tableSelection = false,
  tableSettings = false,
  tableSorting = false,
  isHyperLink = false,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  data = [],
  columns = [],
  onRowClick,
}) => {
  const { theme, branding } = useGlobal();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns);

  const itemsPerPage = 10;

  const handleRowSelection = (index: number) => {
    if (tableSelection) {
      setSelectedRows((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    }
  };

  const handleSort = (column: string) => {
    if (tableSorting) {
      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    }
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleSelectAllColumns = () => {
    setVisibleColumns(columns);
  };

  const handleDeselectAllColumns = () => {
    setVisibleColumns([]);
  };

  const filteredData = search
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return sortDirection === "asc" ? comparison : -comparison;
      })
    : filteredData;

  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : sortedData;

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSelectAllRows = () => {
    if (selectedRows.length === paginatedData.length) {
      // Deselect all
      setSelectedRows([]);
    } else {
      // Select all rows on current page
      setSelectedRows(paginatedData.map((_, index) => index));
    }
  };

  const isAllRowsSelected = selectedRows.length === paginatedData.length && paginatedData.length > 0;
  const isSomeRowsSelected = selectedRows.length > 0 && selectedRows.length < paginatedData.length;

  const isDark = theme === "dark" || theme === "dark-hc";

  const tableElement = (
    <div className="w-full">
      <div className="flex gap-4 mb-4">
        {search && (
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full
                px-4 py-2
                ${getBorderRadiusClass(branding.borderRadius)}
                ${getFontSizeClass(branding.fontSize)}
                border-2
                ${isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}
              `}
            />
          </div>
        )}

        {/* Filter/Column Visibility Button */}
        <button
          onClick={() => setShowColumnModal(!showColumnModal)}
          className={`
            px-4 py-2
            ${getBorderRadiusClass(branding.borderRadius)}
            ${getFontSizeClass(branding.fontSize)}
            border-2
            flex items-center gap-2
            transition-colors
            ${isDark ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700" : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"}
          `}
          style={{
            borderColor: showColumnModal ? branding.brandColor : undefined,
          }}
        >
          <Icon name="filter" size={16} />
          <span>Columns</span>
        </button>
      </div>

      {/* Column Visibility Modal */}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`
              ${getBorderRadiusClass(branding.borderRadius)}
              ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}
              border-2
              p-6
              w-96
              max-h-[80vh]
              overflow-auto
              shadow-xl
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                Select Columns
              </h3>
              <button
                onClick={() => setShowColumnModal(false)}
                className="hover:opacity-70 transition-opacity"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={handleSelectAllColumns}
                className={`
                  flex-1
                  px-3 py-1.5
                  text-sm
                  ${getBorderRadiusClass(branding.borderRadius)}
                  ${isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
                  transition-colors
                `}
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAllColumns}
                className={`
                  flex-1
                  px-3 py-1.5
                  text-sm
                  ${getBorderRadiusClass(branding.borderRadius)}
                  ${isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
                  transition-colors
                `}
              >
                Deselect All
              </button>
            </div>

            <div className="space-y-2">
              {columns.map((column) => (
                <label
                  key={column}
                  className={`
                    flex items-center gap-3
                    p-3
                    ${getBorderRadiusClass(branding.borderRadius)}
                    cursor-pointer
                    transition-colors
                    ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(column)}
                    onChange={() => handleColumnToggle(column)}
                    className="w-4 h-4 cursor-pointer"
                    style={{
                      accentColor: branding.brandColor,
                    }}
                  />
                  <span className={`${getFontSizeClass(branding.fontSize)} ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    {column}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowColumnModal(false)}
                className={`
                  px-4 py-2
                  ${getBorderRadiusClass(branding.borderRadius)}
                  ${getFontSizeClass(branding.fontSize)}
                  font-medium
                  transition-colors
                  text-white
                `}
                style={{
                  backgroundColor: branding.brandColor,
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table
          className={`
            w-full
            ${getBorderRadiusClass(branding.borderRadius)}
            ${isDark ? "bg-gray-800" : "bg-white"}
          `}
        >
          <thead
            className={`
              ${isDark ? "bg-gray-700" : "bg-gray-100"}
            `}
          >
            <tr>
              {tableSelection && (
                <th className="px-4 py-3 w-12">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isAllRowsSelected}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = isSomeRowsSelected;
                        }
                      }}
                      onChange={handleSelectAllRows}
                      className="w-4 h-4 cursor-pointer"
                      style={{
                        accentColor: branding.brandColor,
                      }}
                    />
                  </div>
                </th>
              )}
              {visibleColumns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  className={`
                    px-4 py-3
                    text-left
                    ${getFontSizeClass(branding.fontSize)}
                    font-semibold
                    ${tableSorting ? "cursor-pointer hover:bg-opacity-80" : ""}
                    ${isDark ? "text-gray-200" : "text-gray-700"}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {column}
                    {tableSorting && sortColumn === column && (
                      <Icon
                        name={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
                        size={14}
                      />
                    )}
                  </div>
                </th>
              ))}
              {tableActions && (
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => {
              const isSelected = selectedRows.includes(index);
              return (
                <tr
                  key={index}
                  onClick={() => {
                    handleRowSelection(index);
                    onRowClick?.(row);
                  }}
                  className={`
                    border-t
                    ${isDark ? "border-gray-700" : "border-gray-200"}
                    ${isSelected ? "bg-opacity-20" : ""}
                    ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                    transition-colors
                    cursor-pointer
                  `}
                  style={{
                    backgroundColor: isSelected ? `${branding.brandColor}20` : undefined,
                  }}
                >
                  {tableSelection && (
                    <td className="px-4 py-3 w-12">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleRowSelection(index)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 cursor-pointer"
                          style={{
                            accentColor: branding.brandColor,
                          }}
                        />
                      </div>
                    </td>
                  )}
                  {visibleColumns.map((column) => (
                    <td
                      key={column}
                      className={`
                        px-4 py-3
                        ${getFontSizeClass(branding.fontSize)}
                        ${isDark ? "text-gray-300" : "text-gray-700"}
                        ${isHyperLink ? "text-blue-500 underline" : ""}
                      `}
                    >
                      {row[column]}
                    </td>
                  ))}
                  {tableActions && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <Icon name="edit" size={16} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <Icon name="delete" size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`
              px-4 py-2
              ${getBorderRadiusClass(branding.borderRadius)}
              ${getFontSizeClass(branding.fontSize)}
              ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-700"}
              disabled:opacity-50
              transition-colors
            `}
          >
            Previous
          </button>

          <span className={`${getFontSizeClass(branding.fontSize)} ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`
              px-4 py-2
              ${getBorderRadiusClass(branding.borderRadius)}
              ${getFontSizeClass(branding.fontSize)}
              ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-700"}
              disabled:opacity-50
              transition-colors
            `}
          >
            Next
          </button>
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

  const finalElement = renderWithHeader(tableElement);

  if (needTooltip && tooltipProps) {
    return (
      <Tooltip title={tooltipProps.title} placement={tooltipProps.placement}>
        {finalElement}
      </Tooltip>
    );
  }

  return <>{finalElement}</>;
};
