import React, { PropsWithChildren } from "react";

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
          className={`font-ptsans text-2xl md:text-3xl font-normal ${additionalClassNames}`}
          {...props}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`font-ptsans text-xl md:text-2xl font-normal ${additionalClassNames}`}
          {...props}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`font-ptsans text-xl font-normal ${additionalClassNames}`}
          {...props}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`font-ptsans text-base font-normal ${additionalClassNames}`}
          {...props}
        >
          {children}
        </h4>
      );
    case "subtitle":
      return (
        <h4
          className={`font-ptsans text-xl font-medium ${additionalClassNames}`}
          {...props}
        >
          {children}
        </h4>
      );
  }
};

type TextProps = {
  variant: "body" | "strong" | "small" | "button-text" | "quote";
  className?: string;
};

const Text: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  variant,
  className,
}) => {
  const additionalClassNames = className ?? "";
  switch (variant) {
    case "body":
      return (
        <span
          className={`font-ptsans text-base font-normal ${additionalClassNames}`}
        >
          {children}
        </span>
      );
    case "strong":
      return (
        <span
          className={`font-ptsans text-base font-semibold ${additionalClassNames}`}
        >
          {children}
        </span>
      );
    case "small":
      return (
        <span
          className={`font-ptsans text-xs font-normal ${additionalClassNames}`}
        >
          {children}
        </span>
      );
    case "button-text":
      return (
        <span
          className={`font-ptsans text-sm font-semibold ${additionalClassNames}`}
        >
          {children}
        </span>
      );
    case "quote":
      return (
        <span
          className={`font-ptsans text-base font-semibold ${additionalClassNames}`}
        >
          {children}
        </span>
      );
  }
};

export { Heading, Text };
