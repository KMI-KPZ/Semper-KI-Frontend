import React, { PropsWithChildren } from "react";

type TextVariant = "base" | "lg" | "sm";

type TextProps = {
  variant: TextVariant;
};

export const Text: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  variant,
}) => {
  if (variant === "base") {
    return <></>;
  }
  return <h1>{children}</h1>;
};
