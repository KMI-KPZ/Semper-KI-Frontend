import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../config/Icons";

export interface IHomeCard {
  title: string;
  link: string;
  icon: string;
}

interface Props {
  homeCard: IHomeCard;
}

export const HomeCard: React.FC<Props> = ({ homeCard }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(homeCard.link);
  };
  return (
    <div title={homeCard.title} className="home-card" onClick={handleClickCard}>
      <img src={getIconByName(homeCard.icon)} />
      {t(`home.card.${homeCard.title}`)}
    </div>
  );
};
