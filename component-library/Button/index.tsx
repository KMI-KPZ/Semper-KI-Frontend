import React, { PropsWithChildren, ReactNode } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";

interface ButtonProps {
  title: string;
  to?: string;
  onClick?(
    e?:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void;
  size?: ButtonSize;
  align?: ButtonAlign;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  direction?: ButtonDirection;
  className?: string;
  active?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  extern?: boolean;
  testid?: string;
}
type ButtonSize = "sm" | "xs" | "md" | "lg" | "xl";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "text"
  | "light"
  | "link";
type ButtonWidth = "fit" | "full" | "auto";
type ButtonAlign = "start" | "center" | "end";
type ButtonDirection = "col" | "row";

export const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    active = true,
    size = "md",
    variant = "primary",
    loading = false,
    width = "auto",
    className = "",
    align = "center",
    direction = "row",
    testid = "",
    extern = false,
    onClick,
    title,
    children,
    to,
    endIcon,
    startIcon,
  } = props;
  const navigate = useNavigate();

  const handleOnClickButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!extern) {
      e.preventDefault();
      e.stopPropagation();
      if (onClick !== undefined && active && !loading) {
        onClick(e);
      }
      if (to !== undefined && active) {
        navigate(to);
      }
    }
  };

  const getClassNameWidth = (): string => {
    switch (width) {
      case "full":
        return "w-full";
      case "fit":
        return "w-fit";
      case "auto":
        return "w-full md:w-fit";
    }
  };

  const getClassNameVariant = (): string => {
    switch (variant) {
      case "primary":
        switch (active) {
          case true:
            return "bg-türkis-800 hover:bg-grau-600 text-white hover:cursor-pointer";
          case false:
            return "bg-grau-600 text-white hover:cursor-default";
        }
      case "secondary":
        switch (active) {
          case true:
            return "hover:bg-türkis-300 bg-slate-200 text-black hover:cursor-pointer";
          case false:
            return "bg-grau-300 hover:bg-grau-200 text-white hover:cursor-default";
        }
      case "outline":
        return "text-black bg-slate-200 md:bg-inherit hover:shadow-inner-border hover:shadow-türkis-300 hover:cursor-pointer";
      case "text":
        switch (active) {
          case true:
            return "hover:cursor-pointer hover:text-türkis";
          case false:
            return "hover:cursor-pointer text-türkis hover:text-inherit";
        }
      case "light":
        switch (active) {
          case true:
            return "hover:text-türkis text-grau-400 font-bold";
          case false:
            return "text-grau-400 font-bold";
        }
      case "link":
        return "hover:text-blau underline";
    }
  };

  const getClassNameSize = (): string => {
    switch (size) {
      case "xs":
        return "px-3 py-2 md:py-1 md:px-2";
      case "sm":
        return "px-4 py-3 md:py-2 md:px-3";
      case "md":
        return "px-5 py-4 md:py-2 md:px-4";
      case "lg":
        return "px-6 py-5 md:py-3 md:px-5";
      case "xl":
        return "px-7 py-6 md:py-4 md:px-6";
    }
  };

  const getClassNameAlign = (): string => {
    switch (align) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
        return "justify-end";
    }
  };

  const getClassNameDirection = (): string => {
    switch (direction) {
      case "col":
        return "flex-col";
      case "row":
        return "flex-row";
    }
  };

  const getTitle = (): string => {
    if (title !== undefined) return title;
    if (typeof children === "string") return children;
    return "";
  };

  return (
    <a
      title={getTitle()}
      className={` 
      bezier group flex items-center gap-3 whitespace-nowrap transition duration-300
      ${getClassNameVariant()} ${getClassNameSize()} 
      ${getClassNameWidth()} ${getClassNameAlign()} 
      ${getClassNameDirection()} ${className}`}
      onClick={handleOnClickButton}
      href={to !== undefined ? to : title}
      data-testid={testid}
    >
      {loading === true ? (
        <div className="animate-spin">
          <LoopIcon />
        </div>
      ) : (
        <>
          {startIcon}
          {children !== undefined ? children : title}
          {endIcon}
        </>
      )}
    </a>
  );
};
