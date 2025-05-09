import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type HeadingProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "subtitle";
  className?: string;
};

const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({
  children,
  variant,
  className,
  ...props
}) => {
  const additionalClassNames = className ?? "";
  switch (variant) {
    case "h1":
      return (
        <h1
          className={twMerge(
            `font-ptsans text-2xl font-normal text-[#263652] md:text-3xl`,
            additionalClassNames
          )}
          {...props}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={twMerge(
            `font-ptsans text-xl font-normal text-[#263652] md:text-2xl`,
            additionalClassNames
          )}
          {...props}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={twMerge(
            `font-ptsans text-xl font-normal text-[#263652]`,
            additionalClassNames
          )}
          {...props}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={twMerge(
            `font-ptsans text-base font-normal text-[#263652]`,
            additionalClassNames
          )}
          {...props}
        >
          {children}
        </h4>
      );
    case "subtitle":
      return (
        <h4
          className={twMerge(
            `font-ptsans text-xl font-medium text-[#263652]`,
            additionalClassNames
          )}
          {...props}
        >
          {children}
        </h4>
      );
  }
};

type TextProps = {
  variant?:
    | "body"
    | "strong"
    | "small"
    | "button-text"
    | "quote"
    | "custom"
    | "error";
  className?: string;
  style?: React.CSSProperties | undefined;
};

const Text: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  variant = "body",
  style,
  className,
}) => {
  const additionalClassNames = className ?? "";
  switch (variant) {
    case "body":
      return (
        <span
          style={style}
          className={twMerge(
            `font-ptsans text-base font-normal`,
            additionalClassNames
          )}
        >
          {children}
        </span>
      );
    case "error":
      return (
        <span
          style={style}
          className={twMerge(
            `font-ptsans text-base font-normal text-red-500`,
            additionalClassNames
          )}
        >
          {children}
        </span>
      );
    case "strong":
      return (
        <span
          style={style}
          className={twMerge(
            `font-ptsans text-base font-semibold`,
            additionalClassNames
          )}
        >
          {children}
        </span>
      );
    case "small":
      return (
        <span
          style={style}
          className={twMerge(
            `font-ptsans text-xs font-normal `,
            additionalClassNames
          )}
        >
          {children}
        </span>
      );
    case "button-text":
      return (
        <span
          style={style}
          className={twMerge(
            `font-ptsans text-sm font-semibold`,
            additionalClassNames
          )}
        >
          {children}
        </span>
      );
    case "quote":
      return (
        <span
          style={style}
          className={twMerge(
            `font-ptsans text-base font-semibold`,
            additionalClassNames
          )}
        >
          {children}
        </span>
      );
    case "custom":
      return (
        <span
          className={twMerge(`font-ptsans`, additionalClassNames)}
          style={style}
        >
          {children}
        </span>
      );
  }
};

export { Heading, Text };
