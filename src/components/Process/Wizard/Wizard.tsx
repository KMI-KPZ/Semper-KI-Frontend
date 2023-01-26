import "./Wizard.scss";
import React, { ReactNode } from "react";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

import { useTranslation } from "react-i18next";
import { IProcess } from "../../../interface/Interface";

interface Props {}

export const Wizard: React.FC<Props> = ({}) => {
  const { t } = useTranslation();

  const handleClick = (e: any, index: number) => {
    e.preventDefault();
  };

  return (
    <div className="wizard">
      <div className="wizard-card" onClick={(e) => handleClick(e, 0)}>
        {t("wizard.model")}
      </div>
      +
      <div className="wizard-card" onClick={(e) => handleClick(e, 1)}>
        {t("wizard.material-procedure")}
      </div>
      +
      <div className="wizard-card" onClick={(e) => handleClick(e, 2)}>
        {t("wizard.manufacturer")}
      </div>
      +
      <div className="wizard-card" onClick={(e) => handleClick(e, 3)}>
        {t("wizard.post-processing")}
      </div>
      +
      <div className="wizard-card" onClick={(e) => handleClick(e, 4)}>
        {t("wizard.additive")}
      </div>
    </div>
  );
};
