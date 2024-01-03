import React, { PropsWithChildren, ReactNode } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  title: string;
  to?: string;
  onClick?(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
  size?: ButtonSize;
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
  target?: "_blank" | "_self" | "_parent" | "_top";
}
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonWidth = "fit" | "full" | "auto";
type ButtonDirection = "col" | "row";

export const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    active = true,
    size = "md",
    variant = "secondary",
    loading = false,
    width = "auto",
    className = "",
    direction = "row",
    testid = "",
    extern = false,
    target = "_self",
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
    let className = "";
    switch (width) {
      case "full":
        className = "w-full";
        break;
      case "fit":
        className = "w-fit";
        break;
      case "auto":
        className = "w-full md:w-fit";
        break;
    }
    return className;
  };

  const getClassNameVariant = (): string => {
    let className = "";
    switch (variant) {
      case "primary":
        if (active)
          className =
            "bg-blau-600 border-blau-700 border-2  text-white hover:cursor-pointer shadow-button-primary hover:shadow-button-inner-primary  focus:shadow-button-inner-primary ";
        else
          className =
            "bg-slate-500 border-2 border-slate-700 text-slate-100 hover:cursor-default shadow-button-inner-primary";
        break;
      case "secondary":
        if (active)
          className =
            "bg-slate-50 border-2 border-slate-300 text-black hover:cursor-pointer shadow-button-secondary hover:shadow-button-inner-secondary  focus:shadow-button-inner-secondary";
        else
          className =
            " bg-slate-200 border-2 border-slate-400 text-slate-700 hover:cursor-default shadow-button-inner-secondary";
        break;
      case "tertiary":
        if (active)
          className =
            " text-black hover:cursor-pointer hover:scale-105 focus:scale-105 scale-100";
        else className = "text-slate-600  hover:cursor-default";
        break;
    }
    return className;
  };

  const getClassNameSize = (): string => {
    let className = "";
    switch (size) {
      case "sm":
        className = "py-2 px-3";
        break;
      case "md":
        className = "py-3 px-4";
        break;
      case "lg":
        className = "py-4 px-5";
        break;
    }
    return className;
  };

  const getClassNameDirection = (): string => {
    let className = "";
    switch (direction) {
      case "col":
        className = "flex-col";
        break;
      case "row":
        className = "flex-row";
        break;
    }
    return className;
  };

  const getTitle = (): string => {
    if (title !== undefined && children === undefined) return "";
    if (title !== undefined) return title;
    if (typeof children === "string") return children;
    return "";
  };

  return (
    <a
      title={getTitle()}
      className={twMerge(
        ` bezier group flex
          h-fit flex-wrap
          items-center justify-center 
          gap-3 break-words 
          rounded-lg text-center
          transition duration-200 
          md:flex-nowrap md:whitespace-nowrap
         `,
        getClassNameVariant(),
        getClassNameSize(),
        getClassNameWidth(),
        getClassNameDirection(),
        className
      )}
      onClick={handleOnClickButton}
      href={to !== undefined ? to : title}
      data-testid={testid}
      target={target}
      tabIndex={active ? undefined : -1}
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
