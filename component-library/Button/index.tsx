import { DefinedUseQueryResult, UseQueryResult } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router-dom";

interface Props<T> {
  title?: string;
  onClick?(
    e?:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void;
  icon?: ReactNode;
  iconPos?: Icon;
  active?: boolean;
  children?: ReactNode;
  size?: Size;
  style?: Style;
  hrefText?: string;
  to?: string;
  query?: UseQueryResult<T, Error> | DefinedUseQueryResult<T, Error>;
}

type Icon = "front" | "back";
type Size = "large" | "medium" | "small" | "xsmall" | "full";
type Style = "primary" | "secondary";

export const Button = <T,>(props: Props<T>) => {
  const {
    active = true,
    icon,
    iconPos = "front",
    onClick,
    title,
    children,
    size = "medium",
    style = "primary",
    hrefText = "",
    to,
    query,
  } = props;
  const navigate = useNavigate();
  const handleOnClickButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick !== undefined) {
      onClick(e);
    }
    if (to !== undefined) {
      navigate(to);
    }
  };
  const primaryColor: string = "";

  const addString = (oldString: string, newString: string): string =>
    oldString.concat(" ".concat(newString));

  const getClassName = (): string => {
    let className: string = "";
    if (size === "small")
      className = addString(className, "w-full md:w-fit md:py-1 md:px-2");
    if (size === "xsmall")
      className = addString(className, "w-full md:w-fit md:py-2 md:px-3");
    if (size === "medium")
      className = addString(className, "w-full md:w-fit md:py-2 md:px-4");
    if (size === "large")
      className = addString(className, "w-full md:w-fit md:py-3 md:px-5");
    if (size === "full") className = addString(className, "w-full");
    if (style === "primary" && active === true)
      className = addString(
        className,
        "bg-türkis-800 hover:bg-grau-600 text-white hover:cursor-pointer"
      );
    if (style === "secondary" && active === true)
      className = addString(
        className,
        "hover:bg-türkis-300 bg-slate-100 text-black hover:cursor-pointer"
      );
    if (style === "primary" && active === false)
      className = addString(
        className,
        "hover:bg-grau-300 bg-grau-200 text-white hover:cursor-default"
      );
    if (style === "secondary" && active === false)
      className = addString(
        className,
        "bg-grau-300 hover:bg-grau-200 text-white hover:cursor-default"
      );
    return className;
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
      bezier flex flex-row items-center
      justify-center
      gap-3 px-5
      py-3 transition duration-300
      ${getClassName()}`}
      onClick={handleOnClickButton}
      href={hrefText}
    >
      {(query !== undefined && query.status === "success") ||
      query === undefined ? (
        <>
          {iconPos === "front" ? icon : null}
          {children ? <span>{children}</span> : null}
          {iconPos === "back" ? icon : null}
        </>
      ) : null}
      {query !== undefined && query.status === "loading" ? (
        <div className="animate-spin">
          <LoopIcon />
        </div>
      ) : null}
      {query !== undefined && query.status === "error" ? (
        <span>{query.error.message}</span>
      ) : null}
    </a>
  );
};
