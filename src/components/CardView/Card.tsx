import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../constants/Icons";
import { CardItemData } from "./CardView";

interface Props {
  carditem: CardItemData;
  onClickCard?(): void;
}

const Card: React.FC<Props> = (props) => {
  const { carditem, onClickCard } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClickCard !== undefined) {
      onClickCard();
    } else {
      navigate(carditem.link);
    }
  };

  return (
    <a
      title={t(carditem.title)}
      className="
            md:w-5/12 justify-center items-center gap-1 bg-white p-2 md:p-3 md:min-w-[300px]
            flex flex-col w-full  py-2 px-4 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner 
            shadow-md transition-all ease-in-out duration-300 "
      onClick={handleOnClickCard}
      href={carditem.link}
    >
      {carditem.icon !== undefined ? carditem.icon : null}
      <h3 className="text-center">{t(carditem.title)}</h3>
    </a>
  );
};

export default Card;
