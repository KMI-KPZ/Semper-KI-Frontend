import { StringifyOptions } from "querystring";
import React, { ReactNode } from "react";

interface Props {
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
  link?: string;
}

type Icon = "front" | "back";
type Size = "large" | "medium" | "small" | "xsmall" | "full";
type Style = "primary" | "secondary";

const Button: React.FC<Props> = (props) => {
  const {
    active = true,
    icon,
    iconPos = "front",
    onClick,
    title,
    children,
    size = "medium",
    style = "primary",
    link = "",
  } = props;

  const handleOnClickButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick !== undefined) onClick(e);
  };

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
        "bg-türkis hover:bg-grau-400 text-white hover:cursor-pointer"
      );
    if (style === "secondary" && active === true)
      className = addString(
        className,
        "hover:bg-türkis bg-grau-400 text-white hover:cursor-pointer"
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
      flex flex-row justify-center items-center
      gap-3
      py-3 px-5
      transition duration-300 bezier
      ${getClassName()}`}
      onClick={handleOnClickButton}
      href={link}
    >
      {iconPos === "front" ? icon : null}
      {children ? <span>{children}</span> : null}
      {iconPos === "back" ? icon : null}
    </a>
  );
};

export default Button;
