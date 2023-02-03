import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../config/Icons";
import { ICardItem } from "./CardView";

interface Props {
  carditem: ICardItem;
}

const Card: React.FC<Props> = ({ carditem }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(carditem.link);
  };
  return (
    <div
      title={t(`card-view.${carditem.title}`)}
      className="card"
      onClick={handleClickCard}
    >
      {carditem.icon !== undefined ? (
        <img src={getIconByName(carditem.icon)} />
      ) : null}
      {t(`card-view.${carditem.title}`)}
    </div>
  );
};

export default Card;
