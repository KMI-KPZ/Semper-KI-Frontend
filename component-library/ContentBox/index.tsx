import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface ContentBoxProps {
  className?: string;
}

const ContentBox: React.FC<PropsWithChildren<ContentBoxProps>> = (props) => {
  const { children, className } = props;

  return (
    <div
      className={twMerge(
        "flex w-full max-w-7xl flex-col items-center justify-start gap-5 p-5 md:flex-row",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContentBox;
