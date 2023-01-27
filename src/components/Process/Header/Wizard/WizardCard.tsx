import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProcessContext } from "../../ProcessView";

interface Props {
  title: string;
  path: string;
}

const WizardCard: React.FC<Props> = ({ title, path }) => {
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
    </div>
  );
};

export default WizardCard;
