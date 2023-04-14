import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../constants/Icons";
import { ICardItem } from "./CardView";

interface Props {
  prefix: string[];
  carditem: ICardItem;
  onClickCard?(link: string): void;
}

const Card: React.FC<Props> = (props) => {
  const { carditem, prefix, onClickCard } = props;
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
      className="
            md:w-5/12 justify-center items-center gap-1 bg-white p-2 md:p-3 md:min-w-[300px]
            flex flex-col w-full  py-2 px-4 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner 
            shadow-md transition-all ease-in-out duration-300 "
      onClick={handleClickCard}
      href={carditem.link}
    >
      {carditem.icon !== undefined ? (
        <img
          src={getIconByName(carditem.icon)}
          alt={carditem.icon}
          className="w-6"
        />
      ) : null}
      <h3 className="text-center">
        {t(
          `card-view.${prefix.map((title: string) => `${title}.`).join("")}${
            carditem.title
          }`
        )}
      </h3>
    </a>
  );
};

export default Card;
