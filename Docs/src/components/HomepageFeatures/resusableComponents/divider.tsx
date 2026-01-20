import React from "react";
import clsx from "clsx";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
  color?: string;
  style?: "solid" | "dashed" | "dotted";
  className?: string;
  margin?: string; // e.g., "my-4" for spacing
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  thickness = 1,
  color = "#ccc",
  style = "solid",
  className,
  margin,
}) => {
  return (
    <div
      className={clsx(
        "divider",
        orientation === "vertical" ? "h-full w-0" : "w-full h-0",
        margin,
        className
      )}
      style={{
        borderBottom:
          orientation === "horizontal"
            ? `${thickness}px ${style} ${color}`
            : "none",
        borderRight:
          orientation === "vertical"
            ? `${thickness}px ${style} ${color}`
            : "none",
      }}
    />
  );
};
