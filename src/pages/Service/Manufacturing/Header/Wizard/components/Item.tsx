import { active } from "d3";
import { t } from "i18next";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

interface ManufacturingWizardItemProps {
  to: string;
  title: string;
  active: boolean;
  completed: boolean;
  icon: React.ReactNode;
}

const ManufacturingWizardItem: React.FC<
  PropsWithChildren<ManufacturingWizardItemProps>
> = (props) => {
  const { children, to, title, active, completed, icon } = props;
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
        " flex  w-full grow flex-row flex-wrap items-center justify-center gap-3 rounded-lg bg-slate-50 p-3 md:w-fit",
        active !== undefined && active === true
          ? "border-4 border-slate-300 bg-slate-100"
          : "border-2"
      )}
      onClick={handleOnClickButton}
      title={title}
      href={to}
    >
      {icon}
      {title}
      {completed ? (
        <CheckCircleOutlineIcon className="text-green-400" />
      ) : (
        <RadioButtonUncheckedIcon className="text-yellow-400" />
      )}
    </a>
  );
};

export default ManufacturingWizardItem;
