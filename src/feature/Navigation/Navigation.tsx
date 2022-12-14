import { stat } from "fs";
import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import DoubleArrowOutlinedIcon from "@mui/icons-material/DoubleArrowOutlined";
import {
  getNavigationData,
  NavigationItemType,
  SubNavigationItemType,
} from "./NavigationData";
import { UserType } from "../../interface/types";

import "./Navigation.scss";

interface Props {
  userType: UserType;
  open: boolean;
  setMenuOpen(menuOpen: boolean): void;
}

interface State {
  navItems: NavigationItemType[];
  activeNavItem: string;
  expanded: boolean;
}

const Navigation = ({ userType, open, setMenuOpen }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    navItems: getNavigationData(userType ? userType : "client"),
    activeNavItem: "dashboard",
    expanded: false,
  });

  useEffect(() => {
    let item: string = "";
    state.navItems.forEach((navItem: NavigationItemType) => {
      if (navItem.link === location.pathname) item = navItem.title;
    });
    setState((prevState) => ({
      ...prevState,
      activeNavItem: item,
      expanded: false,
    }));
  }, [location.pathname]);

  const setExpandNavigationItem = (navItemId: number, expand: boolean) => {
    let newNavigationItems: NavigationItemType[] = [];
    state.navItems.forEach((navItem: NavigationItemType) => {
      let newNavigationItem = navItem;
      newNavigationItem.expanded =
        navItem.id === navItemId
          ? expand
          : navItem.expanded === undefined
          ? undefined
          : false;
      newNavigationItems.push(newNavigationItem);
    });
    setState((prevState) => ({
      ...prevState,
      navItems: newNavigationItems,
    }));
  };

  const handleClickNavBox = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    expand: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, expanded: expand }));
  };

  const handleClickNavSubItem = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string,
    title: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(link);
  };

  return (
    <div
      className={`authorized-nav-box-outside ${
        state.expanded ? "expanded" : ""
      }`}
      onClick={(e) => handleClickNavBox(e, false)}
    >
      <div className="authorized-nav-box">
        <div className="authorized-nav">
          <ul>
            {state.navItems.map(
              (navItem: NavigationItemType, index: number) => (
                <React.Fragment key={`${navItem.id}.${index}`}>
                  <NavigationItem
                    expanded={state.expanded}
                    className={
                      state.activeNavItem.includes(navItem.title)
                        ? "active"
                        : ""
                    }
                    navItem={navItem}
                    setExpandNavigationItem={setExpandNavigationItem}
                  />
                  {navItem.expanded !== undefined &&
                    navItem.expanded === true &&
                    state.expanded && (
                      <ul>
                        {navItem.subNavigation &&
                          navItem.subNavigation.map(
                            (
                              subNavigationItem: SubNavigationItemType,
                              subIndex: number
                            ) => (
                              <li key={`${navItem.id}.${index}.${subIndex}`}>
                                <a
                                  href={`/${navItem.title}/${subNavigationItem.title}`}
                                  onClick={(e) =>
                                    handleClickNavSubItem(
                                      e,
                                      `/${navItem.title}/${subNavigationItem.title}`,
                                      navItem.title
                                    )
                                  }
                                >
                                  {t(
                                    `nav.${navItem.title}.${subNavigationItem.title}`
                                  )}
                                </a>
                              </li>
                            )
                          )}
                      </ul>
                    )}
                </React.Fragment>
              )
            )}
          </ul>
          <div
            className="nav-button-expand"
            onClick={(e) => handleClickNavBox(e, !state.expanded)}
          >
            {state.expanded ? (
              <DoubleArrowOutlinedIcon className="nav-button-expand-icon expanded" />
            ) : (
              <DoubleArrowOutlinedIcon className="nav-button-expand-icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
