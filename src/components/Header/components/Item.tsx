import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { INavigationItem } from "../../../data/navigation";
import { Badge } from "@component-library/Badge";
import { ReactComponent as LogoIcon } from "@icons/Logo.svg";

interface Props {
  isMenuItem?: boolean;
  headeritem: INavigationItem;
  onlyIcon?: boolean;
  closeMenus(): void;
  badge?: number;
}

const HeaderItem: React.FC<Props> = (props) => {
  const { headeritem, closeMenus, isMenuItem, badge, onlyIcon } = props;
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
      <div className="relative h-6 w-6 xl:h-8 xl:w-8">
        <LogoIcon className="absolute h-6 opacity-100 duration-300 ease-in-out group-hover:opacity-0 xl:h-8" />
        <LogoIcon className="absolute h-6 opacity-0 duration-300 ease-in-out group-hover:opacity-100 xl:h-8" />
      </div>
    ) : (
      headeritem.icon
    );

  return (
    <li
      className="group p-1 duration-300 hover:cursor-pointer hover:text-türkis"
      onClick={handleOnClick}
      title={headeritem.title}
    >
      <a
        href={headeritem.link}
        className="flex flex-row items-center gap-2 text-inherit"
        onClick={handleOnClick}
      >
        {badge !== undefined && badge > 0 ? (
          <Badge count={badge} position="small">
            {renderIcon}
          </Badge>
        ) : (
          renderIcon
        )}
        {onlyIcon !== undefined && onlyIcon === true ? null : (
          <span className="text-xl">{t(headeritem.title)}</span>
        )}
      </a>
    </li>
  );
};

export default HeaderItem;
