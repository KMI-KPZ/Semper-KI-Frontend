import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../../config/Icons";
import { ICardItem } from "../../CardView/CardView";

interface Props {
  prefix: string;
  cardItem: ICardItem;
}

const DashboardCard: React.FC<Props> = ({ prefix, cardItem }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(cardItem.link);
  };

  return (
    <a
      className="dashboard-card"
      onClick={handleOnClickCard}
      href={cardItem.link}
    >
      {cardItem.icon === undefined ? null : (
        <img src={getIconByName(cardItem.icon)} />
      )}
      <h2>{t(`${prefix}.${cardItem.title}`)}</h2>
    </a>
  );
};

export default DashboardCard;
