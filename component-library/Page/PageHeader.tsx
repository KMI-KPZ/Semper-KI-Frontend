import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface PageHeaderProps {}

export const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = (
  props
) => {
  const { children } = props;
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white px-5 py-3 text-center">{children}</div>
  );
};
