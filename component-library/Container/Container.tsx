import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  direction?: "row" | "col" | "auto";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  items?: "start" | "end" | "center" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  width?: "full" | "fit" | "auto" | "none";
  height?: "full" | "fit";
  gap?: 3 | 5;
  className?: string;
  id?: string;
  tabIndex?: boolean;
  style?: React.CSSProperties;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const Container: React.FC<PropsWithChildren<ContainerProps>> = (
  props
) => {
  const {
    children,
    items = "center",
    direction = "auto",
    justify = "center",
    wrap,
    gap = 5,
    width = "auto",
    tabIndex = false,
    height,
    className,
    onClick,
    onKeyDown,
    id,
    style,
    title,
  } = props;

  const getAlign = () => {
    if (items === undefined) return "";
    return `items-${items}`;
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
    if (width === undefined || width === "none") return "";
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
      title={title}
      style={style}
      id={id}
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
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex === true ? 0 : undefined}
    >
      {children}
    </div>
  );
};
