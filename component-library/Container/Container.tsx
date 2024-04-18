import logger from "@/hooks/useLogger";
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  direction?: "row" | "col" | "auto";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  width?: "full" | "fit" | "auto";
  height?: "full" | "fit";
  gap?: 3 | 5;
  className?: string;
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = (
  props
) => {
  const {
    children,
    align = "center",
    direction = "auto",
    justify = "center",
    wrap,
    gap = 5,
    width = "auto",
    height,
    className,
  } = props;

  const getAlign = () => {
    if (align === undefined) return "";
    return `items-${align}`;
  };

  const getDirection = () => {
    if (direction === undefined) return "";
    if (direction === "auto") return "flex-col md:flex-row";
    return `flex-${direction}`;
  };

  const getJustify = () => {
    if (justify === undefined) return "";
    return `justify-${justify}`;
  };

  const getWrap = () => {
    if (wrap === undefined) return "";
    return `flex-${wrap}`;
  };

  const getWidth = () => {
    if (width === undefined) return "";
    if (width === "auto") return "w-full md:w-fit";
    return `w-${width}`;
  };

  const getHeight = () => {
    if (height === undefined) return "";
    return `h-${height}`;
  };

  const getGap = () => {
    if (gap === undefined) return "";
    return `gap-${gap}`;
  };

  return (
    <div
      className={twMerge(
        "flex",
        getAlign(),
        getDirection(),
        getJustify(),
        getWrap(),
        getWidth(),
        getHeight(),
        getGap(),
        className
      )}
    >
      {children}
    </div>
  );
};
