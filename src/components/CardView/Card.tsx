import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../config/Icons";
import { ICardItem } from "./CardView";

interface Props {
  prefix: string[];
  carditem: ICardItem;
  onClickCard?(link: string): void;
}

const Card: React.FC<Props> = ({ carditem, prefix, onClickCard }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClickCard !== undefined) {
      onClickCard(carditem.link);
    } else {
      navigate(carditem.link);
    }
  };

  return (
    <a
      title={t(
        `card-view.${prefix.map((title: string) => `${title}.`).join("")}${
          carditem.title
        }`
      )}
      className="card"
      onClick={handleClickCard}
      href={carditem.link}
    >
      {carditem.icon !== undefined ? (
        <img src={getIconByName(carditem.icon)} />
      ) : null}
      {t(
        `card-view.${prefix.map((title: string) => `${title}.`).join("")}${
          carditem.title
        }`
      )}
    </a>
  );
};

export default Card;
