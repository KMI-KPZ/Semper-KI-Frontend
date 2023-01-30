import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconCheck, IconMinus, IconO, IconX } from "../../../../config/Icons";
import { EModelStatusType } from "../../../../interface/enums";
import { ProcessContext } from "../../ProcessView";

interface Props {
  title: string;
  path: string;
  active: boolean;
  statusType: EModelStatusType;
}

const WizardCard: React.FC<Props> = ({ title, path, active, statusType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(path);
  };

  const getIcon = () => {
    let claseName = "ok";
    let img = IconCheck;
    switch (statusType) {
      case 0:
        claseName = "ok";
        img = IconCheck;
        break;
      case 1:
        claseName = "error";
        img = IconX;
        break;
      case 2:
        claseName = "missing";
        img = IconMinus;
        break;
    }
    return (
      <div className={`wizard-cart-icon ${claseName}`}>
        <img className="wizzard-cart-img" src={img} />
      </div>
    );
  };

  return (
    <div className="wizard-card" onClick={handleOnClickCard}>
      <div className="wizard-card-text">
        {t(title)}
        {active === true ? <hr className="wizard-card-hr" /> : null}
      </div>
      {getIcon()}
    </div>
  );
};

export default WizardCard;
