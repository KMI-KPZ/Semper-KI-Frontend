import React, { PropsWithChildren, ReactNode } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  title: string;
  to?: string;
  onClick?(
    e?:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  className?: string;
  active?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
type ButtonSize = "sm" | "xs" | "md" | "lg" | "xl";
type ButtonVariant = "primary" | "secondary" | "text";
type ButtonWidth = "fit" | "full" | "auto";

export const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    active = true,
    size = "md",
    variant = "primary",
    loading = false,
    width = "auto",
    className = "",
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
    e.preventDefault();
    e.stopPropagation();
    if (onClick !== undefined) {
      onClick(e);
    } else if (to !== undefined) {
      navigate(to);
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
            return "hover:bg-grau-300 bg-grau-200 text-white hover:cursor-default";
        }
      case "secondary":
        switch (active) {
          case true:
            return "hover:bg-türkis-300 bg-slate-100 text-black hover:cursor-pointer";
          case false:
            return "bg-grau-300 hover:bg-grau-200 text-white hover:cursor-default";
        }
      case "text":
        switch (active) {
          case true:
            return "duration-300 hover:cursor-pointer hover:text-türkis";
          case false:
            return "duration-300 hover:cursor-pointer text-türkis hover:text-inherit";
        }
    }
  };

  const getClassNameSize = (): string => {
    switch (size) {
      case "xs":
        return "w-full px-5 py-3  md:w-fit md:py-1 md:px-2";
      case "sm":
        return "w-full px-5 py-3  md:w-fit md:py-2 md:px-3";
      case "md":
        return "w-full px-5 py-3  md:w-fit md:py-2 md:px-4";
      case "lg":
        return "w-full px-5 py-3  md:w-fit md:py-3 md:px-5";
      case "xl":
        return "w-full";
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
      bezier flex flex-row items-center justify-center gap-3 transition duration-300 
      ${getClassNameVariant()} ${getClassNameSize()} ${getClassNameWidth()} ${className}`}
      onClick={handleOnClickButton}
      href={to !== undefined ? to : title}
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
