import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EProcessStatusType } from "../../../../interface/enums";
import StatusIcon from "../StatusIcon.tsx/StatusIcon";

interface Props {
  title: string;
  path: string;
  active: boolean;
  statusType: EProcessStatusType;
}

const WizardCard: React.FC<Props> = (props) => {
  const { title, path, active, statusType } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="wizard-card" onClick={handleOnClickCard}>
      <div className="wizard-card-text">
        {t(title)}
        {active === true ? <hr className="wizard-card-hr" /> : null}
      </div>
      <StatusIcon statusType={statusType} />
    </div>
  );
};

export default WizardCard;
