import { active } from "d3";
import { t } from "i18next";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ManufacturingWizardItemProps {
  to: string;
  title: string;
  active?: boolean;
  className?: string;
}

const ManufacturingWizardItem: React.FC<
  PropsWithChildren<ManufacturingWizardItemProps>
> = (props) => {
  const { children, to, className, title, active } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOnClickButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(to);
  };

  return (
    <a
      className={twMerge(
        "flex grow flex-col items-center justify-center gap-3 p-3 shadow",
        active !== undefined && active === true ? "shadow-inner-xl" : "",
        className
      )}
      onClick={handleOnClickButton}
      title={t(title)}
      href={to}
    >
      {children}
    </a>
  );
};

export default ManufacturingWizardItem;
