import "./Wizard.scss";
import React, { ReactNode } from "react";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

import { useTranslation } from "react-i18next";
import { ProcessState } from "../../../interface/Interface";

interface Props {
  state: ProcessState;
  setProgressState: (id: number) => void;
}

export const Wizard = ({ state, setProgressState }: Props) => {
  const { t } = useTranslation();

  const handleClick = (e: any, index: number) => {
    e.preventDefault();
    setProgressState(index);
  };

  const getUnderline = (index: number): ReactNode => {
    return (
      <hr
        className={`wizard-card-line ${
          state.progressState === index ? "active" : ""
        }`}
      />
    );
  };

  return (
    <div className="process-box horizontal wizard">
      <div className="wizard-card" onClick={(e) => handleClick(e, 0)}>
        {t("wizard.model")}
        {getUnderline(0)}
      </div>
      <ArrowRightAltOutlinedIcon />
      <div className="wizard-card" onClick={(e) => handleClick(e, 1)}>
        {t("wizard.material-procedure")}
        {getUnderline(1)}
      </div>
      <ArrowRightAltOutlinedIcon />
      <div className="wizard-card" onClick={(e) => handleClick(e, 2)}>
        {t("wizard.manufacturer")}
        {getUnderline(2)}
      </div>
      <ArrowRightAltOutlinedIcon />
      <div className="wizard-card" onClick={(e) => handleClick(e, 3)}>
        {t("wizard.post-processing")}
        {getUnderline(3)}
      </div>
      <ArrowRightAltOutlinedIcon />
      <div className="wizard-card" onClick={(e) => handleClick(e, 4)}>
        {t("wizard.additive")}
        {getUnderline(4)}
      </div>
    </div>
  );
};
