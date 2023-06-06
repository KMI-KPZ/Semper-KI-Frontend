import React from "react";
import { useTranslation } from "react-i18next";

type DividerProps = {
  type?: "horizontal" | "vertical" | "auto-vertical" | "auto-horizontal";
};

export const Divider: React.FC<DividerProps> = (props) => {
  const { type = "horizontal" } = props;
  const { t } = useTranslation();

  switch (type) {
    case "horizontal":
      return <div className="w-full border-t-2" />;
    case "vertical":
      return <div className="h-full border-l-2" />;
    case "auto-horizontal":
      return (
        <>
          <div className="block w-full border-t-2 md:hidden" />
          <div className="hidden h-full border-l-2 md:block" />
        </>
      );
    case "auto-vertical":
      return (
        <>
          <div className="hidden w-full border-t-2 md:block" />
          <div className="block h-full border-l-2 md:hidden" />
        </>
      );
  }
};
