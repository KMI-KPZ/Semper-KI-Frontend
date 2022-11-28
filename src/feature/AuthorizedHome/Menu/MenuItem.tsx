import React, { ReactNode } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { MenuItemType } from "./MenuItems";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

interface Props {
  menuItem: MenuItemType;
  setExpandMenuItem: (menuItemId: number, expand: boolean) => void;
}

const MenuItem = ({ menuItem, setExpandMenuItem }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClickMenuItem = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    e.preventDefault();
    navigate(link);
  };

  const onClickMenuItemIcon = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    menuItemId: number,
    expand: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandMenuItem(menuItemId, expand);
  };

  return (
    <li>
      <a
        href={`/${menuItem.title}`}
        onClick={(e) => onClickMenuItem(e, menuItem.title)}
      >
        {menuItem.icon}
        {t(`menu.${menuItem.title}.title`)}
        {menuItem.expanded !== undefined && menuItem.expanded === false && (
          <IconButton
            className="expand-icon"
            onClick={(e) => onClickMenuItemIcon(e, menuItem.id, true)}
          >
            <ExpandMoreOutlinedIcon />
          </IconButton>
        )}
        {menuItem.expanded !== undefined && menuItem.expanded === true && (
          <IconButton
            className="expand-icon"
            onClick={(e) => onClickMenuItemIcon(e, menuItem.id, false)}
          >
            <ExpandLessOutlinedIcon />
          </IconButton>
        )}
      </a>
    </li>
  );
};

export default MenuItem;
