import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../constants/Icons";
import { ICardItem } from "../CardView/CardView";
import Badge from "../General/Badge";

interface Props {
  prefix: string;
  cardItem: ICardItem;
  badge?: number;
}

const DashboardCard: React.FC<Props> = (props) => {
  const { prefix, cardItem, badge } = props;
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
      className="flex flex-col w-full md:w-5/12 justify-center items-center gap-1 bg-white p-2 md:p-3 hover:bg-gray-300 shadow-md md:min-w-[300px]"
      onClick={handleOnClickCard}
      href={cardItem.link}
    >
      {cardItem.icon === undefined ? null : badge !== undefined ? (
        <Badge count={badge}>
          <img
            src={getIconByName(cardItem.icon)}
            alt={`link to ${cardItem.link}`}
          />
        </Badge>
      ) : (
        <img
          src={getIconByName(cardItem.icon)}
          alt={`link to ${cardItem.link}`}
        />
      )}
      <h2>{t(`${prefix}.${cardItem.title}`)}</h2>
    </a>
  );
};

export default DashboardCard;
