import logger from "@/hooks/useLogger";
import React from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

type DividerProps = {
  className?: string;
  type?: "horizontal" | "vertical" | "auto-vertical" | "auto-horizontal";
};

export const Divider: React.FC<DividerProps> = (props) => {
  const { type = "horizontal", className } = props;
  const { t } = useTranslation();
  const additionalClassNames = className ?? "";

  switch (type) {
    case "horizontal":
      return (
        <div className={twMerge(`w-full border-t-2`, additionalClassNames)} />
      );
    case "vertical":
      return (
        <div className={twMerge(`h-full border-l-2`, additionalClassNames)} />
      );
    case "auto-horizontal":
      return (
        <>
          <div
            className={twMerge(
              ` block w-full border-t-2 md:hidden `,
              additionalClassNames
            )}
          />
          <div
            className={twMerge(
              ` hidden h-full border-l-2 md:block `,
              additionalClassNames
            )}
          />
        </>
      );
    case "auto-vertical":
      return (
        <>
          <div
            className={twMerge(
              ` hidden w-full border-t-2 md:block `,
              additionalClassNames
            )}
          />
          <div
            className={twMerge(
              ` block h-full border-l-2 md:hidden `,
              additionalClassNames
            )}
          />
        </>
      );
  }
};
