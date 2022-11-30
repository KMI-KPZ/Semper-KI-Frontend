import React, { ReactNode } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { NavigationItemType } from "./NavigationItems";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";

interface Props {
  open: boolean;
  className: string;
  navItem: NavigationItemType;
  setExpandNavigationItem: (navItemId: number, expand: boolean) => void;
  navigate: (link: string, title: string) => void;
}

const NavigationItem = ({
  open,
  className,
  navItem,
  setExpandNavigationItem,
  navigate,
}: Props) => {
  const { t } = useTranslation();

  const onClickNavigationItem = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(link, navItem.title);
  };

  const onClickNavigationItemIcon = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    navItemId: number,
    expand: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandNavigationItem(navItemId, expand);
  };

  return (
    <li className={className}>
      <a
        href={`${navItem.link}`}
        onClick={(e) => onClickNavigationItem(e, navItem.link)}
      >
        {navItem.icon}
        <div className={`nav-box-closable ${open ? "open" : ""}`}>
          {t(`nav.${navItem.title}.title`)}
          {navItem.expanded !== undefined && navItem.expanded === false && (
            <IconButton
              className="expand-icon"
              onClick={(e) => onClickNavigationItemIcon(e, navItem.id, true)}
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
          )}
          {navItem.expanded !== undefined && navItem.expanded === true && (
            <IconButton
              className="expand-icon"
              onClick={(e) => onClickNavigationItemIcon(e, navItem.id, false)}
            >
              <ExpandLessOutlinedIcon />
            </IconButton>
          )}
        </div>
      </a>
    </li>
  );
};

export default NavigationItem;
