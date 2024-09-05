import React, { PropsWithChildren } from "react";

interface PageHeaderProps {}

export const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = (
  props
) => {
  const { children } = props;

  return (
    <div className="w-full bg-white px-5 py-3 text-center">{children}</div>
  );
};
