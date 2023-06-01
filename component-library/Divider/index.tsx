import React from "react";
import { useTranslation } from "react-i18next";

type DividerProps = {
  type?: "horizontal" | "vertical";
};

export const Divider: React.FC<DividerProps> = (props) => {
  const { type = "horizontal" } = props;
  const { t } = useTranslation();

  return (
    <div
      className={` ${
        type === "horizontal" ? "w-full border-t-2" : "h-full border-l-2"
      }`}
    />
  );
};
