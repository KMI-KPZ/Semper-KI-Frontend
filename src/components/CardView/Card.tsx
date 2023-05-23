import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
            flex w-full flex-col items-center justify-center gap-1 bg-white p-2
            px-4 py-2 shadow-md  transition-all duration-300 
            ease-in-out hover:cursor-pointer hover:bg-slate-50 
            hover:shadow-inner md:w-5/12 md:min-w-[300px] md:p-3 "
      onClick={handleOnClickCard}
      href={carditem.link}
    >
      {carditem.icon !== undefined ? carditem.icon : null}
      <h3 className="text-center">{t(carditem.title)}</h3>
    </a>
  );
};

export default Card;
