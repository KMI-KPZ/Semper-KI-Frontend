import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProcessContext } from "../../ProcessView";

interface Props {
  title: string;
  path: string;
  active: boolean;
}

const WizardCard: React.FC<Props> = ({ title, path, active }) => {
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
      {t(title)}
      {active === true ? <hr className="wizard-card-hr" /> : null}
    </div>
  );
};

export default WizardCard;
