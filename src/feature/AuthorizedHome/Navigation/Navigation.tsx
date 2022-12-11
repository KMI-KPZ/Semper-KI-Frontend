import { stat } from "fs";
import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import {
  getNavigationData,
  NavigationItemType,
  SubNavigationItemType,
} from "./NavigationData";
import { UserType } from "../../../interface/types";

interface Props {
  userType: UserType;
}

interface State {
  open: boolean;
  navItems: NavigationItemType[];
  activeNavItem: string;
}

const Navigation = ({ userType }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    open: false,
    navItems: getNavigationData(userType ? userType : "client"),
    activeNavItem: "dashboard",
  });

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

  const handleMouseOnNavBox = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        open: true,
      }));
    }, 250);
  };

  const handleClickNavBox = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    open: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, open: open }));
  };

  const navigateWithEffect = (link: string, title: string) => {
    setState((prevState) => ({
      ...prevState,
      activeNavItem: title,
      open: false,
    }));
    navigate(link);
  };

  const handleClickNavSubItem = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string,
    title: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigateWithEffect(link, title);
  };

  return (
    <div
      className={`authorized-nav-box-outside ${state.open ? "open" : ""}`}
      onClick={(e) => handleClickNavBox(e, false)}
    >
      <div
        className="authorized-nav-box"
        onClick={(e) => handleClickNavBox(e, true)}
        onMouseEnter={(e) => handleMouseOnNavBox(e)}
      >
        <div className="authorized-nav">
          <ul>
            {state.navItems.map(
              (navItem: NavigationItemType, index: number) => (
                <React.Fragment key={`${navItem.id}.${index}`}>
                  <NavigationItem
                    navigate={navigateWithEffect}
                    open={state.open}
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
                    state.open && (
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
        </div>
      </div>
    </div>
  );
};

export default Navigation;
