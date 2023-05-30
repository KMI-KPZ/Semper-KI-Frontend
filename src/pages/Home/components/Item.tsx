import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Badge } from "@component-library/Badge";
import { IHomeItem } from "..";

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
      className="flex w-full flex-col items-center justify-center gap-1 bg-white p-2 text-lg shadow-md hover:bg-gray-300 md:w-5/12 md:min-w-[300px] md:p-3"
      onClick={handleOnClickCard}
      href={homeItem.link}
    >
      {homeItem.icon === undefined ? null : badge !== undefined ? (
        <Badge count={badge} position="small">
          {homeItem.icon}
        </Badge>
      ) : (
        homeItem.icon
      )}
      <h2>{t(homeItem.title)}</h2>
    </a>
  );
};

export default HomeItem;
