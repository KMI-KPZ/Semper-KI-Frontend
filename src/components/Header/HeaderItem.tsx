import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../constants/Icons";
import { IHeaderItem } from "../../interface/Interface";
import Badge from "../General/Badge";

interface Props {
  isMenuItem?: boolean;
  headeritem: IHeaderItem;
  closeMenus(): void;
  badge?: number;
}

const HeaderItem: React.FC<Props> = (props) => {
  const { headeritem, closeMenus, isMenuItem, badge } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (headeritem.extern === false) {
      e.preventDefault();
      closeMenus();
      navigate(headeritem.link);
    }
  };

  const renderIcon =
    typeof headeritem.icon === "string" ? (
      <div className="relative w-6 h-6 xl:h-8 xl:w-8">
        <img
          className="absolute h-6 xl:h-8 opacity-100 group-hover:opacity-0 duration-300 ease-in-out"
          src={getIconByName("IconLogo")}
          alt={`link to ${headeritem.link}`}
        />
        <img
          className="absolute h-6 xl:h-8 opacity-0 group-hover:opacity-100 duration-300 ease-in-out"
          src={getIconByName("IconLogoColor")}
          alt={`link to ${headeritem.link}`}
        />
      </div>
    ) : (
      headeritem.icon
    );

  return (
    <li
      className="group hover:text-türkis hover:cursor-pointer duration-300 p-1"
      onClick={handleOnClick}
      title={headeritem.title}
    >
      <a
        href={headeritem.link}
        className="flex flex-row items-center gap-2 text-inherit"
        onClick={handleOnClick}
      >
        {badge !== undefined && badge > 0 ? (
          <Badge count={badge}>{renderIcon}</Badge>
        ) : (
          renderIcon
        )}
        <span className="text-xl">{t(headeritem.title)}</span>
      </a>
    </li>
  );
};

export default HeaderItem;
