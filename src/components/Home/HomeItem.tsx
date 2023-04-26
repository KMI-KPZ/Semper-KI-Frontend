import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Badge from "../General/Badge";
import { IHomeItem } from "./Home";

interface Props {
  homeItem: IHomeItem;
  badge?: number;
}

const HomeItem: React.FC<Props> = (props) => {
  const { homeItem, badge } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(homeItem.link);
  };

  return (
    <a
      className="flex flex-col w-full md:w-5/12 justify-center items-center gap-1 bg-white p-2 md:p-3 hover:bg-gray-300 shadow-md md:min-w-[300px] text-lg"
      onClick={handleOnClickCard}
      href={homeItem.link}
    >
      {homeItem.icon === undefined ? null : badge !== undefined ? (
        <Badge count={badge}>{homeItem.icon}</Badge>
      ) : (
        homeItem.icon
      )}
      <h2>{t(homeItem.title)}</h2>
    </a>
  );
};

export default HomeItem;
